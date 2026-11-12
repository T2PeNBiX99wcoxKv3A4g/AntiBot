using System.Net;
using System.Security.Cryptography;
using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Owns the VRChat sessions: sign-in, the second factor, the device (QR) flow, keeping each account
///     in its own folder, switching between them, and telling the interface when any of that changes.
/// </summary>
/// <remarks>
///     <para>
///         Only one account is signed in at a time, so there is one API client and one pipeline. A switch
///         decrypts the target first and only then replaces the cookies, which means cancelling an unlock
///         leaves the current account exactly as it was.
///     </para>
///     <para>
///         The password is only ever used to answer one sign-in request, or to derive the key that unlocks
///         a stored cookie; it is never written anywhere. A .NET string cannot be wiped, so the only thing
///         this class can do is not keep it: it lives in the message payload and is released with it.
///     </para>
/// </remarks>
internal sealed class AuthService : Singleton<AuthService>
{
    private static readonly TimeSpan LocationRefreshInterval = TimeSpan.FromSeconds(20);

    /// <summary>How often the signed-out reminder repeats while automatic protection cannot run.</summary>
    private static readonly TimeSpan ExpiryReminderInterval = TimeSpan.FromMinutes(5);

    /// <summary>How long to wait before a failed automatic sign-in is tried again.</summary>
    private static readonly TimeSpan AutoLoginRetryDelay = TimeSpan.FromSeconds(15);

    /// <summary>VRCX's limit: after three automatic attempts in an hour, wait for a manual sign-in.</summary>
    private const int AutoLoginLimit = 3;

    /// <summary>How many times an expired session is retried before the user is asked to sign in.</summary>
    private const int AutoLoginRetries = 3;

    private const long AutoLoginWindowMilliseconds = 60 * 60 * 1000;

    private readonly VrchatApi _api = new();
    private readonly List<Account> _accounts = [];
    private readonly List<long> _autoLoginAttempts = [];
    private readonly Lock _attemptGate = new();

    private readonly Lock _gate = new();
    private readonly VrchatPipeline _pipeline = new();

    private VrchatAccount? _account;
    private Account? _active;
    private VrchatApi? _device;
    private int _expired;
    private CancellationTokenSource? _expiryReminder;
    private int _generation;
    private int _autoLogin;
    private string? _lastAccount;
    private string? _lastAutoLoginError;
    private string _location = "";
    private AuthStorage _legacyStorage = AuthStorage.None;
    private bool? _pendingAutoLogin;
    private bool? _pendingRemember;
    private string? _pendingPassword;
    private string? _pendingUsername;
    private volatile bool _ready;
    private SavedAccountPayload[] _saved = [];
    private VrchatApi? _signIn;
    private string _state = "loggedOut";
    private string[] _twoFactorMethods = [];
    private DateTimeOffset _userRefreshedAt = DateTimeOffset.MinValue;

    public AuthService()
    {
        // Any request made with the active session can notice that the cookie was rejected.
        _api.Unauthorized += Expire;

        NativeBridge.MessageReceived += HandleMessageAsync;

        // The pipeline updates the account's presence within seconds; the account page reads it from here.
        PresenceService.Instance.Updated += OnPresenceUpdated;

        // VRChat pushes notifications (friend requests included) over the same socket.
        _pipeline.NotificationReceived += () => Notification?.Invoke();

        // The TPM and Hello probes touch the system, so they run in the background before the account
        // page asks whether those modes are available.
        _ = Task.Run(() =>
        {
            _ = AuthStore.IsTpmAvailable;
            _ = AuthStore.IsHelloAvailable;

            // The account page may have asked before the probes finished.
            Notify();
        });
    }

    public bool IsLoggedIn => State == "loggedIn";

    /// <summary>Signed in and the session cookie is in the client, so requests can go out.</summary>
    public bool IsReady => _ready && IsLoggedIn;

    public string State
    {
        get
        {
            lock (_gate)
                return _state;
        }
    }

    /// <summary>The signed-in account's id, so the instance list can tell the local player apart.</summary>
    public string? CurrentUserId
    {
        get
        {
            lock (_gate)
                return _account?.Id;
        }
    }

    /// <summary>Raised after the session state changed, so the instance list can react to a sign-in.</summary>
    public event Action? Changed;
    /// <summary>Raised when VRChat pushes a notification over the pipeline.</summary>
    public event Action? Notification;

    /// <summary>Restores the last used account. Called once, after the singletons exist.</summary>
    public void Initialize()
    {
        LoadAccounts();

        // Show the account from the last run at once; the network confirms it a moment later.
        if (_active is { Stored: true } active && active.Storage != AuthStorage.Password &&
            Database.Instance.LoadAccount() is { } cached &&
            AccountStore.Hash(cached.Id) == active.Dir)
            lock (_gate)
            {
                _account = cached;
                _state = "loggedIn";
            }

        Notify();
        _ = RestoreAndAnnounceAsync();
        _ = RefreshSavedAsync();
    }

    private async Task RestoreAndAnnounceAsync()
    {
        await RestoreAsync();
        AnnounceStartup();
    }

    /// <summary>
    ///     Says, once per launch, whether automatic protection is actually working. A session that
    ///     expires while AntiBot runs is announced by <see cref="Expire" /> instead.
    /// </summary>
    private void AnnounceStartup()
    {
        // A working sign-in needs no announcement; only a missing or expired session does.
        if (IsLoggedIn)
            return;

        if (Volatile.Read(ref _expired) == 1)
        {
            NotifySessionExpired();
            return;
        }

        NotificationService.Instance.Notify("auth.startup",
            Localization.Get("auth.startup.signedOutTitle"),
            Localization.Get("auth.startup.signedOutMessage"));
    }

    /// <summary>
    ///     The instance the signed-in account is in, refreshed at most every
    ///     <see cref="LocationRefreshInterval" />, or null when the session is gone.
    /// </summary>
    public async Task<string?> GetLocationAsync(CancellationToken token)
    {
        if (!IsReady)
            return null;

        if (DateTimeOffset.UtcNow - _userRefreshedAt < LocationRefreshInterval)
            return _location;

        var generation = Volatile.Read(ref _generation);
        var (user, status) = await _api.GetCurrentUserAsync(token);

        if (user is null)
        {
            if (status == HttpStatusCode.Unauthorized)
                Expire();

            return null;
        }

        // The account may have been switched while the request was out.
        if (generation != Volatile.Read(ref _generation))
            return null;

        lock (_gate)
        {
            _location = user.Location ?? "";
            _userRefreshedAt = DateTimeOffset.UtcNow;
        }

        // The account page shows the presence too, so feed the same store the pipeline and the list use.
        PresenceService.Instance.Set(user.Id ?? "", user.Status, user.StatusDescription, PresenceSource.Pipeline);

        return _location;
    }

    public Task<(ApiInstance? Instance, string? Error)> GetInstanceAsync(string location,
        CancellationToken token) =>
        IsReady
            ? _api.GetInstanceAsync(location, token)
            : Task.FromResult<(ApiInstance?, string?)>((null, null));

    public Task<(ApiUser? User, string? Error)> GetUserAsync(string userId, CancellationToken token) =>
        IsReady
            ? _api.GetUserAsync(userId, token)
            : Task.FromResult<(ApiUser?, string?)>((null, null));

    public Task<(ApiFile? File, HttpStatusCode Status)> GetFileAsync(string fileId, CancellationToken token) =>
        IsReady
            ? _api.GetFileAsync(fileId, token)
            : Task.FromResult<(ApiFile?, HttpStatusCode)>((null, HttpStatusCode.ServiceUnavailable));

    public Task<ApiPublicProfile?> GetPublicProfileAsync(string userId, CancellationToken token) =>
        IsReady ? _api.GetPublicProfileAsync(userId, token) : Task.FromResult<ApiPublicProfile?>(null);

    public Task<ApiNotification[]?> GetFriendRequestsAsync(CancellationToken token) =>
        IsReady ? _api.GetFriendRequestsAsync(token) : Task.FromResult<ApiNotification[]?>(null);

    public Task<bool> ModerateUserAsync(string userId, string type, CancellationToken token) =>
        IsReady ? _api.ModerateUserAsync(userId, type, token) : Task.FromResult(false);

    public Task<bool> UnmoderateUserAsync(string userId, string type, CancellationToken token) =>
        IsReady ? _api.UnmoderateUserAsync(userId, type, token) : Task.FromResult(false);

    public Task<bool> HideFriendRequestAsync(string notificationId, CancellationToken token) =>
        IsReady ? _api.HideFriendRequestAsync(notificationId, token) : Task.FromResult(false);

#if DEBUG
    /// <summary>Debug build only: asks the local client to quit, the same way the automatic action does.</summary>
    private Task<NativeResponse?> DebugCloseVrchatAsync(NativeContext context)
    {
        var closed = VrchatClient.Close();
        Log.Information("Debug close VRChat: {Closed}", closed);
        return Task.FromResult<NativeResponse?>(context.Reply("debug.closeVrchat.result", new OkPayload(closed)));
    }

    /// <summary>
    ///     Debug build only: presses the OSC panic button the same way the automatic action does.
    /// </summary>
    private Task<NativeResponse?> DebugSafeModeAsync(NativeContext context)
    {
        var osc = VrchatOscService.Instance;
        var sent = osc.EnableSafeMode();

        Log.Information("Debug Safe Mode: {Sent} (listening: {Listening})", sent, osc.IsListening);

        return Task.FromResult<NativeResponse?>(context.Reply("debug.safeMode.result",
            new DebugSafeModePayload(sent, osc.IsListening)));
    }

    /// <summary>Debug build only: switches to the avatar configured in the settings.</summary>
    private Task<NativeResponse?> DebugAvatarAsync(NativeContext context)
    {
        var osc = VrchatOscService.Instance;
        var avatarId = SettingsService.Instance.Current.SafeAvatarId;
        var configured = avatarId.Length > 0;
        var already = configured && string.Equals(osc.CurrentAvatar, avatarId, StringComparison.OrdinalIgnoreCase);
        var sent = osc.ChangeAvatar(avatarId);

        Log.Information("Debug avatar switch: {Sent} (configured: {Configured}, already: {Already})",
            sent, configured, already);

        return Task.FromResult<NativeResponse?>(context.Reply("debug.avatar.result",
            new DebugAvatarPayload(sent, osc.IsListening, already, configured)));
    }

    /// <summary>Debug build only: scores any user id or profile link, without waiting for them to join.</summary>
    private async Task<NativeResponse?> DebugUserAsync(NativeContext context)
    {
        var input = context.Payload<DebugUserRequest>()?.UserId ?? "";
        var userId = Ids.User(input);

        if (userId is null)
            return context.Fail("debug.user.result", Localization.Get("error.debugUserMissing"));

        if (!IsLoggedIn)
            return context.Fail("debug.user.result", Localization.Get("error.authSignInFirst"));

        var profile = await PlayerService.Instance.FetchAsync(userId, CancellationToken.None);
        if (profile is null)
            return context.Fail("debug.user.result", Localization.Get("error.debugUserNotFound"));

        var fileId = AvatarService.FileIdOf(profile.AvatarUrl)
                     ?? AvatarService.FileIdOf(profile.AvatarImageUrl)
                     ?? AvatarService.FileIdOf(profile.IconUrl);
        var avatarName = fileId is null ? null : AvatarService.Instance.NameFor(fileId);
        var isRobot = AvatarService.IsRobot(fileId);
        var platform = profile.Platform is { Length: > 0 } value && value != "offline"
            ? value
            : profile.LastPlatform;
        var threat = ThreatScoring.Assess(profile, profile.DisplayName, avatarName, isRobot, platform);

        Log.Information("Debug score for {UserId}: {Score}", userId, threat.Score);

        return context.Reply("debug.user.result", new DebugUserPayload(
            profile.Id, profile.DisplayName, profile.DateJoined, InstanceService.TrustLevel(profile.Tags),
            platform, avatarName, isRobot, threat.Score, threat.Reasons));
    }

#endif

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "auth.state" => Task.FromResult<NativeResponse?>(context.Reply("auth.state.result", Snapshot())),
        "auth.login" => LoginAsync(context),
        "auth.login.saved" => SignInWithSavedAsync(context),
        "auth.verify" => VerifyAsync(context),
        "auth.unlock" => UnlockAsync(context),
        "auth.switch" => SwitchAsync(context),
        "auth.remove" => RemoveAsync(context),
        "auth.saved.forget" => ForgetSavedAsync(context),
        "auth.signin.cancel" => CancelSignInAsync(context),
        "auth.storage.save" => SaveStorageAsync(context),
        "auth.logout" => LogoutAsync(context),
        "auth.device.start" => StartDeviceAsync(context),
        "auth.device.poll" => PollDeviceAsync(context),
#if DEBUG
        "debug.user" => DebugUserAsync(context),
        "debug.closeVrchat" => DebugCloseVrchatAsync(context),
        "debug.safeMode" => DebugSafeModeAsync(context),
        "debug.avatar" => DebugAvatarAsync(context),
#endif
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> LoginAsync(NativeContext context)
    {
        var request = context.Payload<AuthLoginRequest>();
        if (request?.Username is not { Length: > 0 } username || request.Password is not { Length: > 0 } password)
            return context.Fail("auth.login.result", Localization.Get("error.authMissing"));

        // A new attempt must not inherit the cookies of an abandoned one. The QR client is separate,
        // because both forms are on screen at the same time.
        if (State != "twoFactor")
            lock (_gate)
            {
                _signIn?.Dispose();
                _signIn = null;
            }

        var api = SignInApi();

        // Kept until the sign-in (or its second factor) finishes, so the options can store it.
        // Unticking "remember" is a real answer too: it deletes whatever was saved before.
        _pendingRemember = request.RememberPassword;
        _pendingAutoLogin = request.RememberPassword && request.AutoLogin;
        _pendingUsername = request.RememberPassword ? username : null;
        _pendingPassword = request.RememberPassword ? password : null;

        var (user, error, _) = await api.LoginAsync(username, password, CancellationToken.None);
        if (error is not null)
        {
            ClearPending();
            Log.Warning("VRChat sign-in failed: {Error}", error);
            return context.Fail("auth.login.result", error);
        }

        if (user?.RequiresTwoFactorAuth is { Length: > 0 } methods)
        {
            lock (_gate)
            {
                _state = "twoFactor";
                _twoFactorMethods = methods;
            }

            Notify();
            return context.Reply("auth.login.result", Snapshot());
        }

        return await CompleteSignInAsync(api, user, true)
            ? context.Reply("auth.login.result", Snapshot())
            : context.Fail("auth.login.result", Localization.Get("error.authNoAccount"));
    }

    /// <summary>Signs in with one saved account when the user pressed its row in the list.</summary>
    private async Task<NativeResponse?> SignInWithSavedAsync(NativeContext context)
    {
        var dir = context.Payload<SavedLoginRequest>()?.Dir;

        if (dir is { Length: > 0 } && !CredentialStore.Exists(dir))
            return context.Fail("auth.login.saved.result", Localization.Get("error.authNoSavedPassword"));

        _lastAutoLoginError = null;

        // The press itself is the permission, so the per-account automatic flag is not consulted.
        if (await TryAutoLoginAsync(dir, true) || State == "twoFactor")
            return context.Reply("auth.login.saved.result", Snapshot());

        return context.Fail("auth.login.saved.result",
            _lastAutoLoginError ?? Localization.Get("error.authSavedLoginFailed"));
    }

    /// <summary>Deletes one saved password, keeping the account and its session.</summary>
    private async Task<NativeResponse?> ForgetSavedAsync(NativeContext context)
    {
        if (context.Payload<AuthAccountRequest>()?.Dir is { Length: > 0 } dir)
        {
            CredentialStore.Delete(dir);
            await RefreshSavedAsync();
        }

        return context.Reply("auth.saved.forget.result", Snapshot());
    }

    private async Task<NativeResponse?> VerifyAsync(NativeContext context)
    {
        var request = context.Payload<AuthVerifyRequest>();
        if (request?.Code.Trim() is not { Length: > 0 } code)
            return context.Fail("auth.verify.result", Localization.Get("error.authCodeMissing"));

        var api = SignInApi();

        var verified = request.Method switch
        {
            "totp" => await api.VerifyTotpAsync(code, CancellationToken.None),
            "emailOtp" => await api.VerifyEmailOtpAsync(code, CancellationToken.None),
            _ => await api.VerifyRecoveryAsync(code, CancellationToken.None)
        };

        if (!verified)
            return context.Fail("auth.verify.result", Localization.Get("error.authCodeRejected"));

        var (user, _) = await api.GetCurrentUserAsync(CancellationToken.None);
        return await CompleteSignInAsync(api, user, true)
            ? context.Reply("auth.verify.result", Snapshot())
            : context.Fail("auth.verify.result", Localization.Get("error.authSessionUnconfirmed"));
    }

    /// <summary>Opens a stored session, either for a switch or for the account left locked at startup.</summary>
    private async Task<NativeResponse?> UnlockAsync(NativeContext context)
    {
        var request = context.Payload<AuthUnlockRequest>();
        var account = request?.Dir is { Length: > 0 } dir
            ? _accounts.FirstOrDefault(entry => entry.Dir == dir)
            : _active;

        var password = request?.Password;
        var hello = account?.Storage == AuthStorage.Hello;

        if (!hello && password is not { Length: > 0 })
            return context.Fail("auth.unlock.result", Localization.Get("error.authUnlockPassword"));

        // The session written before accounts had folders has no account yet.
        if (account is null)
            return AuthStore.LegacyExists
                ? await UnlockLegacyAsync(context, password)
                : context.Fail("auth.unlock.result", Localization.Get("error.authAccountMissing"));

        var (status, payload) = await AuthStore.LoadAsync(AccountStore.PathOf(account.Dir),
            hello ? null : password);

        if (status == SessionLoadStatus.Cancelled)
            return context.Fail("auth.unlock.result", Localization.Get("error.authHelloCancelled"));

        if (status == SessionLoadStatus.None || payload is null)
            return context.Fail("auth.unlock.result",
                Localization.Get(hello ? "error.authHelloUnlockFailed" : "error.authUnlockFailed"));

        try
        {
            var (error, dead) = await ActivateAsync(account, payload, null, false);

            if (error is null)
                return context.Reply("auth.unlock.result", Snapshot());

            if (dead)
                DropSession(account);

            return context.Fail("auth.unlock.result", error);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    private async Task<NativeResponse?> SwitchAsync(NativeContext context)
    {
        var dir = context.Payload<AuthSwitchRequest>()?.Dir;
        var account = dir is null ? null : _accounts.FirstOrDefault(entry => entry.Dir == dir);

        if (account is null)
            return context.Fail("auth.switch.result", Localization.Get("error.authAccountMissing"));

        if (ReferenceEquals(account, _active) && IsLoggedIn)
            return context.Reply("auth.switch.result", new SwitchPayload(true, false, null, Snapshot()));

        byte[]? payload;

        if (account.Stored)
        {
            // A password-protected session is asked for by the interface first; nothing is touched yet.
            if (account.Storage == AuthStorage.Password)
                return context.Reply("auth.switch.result", new SwitchPayload(false, true, null, null));

            var (status, loaded) = await AuthStore.LoadAsync(AccountStore.PathOf(account.Dir), null);

            if (status == SessionLoadStatus.Cancelled)
                return context.Reply("auth.switch.result",
                    new SwitchPayload(false, false, Localization.Get("error.authHelloCancelled"), null));

            if (status != SessionLoadStatus.Loaded || loaded is null)
            {
                DropSession(account);
                return context.Reply("auth.switch.result",
                    new SwitchPayload(false, false, Localization.Get("error.authSessionExpired"), null, true));
            }

            payload = loaded;
        }
        else
        {
            if (account.Cookies is not { Length: > 0 } cookies)
                return context.Reply("auth.switch.result",
                    new SwitchPayload(false, false, Localization.Get("error.authAccountSignedOut"), null, true));

            payload = JsonSerializer.SerializeToUtf8Bytes(cookies, VrchatJsonContext.Default.CookieRecordArray);
        }

        try
        {
            var (error, dead) = await ActivateAsync(account, payload, null, false);

            if (error is null)
                return context.Reply("auth.switch.result", new SwitchPayload(true, false, null, Snapshot()));

            // A session VRChat rejected cannot be retried, so forget it before asking for a new sign-in.
            if (dead)
                DropSession(account);

            return context.Reply("auth.switch.result", new SwitchPayload(false, false, error, null, dead));
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    private async Task<NativeResponse?> RemoveAsync(NativeContext context)
    {
        var dir = context.Payload<AuthAccountRequest>()?.Dir;
        var account = dir is null ? null : _accounts.FirstOrDefault(entry => entry.Dir == dir);

        if (account is null)
            return context.Fail("auth.remove.result", Localization.Get("error.authAccountMissing"));

        // Signing out already forgets the account, so it must not be removed twice. The trash button
        // is an explicit removal, though, so it also drops the saved password and its storage choice.
        if (ReferenceEquals(account, _active))
        {
            await SignOutAsync();
            CredentialStore.Delete(account.Dir);
            CredentialStore.ForgetChoice(account.Dir);
            await RefreshSavedAsync();
            return context.Reply("auth.remove.result", Snapshot());
        }

        RemoveAccount(account);
        return context.Reply("auth.remove.result", Snapshot());
    }

    private Task<NativeResponse?> CancelSignInAsync(NativeContext context)
    {
        DiscardSignIn();
        ClearPending();

        lock (_gate)
            if (_state == "twoFactor")
            {
                _state = _active is null ? "loggedOut" : _ready ? "loggedIn" : "locked";
                _twoFactorMethods = [];
            }

        Notify();
        return Task.FromResult<NativeResponse?>(context.Reply("auth.signin.cancel.result", Snapshot()));
    }

    private async Task<NativeResponse?> SaveStorageAsync(NativeContext context)
    {
        var request = context.Payload<AuthStorageRequest>();
        var mode = request?.Mode switch
        {
            "password" => AuthStorage.Password,
            "system" => AuthStorage.System,
            "tpm" => AuthStorage.Tpm,
            "hello" => AuthStorage.Hello,
            "software" => AuthStorage.Software,
            _ => AuthStorage.None
        };

        var account = _active;
        if (account is null)
        {
            // The session written before accounts had folders can still be forgotten from the unlock page.
            if (mode == AuthStorage.None && AuthStore.LegacyExists)
            {
                AuthStore.DeleteLegacy();

                lock (_gate)
                {
                    _state = "loggedOut";
                    _legacyStorage = AuthStorage.None;
                }

                Notify();
                return context.Reply("auth.storage.save.result", Snapshot());
            }

            return context.Fail("auth.storage.save.result", Localization.Get("error.authSignInFirst"));
        }

        if (mode != AuthStorage.None && !IsLoggedIn)
            return context.Fail("auth.storage.save.result", Localization.Get("error.authSignInFirst"));

        var directory = AccountStore.PathOf(account.Dir);
        var cookies = mode == AuthStorage.None
            ? []
            : JsonSerializer.SerializeToUtf8Bytes(_api.ExportCookies(), VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            if (!await AuthStore.SaveAsync(directory, cookies, mode, request?.Password))
                return context.Fail("auth.storage.save.result", Localization.Get("error.authStoragePassword"));

            if (mode == AuthStorage.None)
                AccountStore.Delete(account.Dir);
            else
                AuthStore.MarkChoiceMade(directory);
        }
        finally
        {
            if (mode != AuthStorage.None)
                CryptographicOperations.ZeroMemory(cookies);
        }

        account.Storage = mode;
        account.Stored = mode != AuthStorage.None;
        account.ChoiceMade = true;
        CredentialStore.UpdateStorage(account.Dir, mode);

        // "Do not remember" keeps the session only for this run, so switching back still works.
        account.Cookies = mode == AuthStorage.None ? _api.ExportCookies() : null;

        // Forgetting a stored session from the unlock screen leaves nothing to unlock.
        if (mode == AuthStorage.None && State == "locked")
            lock (_gate)
            {
                _active = null;
                _state = "loggedOut";
                _legacyStorage = AuthStorage.None;
            }

        PersistIndex();
        Log.Information("Session storage of {Name} set to {Mode}", account.Name, mode);
        Notify();

        // The picture can only be cached once the account has a folder.
        if (account.Stored)
            _ = RefreshAvatarAsync(account);

        return context.Reply("auth.storage.save.result", Snapshot());
    }

    private async Task<NativeResponse?> LogoutAsync(NativeContext context)
    {
        await SignOutAsync();
        return context.Reply("auth.logout.result", Snapshot());
    }

    /// <summary>
    ///     Signs out of VRChat and forgets the active account's folder. A saved password stays, so the
    ///     account can sign back in from the saved list with one press.
    /// </summary>
    private async Task SignOutAsync()
    {
        await _api.LogoutAsync(CancellationToken.None);

        var active = _active;
        ClearSession();

        if (active is not null)
            RemoveAccount(active, false);
    }

    private async Task<NativeResponse?> StartDeviceAsync(NativeContext context)
    {
        ApiDeviceCode? device;

        try
        {
            device = await NewDeviceApi().StartDeviceAsync(CancellationToken.None);
        }
        catch (Exception ex) when (ex is HttpRequestException or OperationCanceledException)
        {
            Log.Warning(ex, "Could not start a device sign-in");
            return context.Fail("auth.device.start.result", Localization.Get("error.authDeviceNetwork"));
        }

        if (device?.DeviceCode is not { Length: > 0 } code ||
            device.VerificationUrlComplete is not { Length: > 0 } url)
            return context.Fail("auth.device.start.result", Localization.Get("error.authDeviceStart"));

        return context.Reply("auth.device.start.result", new DeviceCodePayload(
            code, url, QrCode.DataUrl(url), device.Interval ?? 5, device.ExpiresIn ?? 300));
    }

    private async Task<NativeResponse?> PollDeviceAsync(NativeContext context)
    {
        var code = context.Payload<DevicePollRequest>()?.DeviceCode;
        if (code is not { Length: > 0 })
            return context.Fail("auth.device.poll.result", Localization.Get("error.authDeviceMissing"));

        var api = DeviceApi();

        bool approved;
        string? reason;

        try
        {
            (approved, reason) = await api.PollDeviceAsync(code, CancellationToken.None);
        }
        catch (Exception ex) when (ex is HttpRequestException or OperationCanceledException)
        {
            Log.Warning(ex, "Could not poll the device sign-in");
            return context.Fail("auth.device.poll.result", Localization.Get("error.authDeviceNetwork"));
        }

        if (!approved)
            return context.Reply("auth.device.poll.result", new DevicePollPayload(false, reason ?? "pending", null));

        var (user, _) = await api.GetCurrentUserAsync(CancellationToken.None);
        return await CompleteSignInAsync(api, user)
            ? context.Reply("auth.device.poll.result", new DevicePollPayload(true, null, Snapshot()))
            : context.Fail("auth.device.poll.result", Localization.Get("error.authSessionUnconfirmed"));
    }

    /// <summary>Takes the cookies from a sign-in client and makes that account the active one.</summary>
    private async Task<bool> CompleteSignInAsync(VrchatApi api, ApiAuthUser? user, bool applyLoginOptions = false)
    {
        if (user?.Id is not { Length: > 0 } id)
            return false;

        var payload = JsonSerializer.SerializeToUtf8Bytes(api.ExportCookies(),
            VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            return (await ActivateAsync(FindOrAdd(id, user.DisplayName), payload, user, true, applyLoginOptions))
                .Error is null;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
            DiscardSignIn(api);
        }
    }

    /// <summary>
    ///     Replaces the client's cookies with <paramref name="payload" /> and marks the account active.
    ///     Returns an error message, or null. <c>Dead</c> means VRChat rejected the session itself, so it
    ///     is worth dropping instead of retrying. The previous account is restored either way.
    /// </summary>
    private async Task<(string? Error, bool Dead)> ActivateAsync(Account account, byte[] payload,
        ApiAuthUser? known, bool fresh, bool applyLoginOptions = false)
    {
        var previous = _active;
        var previousCookies = _api.AuthToken is { Length: > 0 } ? _api.ExportCookies() : null;

        // Anything already in flight belongs to the account that is being left behind.
        Interlocked.Increment(ref _generation);

        // A stored session is refreshed before it is left behind; a memory-only one is kept as it is.
        if (previous is not null && previousCookies is not null)
        {
            if (previous.Stored && previous.Storage is AuthStorage.System or AuthStorage.Tpm
                    or AuthStorage.Hello or AuthStorage.Software)
                await PersistAsync(previous);
            else if (!previous.Stored)
                previous.Cookies = previousCookies;
        }

        _pipeline.Stop();
        PresenceService.Instance.Clear();

        lock (_gate)
            _ready = false;

        var cookies = Try.Run(() => JsonSerializer.Deserialize(payload, VrchatJsonContext.Default.CookieRecordArray))
            .GetOrNull();

        if (cookies is not { Length: > 0 })
            return (Localization.Get("error.authSessionExpired"), true);

        _api.ImportCookies(cookies);

        var user = known;
        if (user is null)
        {
            var (fetched, _) = await _api.GetCurrentUserAsync(CancellationToken.None);
            user = fetched;
        }

        if (user?.Id is not { Length: > 0 })
        {
            Restore(previous, previousCookies);
            return (Localization.Get("error.authSessionExpired"), true);
        }

        await CompleteAsync(account, user, fresh, applyLoginOptions);
        return (null, false);
    }

    /// <summary>Takes the account from an API reply and marks the session as signed in.</summary>
    private async Task CompleteAsync(Account account, ApiAuthUser user, bool fresh, bool applyLoginOptions = false)
    {
        var id = user.Id!;

        account.Name = user.DisplayName ?? id;
        account.AvatarUrl = ProfileIcon(user);
        account.LastUsed = DateTimeOffset.UtcNow;
        _lastAccount = account.Dir;

        // A later sign-in keeps the mode this account chose last, even when the session file is
        // gone; only an account that never chose one should see the panel again.
        if (fresh && !account.ChoiceMade && CredentialStore.ChoiceOf(account.Dir) is { } chosen)
        {
            account.Storage = chosen;
            account.ChoiceMade = true;
            account.Stored = chosen != AuthStorage.None;
        }

        if (fresh)
        {
            if (account.Storage == AuthStorage.Password)
            {
                // The session file needs the password again. A manual sign-in still has it in hand;
                // the QR flow does not, so it asks for a storage mode instead.
                if (applyLoginOptions && _pendingPassword is { Length: > 0 } password)
                    await KeepPasswordSessionAsync(id, password);
                else
                {
                    AuthStore.Delete(AccountStore.PathOf(account.Dir));
                    account.Storage = AuthStorage.None;
                    account.Stored = false;
                    account.ChoiceMade = false;
                }
            }
            else if (account.Storage is AuthStorage.System or AuthStorage.Tpm or AuthStorage.Hello
                     or AuthStorage.Software)
            {
                await PersistAsync(account);
            }
        }

        lock (_gate)
        {
            _active = account;
            _account = new(id, account.Name, account.Avatar ?? ProfileIcon(user), user.Status,
                user.StatusDescription);
            _location = user.Location ?? "";
            _userRefreshedAt = DateTimeOffset.UtcNow;
            _state = "loggedIn";
            _twoFactorMethods = [];
            _legacyStorage = AuthStorage.None;
            _ready = true;
            Interlocked.Exchange(ref _expired, 0);
        }

        StopExpiryReminder();

        // Only the password form (and the second factor that follows it) has options to apply.
        if (applyLoginOptions)
            await SavePendingCredentialsAsync(account);

        Log.Information("Signed in as {Name}", account.Name);

        if (_account is { } current)
            Database.Instance.SaveAccount(current);

        // The pipeline is what makes the account page and the list update within seconds.
        PresenceService.Instance.Set(id, user.Status, user.StatusDescription, PresenceSource.Pipeline);

        if (_api.AuthToken is { Length: > 0 } token)
            _pipeline.Start(token);
        else
            Log.Warning("No auth cookie, so the pipeline cannot be started");

        PersistIndex();
        Notify();

        _ = RefreshAvatarAsync(account);
    }

    /// <summary>Re-writes the system-, TPM- or Hello-protected cookie from the current client.</summary>
    private async Task PersistAsync(Account account)
    {
        var cookies = JsonSerializer.SerializeToUtf8Bytes(_api.ExportCookies(),
            VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            var directory = AccountStore.PathOf(account.Dir);
            if (await AuthStore.SaveAsync(directory, cookies, account.Storage, null))
            {
                AuthStore.MarkChoiceMade(directory);
                account.Stored = true;
            }
        }
        finally
        {
            CryptographicOperations.ZeroMemory(cookies);
        }
    }

    private async Task RefreshAvatarAsync(Account account)
    {
        var avatar = account.Stored
            ? await AccountStore.DownloadAvatarAsync(account.Dir, account.AvatarUrl)
            : await AccountStore.RemoteAvatarAsync(account.AvatarUrl);

        if (avatar is null || avatar == account.Avatar)
            return;

        account.Avatar = avatar;

        lock (_gate)
            if (ReferenceEquals(account, _active) && _account is { } current)
                _account = current with { AvatarUrl = avatar };

        Notify();
    }

    private async Task RestoreAsync()
    {
        // A session from before accounts had folders becomes the first account.
        if (_accounts.Count == 0 && AuthStore.LegacyExists)
        {
            await MigrateLegacyAsync();
            return;
        }

        var active = _active;
        if (active is not { Stored: true })
        {
            // There is no session to restore, but a remembered password can still sign in.
            await TryAutoLoginAsync(null);
            return;
        }

        if (active.Storage == AuthStorage.Password)
        {
            // A remembered password is exactly what this mode is holding for; skip the prompt.
            if (await TryAutoLoginAsync(active.Dir))
                return;

            lock (_gate)
                _state = "locked";

            Notify();
            return;
        }

        var (status, payload) = await AuthStore.LoadAsync(AccountStore.PathOf(active.Dir), null);

        if (status == SessionLoadStatus.Cancelled)
        {
            // The session is still there; the account page offers to ask Windows Hello again.
            lock (_gate)
                _state = "locked";

            Notify();
            return;
        }

        if (status == SessionLoadStatus.None || payload is null)
        {
            DropSession(active);
            await TryAutoLoginAsync(active.Dir);
            return;
        }

        try
        {
            var (error, dead) = await ActivateAsync(active, payload, null, false);
            if (error is null)
            {
                Log.Information("Restored the stored VRChat session");
                return;
            }

            DropSession(active);

            if (!dead)
                return;

            // The session died while AntiBot was closed. Remember it as expired so the startup
            // announcement repeats the warning, and try the remembered password before giving up.
            Interlocked.Exchange(ref _expired, 1);
            await TryAutoLoginAsync(active.Dir);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    /// <summary>Moves the session written before accounts had folders into the first account folder.</summary>
    private async Task MigrateLegacyAsync()
    {
        var mode = AuthStore.LegacyMode;

        if (mode == AuthStorage.Password)
        {
            lock (_gate)
            {
                _state = "locked";
                _legacyStorage = mode;
            }

            Notify();
            return;
        }

        var (status, payload) = await AuthStore.LoadLegacyAsync(null);

        if (status == SessionLoadStatus.Cancelled)
        {
            lock (_gate)
                _state = "locked";

            Notify();
            return;
        }

        if (status != SessionLoadStatus.Loaded || payload is null)
        {
            AuthStore.DeleteLegacy();
            Notify();
            return;
        }

        try
        {
            var cookies = Try.Run(() =>
                    JsonSerializer.Deserialize(payload, VrchatJsonContext.Default.CookieRecordArray))
                .GetOrNull();

            if (cookies is not { Length: > 0 })
            {
                AuthStore.DeleteLegacy();
                return;
            }

            _api.ImportCookies(cookies);
            var (user, _) = await _api.GetCurrentUserAsync(CancellationToken.None);

            if (user?.Id is not { Length: > 0 } id)
            {
                // The network may simply be down; the old file is kept for the next launch.
                _api.ResetCookies();
                Notify();
                return;
            }

            var account = FindOrAdd(id, user.DisplayName);
            account.Storage = mode;
            account.ChoiceMade = AuthStore.LegacyChoiceMade;

            var directory = AccountStore.PathOf(account.Dir);
            if (await AuthStore.SaveAsync(directory, payload, mode, null))
            {
                if (account.ChoiceMade)
                    AuthStore.MarkChoiceMade(directory);

                AuthStore.DeleteLegacy();
                account.Stored = true;
                await CompleteAsync(account, user, false);
                return;
            }

            _api.ResetCookies();
            Notify();
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    private async Task<NativeResponse?> UnlockLegacyAsync(NativeContext context, string? password)
    {
        var (status, payload) = await AuthStore.LoadLegacyAsync(password);

        if (status == SessionLoadStatus.Cancelled)
            return context.Fail("auth.unlock.result", Localization.Get("error.authHelloCancelled"));

        if (status != SessionLoadStatus.Loaded || payload is null)
            return context.Fail("auth.unlock.result", Localization.Get("error.authUnlockFailed"));

        try
        {
            var cookies = Try.Run(() =>
                    JsonSerializer.Deserialize(payload, VrchatJsonContext.Default.CookieRecordArray))
                .GetOrNull();

            if (cookies is not { Length: > 0 })
                return context.Fail("auth.unlock.result", Localization.Get("error.authSessionExpired"));

            _api.ImportCookies(cookies);
            var (user, _) = await _api.GetCurrentUserAsync(CancellationToken.None);

            if (user?.Id is not { Length: > 0 } id)
            {
                _api.ResetCookies();
                return context.Fail("auth.unlock.result", Localization.Get("error.authSessionExpired"));
            }

            var account = FindOrAdd(id, user.DisplayName);
            account.Storage = AuthStore.LegacyMode;
            account.ChoiceMade = AuthStore.LegacyChoiceMade;

            var directory = AccountStore.PathOf(account.Dir);
            if (!await AuthStore.SaveAsync(directory, payload, account.Storage, password))
                return context.Fail("auth.unlock.result", Localization.Get("error.authUnlockFailed"));

            if (account.ChoiceMade)
                AuthStore.MarkChoiceMade(directory);

            AuthStore.DeleteLegacy();
            account.Stored = true;

            await CompleteAsync(account, user, false);
            return context.Reply("auth.unlock.result", Snapshot());
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    private void LoadAccounts()
    {
        var index = AccountStore.Load();

        foreach (var stored in index.Accounts)
        {
            var directory = AccountStore.PathOf(stored.Dir);
            var storage = AuthStore.StoredMode(directory);

            _accounts.Add(new Account
            {
                Dir = stored.Dir,
                Name = stored.Name,
                Avatar = AccountStore.Avatar(stored.Dir),
                Storage = storage,
                Stored = storage != AuthStorage.None,
                ChoiceMade = AuthStore.ChoiceMade(directory),
                LastUsed = stored.LastUsed
            });
        }

        // The index keeps the last account that signed in, even when its session was not stored.
        // Automatic sign-in always prefers that account over any other saved password.
        _lastAccount = index.Active;
        _active = _lastAccount is { Length: > 0 } active
            ? _accounts.FirstOrDefault(account => account.Dir == active)
            : null;
    }

    private void PersistIndex() =>
        AccountStore.Save(new AccountIndex(
            _active?.Dir ?? _lastAccount,
            [.. _accounts
                .Where(account => account.Stored)
                .OrderByDescending(account => account.LastUsed)
                .Select(account => new StoredAccount(account.Dir, account.Name, account.LastUsed))]));

    private Account FindOrAdd(string userId, string? displayName)
    {
        var dir = AccountStore.Hash(userId);
        var account = _accounts.FirstOrDefault(entry => entry.Dir == dir);

        if (account is null)
        {
            account = new Account { Dir = dir, Name = displayName ?? userId };
            _accounts.Add(account);
        }

        return account;
    }

    /// <summary>
    ///     Deletes one account's folder and drops it from the list. Signing out keeps the saved
    ///     password so the row can sign in again without typing it.
    /// </summary>
    private void RemoveAccount(Account account, bool forgetCredential = true)
    {
        if (forgetCredential)
        {
            CredentialStore.Delete(account.Dir);
            CredentialStore.ForgetChoice(account.Dir);
        }

        AuthStore.Delete(AccountStore.PathOf(account.Dir));
        AccountStore.Delete(account.Dir);
        _accounts.Remove(account);

        if (ReferenceEquals(account, _active))
            _active = null;

        PersistIndex();
        Notify();
        _ = RefreshSavedAsync();
    }

    /// <summary>Forgets a session that can no longer be opened, but keeps the account in the list.</summary>
    private void DropSession(Account account)
    {
        AuthStore.Delete(AccountStore.PathOf(account.Dir));
        account.Storage = AuthStorage.None;
        account.Stored = false;
        account.ChoiceMade = false;
        account.Cookies = null;

        if (ReferenceEquals(account, _active))
            ClearSession();

        PersistIndex();
        Notify();
    }

    private void Restore(Account? previous, CookieRecord[]? cookies)
    {
        if (previous is null || cookies is null)
            return;

        _api.ImportCookies(cookies);

        if (_api.AuthToken is { Length: > 0 } token)
            _pipeline.Start(token);

        lock (_gate)
            _ready = true;
    }

    /// <summary>Drops the session, the account and the pipeline, and tells the interface.</summary>
    private void ClearSession()
    {
        Interlocked.Increment(ref _generation);
        _api.ResetCookies();
        _pipeline.Stop();
        PresenceService.Instance.Clear();
        Database.Instance.ClearAccount();
        ClearPending();

        lock (_gate)
        {
            _active = null;
            _account = null;
            _location = "";
            _state = "loggedOut";
            _legacyStorage = AuthStorage.None;
            _twoFactorMethods = [];
            _userRefreshedAt = DateTimeOffset.MinValue;
            _ready = false;
            Interlocked.Exchange(ref _expired, 0);
        }

        StopExpiryReminder();
        Notify();
    }

    /// <summary>The session stopped working. The stored cookie stays, so an unlock can still try it.</summary>
    private void Expire()
    {
        // A burst of requests can all receive 401; only the first one changes the state.
        if (!IsReady || Interlocked.Exchange(ref _expired, 1) == 1)
            return;

        _pipeline.Stop();
        PresenceService.Instance.Clear();
        Database.Instance.ClearAccount();
        ClearPending();

        string? directory;

        lock (_gate)
        {
            directory = _active?.Dir;
            _active = null;
            _account = null;
            _location = "";
            _state = "loggedOut";
            _twoFactorMethods = [];
            _userRefreshedAt = DateTimeOffset.MinValue;
            _ready = false;
        }

        Log.Warning("The VRChat session expired");
        WindowManager.Instance.NotifyMainWindow("auth.expired", new AuthExpiredPayload("expired"));
        _ = HandleExpiryAsync(directory);
        PersistIndex();
        Notify();
    }

    /// <summary>
    ///     Tries the saved password before falling back to the repeating warning. The retries inside
    ///     <see cref="TryAutoLoginAsync" /> cover a VPN or a short network outage; once they are used
    ///     up, the user is told to sign in from the account page.
    /// </summary>
    private async Task HandleExpiryAsync(string? directory)
    {
        if (await TryAutoLoginAsync(directory))
            return;

        NotifySessionExpired(directory);
    }

    /// <summary>
    ///     Tells the user, loudly, that automatic protection is off: once now, then every few minutes
    ///     until a sign-in succeeds. Without the session VRChat refuses every moderation request, so a
    ///     bot can join and nothing can be done about it.
    /// </summary>
    private void NotifySessionExpired(string? directory = null)
    {
        NotificationService.Instance.Notify("auth.expired",
            Localization.Get("auth.expired.title"), Localization.Get("auth.expired.message"));

        var cancellation = new CancellationTokenSource();
        if (Interlocked.CompareExchange(ref _expiryReminder, cancellation, null) is not null)
        {
            cancellation.Dispose();
            return;
        }

        _ = Task.Run(async () =>
        {
            using var timer = new PeriodicTimer(ExpiryReminderInterval);

            try
            {
                while (await timer.WaitForNextTickAsync(cancellation.Token))
                {
                    // The account may have asked for automatic sign-in; a recovered network makes
                    // this succeed long before the user notices the warning.
                    if (await TryAutoLoginAsync(directory))
                        return;

                    NotificationService.Instance.Notify("auth.expired",
                        Localization.Get("auth.expired.title"), Localization.Get("auth.expired.message"));
                }
            }
            catch (OperationCanceledException)
            {
                // A sign-in succeeded, or the account was signed out on purpose.
            }
            finally
            {
                Interlocked.CompareExchange(ref _expiryReminder, null, cancellation);
                cancellation.Dispose();
            }
        });
    }

    private void StopExpiryReminder() => Interlocked.Exchange(ref _expiryReminder, null)?.Cancel();

    /// <summary>
    ///     Signs in again with one saved password, either for one account folder or for the most
    ///     recently used one. Automatic attempts honour the account's own flag and the hourly limit;
    ///     a manual row press skips both. A failure that may be temporary is retried a few times.
    /// </summary>
    private async Task<bool> TryAutoLoginAsync(string? directory, bool manual = false)
    {
        if (IsReady || State == "twoFactor")
            return IsReady;

        if (Interlocked.Exchange(ref _autoLogin, 1) == 1)
            return false;

        try
        {
            // The account that signed in last wins; only a legacy index with no recorded account
            // falls back to the most recently written credential.
            var target = directory is { Length: > 0 } requested
                ? requested
                : _lastAccount is { Length: > 0 } last
                    ? last
                    : CredentialStore.Latest();

            if (target is null)
                return false;

            var credential = await CredentialStore.LoadAsync(target);
            if (credential is null)
                return false;

            // Nothing to do when this account never asked for automatic sign-in.
            if (!manual && !credential.AutoLoginEnabled)
                return false;

            for (var attempt = 1; attempt <= AutoLoginRetries; attempt++)
            {
                if (!manual && !ReserveAutoLoginAttempt())
                {
                    Log.Information("Automatic sign-in is paused after {Limit} attempts in the last hour",
                        AutoLoginLimit);
                    return false;
                }

                var (ok, retry) = await AttemptAutoLoginAsync(target, credential);
                if (ok)
                    return true;

                if (!retry || attempt == AutoLoginRetries)
                    return false;

                await Task.Delay(AutoLoginRetryDelay);
            }

            return false;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Automatic sign-in failed");
            return false;
        }
        finally
        {
            Interlocked.Exchange(ref _autoLogin, 0);
        }
    }

    /// <summary>
    ///     One saved-password attempt. <c>Retry</c> is false when trying again cannot help: the password
    ///     was rejected, or VRChat wants a second factor only the user can supply.
    /// </summary>
    private async Task<(bool Ok, bool Retry)> AttemptAutoLoginAsync(string target, RememberedLogin credential)
    {
        Log.Information("Signing in again with the saved VRChat password");

        // A new attempt must not inherit the cookies of an abandoned one.
        lock (_gate)
        {
            _signIn?.Dispose();
            _signIn = null;
        }

        var api = SignInApi();

        // Start from the saved cookies so a still-valid "remember this device" cookie can skip
        // the 2FA prompt, the same way VRCX reuses the saved session before signing in again.
        if (credential.Cookies is { Length: > 0 })
            api.ImportCookies(credential.Cookies);

        ApiAuthUser? user;
        string? error;
        LoginFailure failure;

        try
        {
            (user, error, failure) = await api.LoginAsync(credential.Username, credential.Password,
                CancellationToken.None);
        }
        catch (Exception ex) when (ex is HttpRequestException or OperationCanceledException)
        {
            // Offline or a VPN that dropped the connection; the next try may well work.
            _lastAutoLoginError = Localization.Get("error.authDeviceNetwork");
            Log.Warning(ex, "Could not reach VRChat for an automatic sign-in");
            return (false, true);
        }

        // Only an explicit rejection of the password removes it; an email challenge or a network
        // error leaves the credential in place.
        if (failure == LoginFailure.WrongPassword)
        {
            CredentialStore.Delete(target);
            _lastAutoLoginError = Localization.Get("error.authUnauthorized");
            Log.Warning("VRChat rejected the saved password; the credential was deleted");

            NotificationService.Instance.Notify("auth.savedInvalid",
                Localization.Get("auth.savedInvalidTitle"),
                Localization.Get("auth.savedInvalidMessage"));

            _ = RefreshSavedAsync();
            return (false, false);
        }

        if (error is not null || user is null)
        {
            _lastAutoLoginError = error ?? Localization.Get("error.authSavedLoginFailed");
            Log.Warning("Automatic sign-in failed: {Error}", error ?? "no user");

            // An email confirmation needs the user's inbox; every other failure may clear up.
            return (false, failure != LoginFailure.EmailConfirmation);
        }

        if (user.RequiresTwoFactorAuth is { Length: > 0 } methods)
        {
            lock (_gate)
            {
                _state = "twoFactor";
                _twoFactorMethods = methods;
            }

            Notify();
            NotificationService.Instance.Notify("auth.twoFactor",
                Localization.Get("auth.autoLogin.twoFactorTitle"),
                Localization.Get("auth.autoLogin.twoFactorMessage"));
            return (false, false);
        }

        // The account may have been dropped from the index when the session died; put its chosen
        // storage back so the fresh session is written the same way as before.
        var storage = CredentialStore.StorageOf(target);
        var account = user.Id is { Length: > 0 } id ? FindOrAdd(id, user.DisplayName) : null;

        if (account is not null && account.Storage == AuthStorage.None && storage != AuthStorage.None)
        {
            account.Storage = storage;
            account.Stored = true;
            account.ChoiceMade = true;
        }

        var wasPassword = account?.Storage == AuthStorage.Password;

        if (!await CompleteSignInAsync(api, user))
            return (false, true);

        // A password-protected session was dropped during a fresh sign-in; store the new cookie
        // with the password that is already in memory, so the next launch still unlocks it.
        if (wasPassword && user.Id is { Length: > 0 } userId)
            await KeepPasswordSessionAsync(userId, credential.Password);

        // Keep the cookies of this successful sign-in, including any refreshed 2FA cookie, and the
        // name and picture the account now has.
        await CredentialStore.SaveAsync(target, credential with
        {
            Cookies = _api.ExportCookies(),
            DisplayName = account?.Name ?? credential.DisplayName,
            AvatarUrl = account?.AvatarUrl ?? credential.AvatarUrl
        }, CredentialStore.StorageOf(target));

        _lastAutoLoginError = null;
        _ = RefreshSavedAsync();
        return (true, false);
    }

    /// <summary>Records one automatic attempt, or returns false when the hourly limit is already used.</summary>
    private bool ReserveAutoLoginAttempt()
    {
        lock (_attemptGate)
        {
            var now = Environment.TickCount64;
            _autoLoginAttempts.RemoveAll(at => now - at > AutoLoginWindowMilliseconds);

            if (_autoLoginAttempts.Count >= AutoLoginLimit)
                return false;

            _autoLoginAttempts.Add(now);
            return true;
        }
    }

    private async Task KeepPasswordSessionAsync(string userId, string password)
    {
        var dir = AccountStore.Hash(userId);
        var account = _accounts.FirstOrDefault(entry => entry.Dir == dir);
        if (account is null)
            return;

        var cookies = JsonSerializer.SerializeToUtf8Bytes(_api.ExportCookies(),
            VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            var directory = AccountStore.PathOf(dir);
            if (!await AuthStore.SaveAsync(directory, cookies, AuthStorage.Password, password))
                return;

            AuthStore.MarkChoiceMade(directory);
            CredentialStore.UpdateStorage(dir, AuthStorage.Password);
            account.Storage = AuthStorage.Password;
            account.Stored = true;
            account.ChoiceMade = true;
            PersistIndex();
            Notify();
        }
        finally
        {
            CryptographicOperations.ZeroMemory(cookies);
        }
    }

    /// <summary>
    ///     Applies the login options the user chose on the login form. Only a password sign-in
    ///     touches the store; the QR flow and unlocks leave an existing credential alone.
    /// </summary>
    private async Task SavePendingCredentialsAsync(Account account)
    {
        var username = _pendingUsername;
        var password = _pendingPassword;
        var remember = _pendingRemember;
        var autoLogin = _pendingAutoLogin ?? false;
        ClearPending();

        if (remember is not { } keep)
            return;

        // Unticking "remember" is also an answer: delete whatever was saved for this account.
        if (!keep)
        {
            CredentialStore.Delete(account.Dir);
            await RefreshSavedAsync();
            return;
        }

        if (username is not { Length: > 0 } || password is not { Length: > 0 })
            return;

        var saved = await CredentialStore.SaveAsync(account.Dir,
            new RememberedLogin(username, password, _api.ExportCookies(), account.Name, account.AvatarUrl,
                autoLogin),
            account.Storage);

        if (saved)
            Log.Information("Remembered the VRChat password for {Name}", account.Name);

        await RefreshSavedAsync();
    }

    /// <summary>Rebuilds the saved-password list the login page shows, then tells the interface.</summary>
    private async Task RefreshSavedAsync()
    {
        var saved = await CredentialStore.ListAsync();
        var payload = new List<SavedAccountPayload>(saved.Length);

        foreach (var entry in saved)
        {
            var account = _accounts.FirstOrDefault(candidate => candidate.Dir == entry.Dir);

            var name = entry.DisplayName is { Length: > 0 } display
                ? display
                : account?.Name is { Length: > 0 } known
                    ? known
                    : MaskedAccountName(entry.Username);

            // A file written before display names were stored gets the one the account list knows,
            // so it still survives the account folder being removed or the session not being kept.
            if (entry.DisplayName is not { Length: > 0 } && account?.Name is { Length: > 0 })
                await CredentialStore.UpdateProfileAsync(entry.Dir, account.Name, entry.AvatarUrl);

            payload.Add(new SavedAccountPayload(entry.Dir, name,
                AccountStore.Avatar(entry.Dir) ?? entry.AvatarUrl, entry.AutoLogin));
        }

        lock (_gate)
            _saved = [.. payload];

        Notify();
    }

    /// <summary>A saved account with no stored display name never shows its login name.</summary>
    private static string MaskedAccountName(string username) =>
        username is { Length: > 0 } value ? $"{char.ToUpperInvariant(value[0])}•••" : "•••";

    private void ClearPending()
    {
        _pendingUsername = null;
        _pendingPassword = null;
        _pendingRemember = null;
        _pendingAutoLogin = null;
    }

    private VrchatApi SignInApi()
    {
        lock (_gate)
            return _signIn ??= new VrchatApi();
    }

    /// <summary>The client of the QR flow, which runs beside the password form.</summary>
    private VrchatApi DeviceApi()
    {
        lock (_gate)
            return _device ??= new VrchatApi();
    }

    /// <summary>Each new code reuses the client, so a request in flight is not cut off.</summary>
    private VrchatApi NewDeviceApi()
    {
        lock (_gate)
        {
            if (_device is null)
                return _device = new VrchatApi();

            _device.ResetCookies();
            return _device;
        }
    }

    /// <summary>
    ///     Drops a finished sign-in client. The password form and the QR code are on screen at the
    ///     same time, so finishing one must not dispose the client the other is still waiting on.
    ///     Passing null drops both, which is what cancelling the sign-in wants.
    /// </summary>
    private void DiscardSignIn(VrchatApi? used = null)
    {
        lock (_gate)
        {
            if (used is null || ReferenceEquals(used, _signIn))
            {
                _signIn?.Dispose();
                _signIn = null;
            }

            if (used is null || ReferenceEquals(used, _device))
            {
                _device?.Dispose();
                _device = null;
            }
        }
    }

    /// <summary>Takes the account's own presence from the shared store, so the page follows the pipeline.</summary>
    private void OnPresenceUpdated()
    {
        bool changed;

        lock (_gate)
        {
            var account = _account;
            var presence = account is null ? null : PresenceService.Instance.Get(account.Id);

            changed = account is not null && presence is not null &&
                      (account.Status != presence.Status || account.StatusDescription != presence.StatusDescription);

            if (changed)
                _account = account! with
                {
                    Status = presence!.Status,
                    StatusDescription = presence.StatusDescription
                };
        }

        if (changed)
            Notify();
    }

    private void Notify()
    {
        Changed?.Invoke();
        WindowManager.Instance.NotifyMainWindow("auth.changed", Snapshot());
    }

    private AuthPayload Snapshot()
    {
        var expiresAt = SessionExpiry();

        lock (_gate)
        {
            var storage = _active?.Storage ?? _legacyStorage;

            var accounts = _accounts
                .OrderByDescending(account => account.LastUsed)
                .Select(account => new AccountSummaryPayload(
                    account.Dir,
                    account.Name,
                    account.Avatar ?? account.AvatarUrl,
                    StorageName(account.Storage),
                    ReferenceEquals(account, _active),
                    account.Stored))
                .ToArray();

            return new(_state, _account, StorageName(storage), _twoFactorMethods,
                AuthStore.IsSystemStorageAvailable, AuthStore.SystemStorageName,
                AuthStore.IsTpmAvailable, AuthStore.IsHelloAvailable, AuthStore.IsSoftwareAvailable, expiresAt,
                _active?.ChoiceMade ?? false, accounts, _saved);
        }
    }

    /// <summary>When the stored <c>auth</c> cookie expires, or null for a session cookie.</summary>
    private string? SessionExpiry()
    {
        if (!IsLoggedIn)
            return null;

        var auth = _api.ExportCookies().FirstOrDefault(cookie => cookie.Name == "auth");
        return auth is { Expires: var expires } && expires > DateTimeOffset.UnixEpoch
            ? expires.ToUniversalTime().ToString("O")
            : null;
    }

    /// <summary>
    ///     The account's profile picture: its own icon when it has one, otherwise the avatar's thumbnail.
    /// </summary>
    private static string? ProfileIcon(ApiAuthUser user) =>
        new[]
            {
                user.IconUrl, user.UserIcon, user.ProfilePicOverride, user.ProfilePicOverrideThumbnail,
                user.CurrentAvatarThumbnailImageUrl
            }
            .FirstOrDefault(url => !string.IsNullOrEmpty(url));

    private static string StorageName(AuthStorage storage) => storage switch
    {
        AuthStorage.Password => "password",
        AuthStorage.System => "system",
        AuthStorage.Tpm => "tpm",
        AuthStorage.Hello => "hello",
        AuthStorage.Software => "software",
        _ => "none"
    };

    /// <summary>One account AntiBot can switch to; only its name and picture are ever shown.</summary>
    private sealed class Account
    {
        public required string Dir { get; init; }
        public string Name { get; set; } = "";
        public string? Avatar { get; set; }
        public string? AvatarUrl { get; set; }
        public AuthStorage Storage { get; set; }
        public bool Stored { get; set; }
        public bool ChoiceMade { get; set; }
        public DateTimeOffset LastUsed { get; set; }

        /// <summary>Cookies of a "do not remember" account, kept for this run only.</summary>
        public CookieRecord[]? Cookies { get; set; }
    }
}

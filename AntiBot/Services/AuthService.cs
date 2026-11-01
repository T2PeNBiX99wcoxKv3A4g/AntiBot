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

    private readonly VrchatApi _api = new();
    private readonly List<Account> _accounts = [];

    private readonly Lock _gate = new();
    private readonly VrchatPipeline _pipeline = new();

    private VrchatAccount? _account;
    private Account? _active;
    private VrchatApi? _device;
    private int _generation;
    private string _location = "";
    private AuthStorage _legacyStorage = AuthStorage.None;
    private volatile bool _ready;
    private VrchatApi? _signIn;
    private string _state = "loggedOut";
    private string[] _twoFactorMethods = [];
    private DateTimeOffset _userRefreshedAt = DateTimeOffset.MinValue;

    public AuthService()
    {
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
        _ = RestoreAsync();
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
        "auth.verify" => VerifyAsync(context),
        "auth.unlock" => UnlockAsync(context),
        "auth.switch" => SwitchAsync(context),
        "auth.remove" => RemoveAsync(context),
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

        var (user, error) = await api.LoginAsync(username, password, CancellationToken.None);
        if (error is not null)
        {
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

        return await CompleteSignInAsync(api, user)
            ? context.Reply("auth.login.result", Snapshot())
            : context.Fail("auth.login.result", Localization.Get("error.authNoAccount"));
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
        return await CompleteSignInAsync(api, user)
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
            var error = await ActivateAsync(account, payload, null, false);
            return error is null
                ? context.Reply("auth.unlock.result", Snapshot())
                : context.Fail("auth.unlock.result", error);
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
                    new SwitchPayload(false, false, Localization.Get("error.authSessionExpired"), null));
            }

            payload = loaded;
        }
        else
        {
            if (account.Cookies is not { Length: > 0 } cookies)
                return context.Reply("auth.switch.result",
                    new SwitchPayload(false, false, Localization.Get("error.authAccountSignedOut"), null));

            payload = JsonSerializer.SerializeToUtf8Bytes(cookies, VrchatJsonContext.Default.CookieRecordArray);
        }

        try
        {
            var error = await ActivateAsync(account, payload, null, false);
            return error is null
                ? context.Reply("auth.switch.result", new SwitchPayload(true, false, null, Snapshot()))
                : context.Reply("auth.switch.result", new SwitchPayload(false, false, error, null));
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

        // Signing out already forgets the account, so it must not be removed twice.
        if (ReferenceEquals(account, _active))
        {
            await SignOutAsync();
            return context.Reply("auth.remove.result", Snapshot());
        }

        RemoveAccount(account);
        return context.Reply("auth.remove.result", Snapshot());
    }

    private Task<NativeResponse?> CancelSignInAsync(NativeContext context)
    {
        DiscardSignIn();

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

    /// <summary>Signs out of VRChat and forgets the active account, including its folder.</summary>
    private async Task SignOutAsync()
    {
        await _api.LogoutAsync(CancellationToken.None);

        var active = _active;
        ClearSession();

        if (active is not null)
            RemoveAccount(active);
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
    private async Task<bool> CompleteSignInAsync(VrchatApi api, ApiAuthUser? user)
    {
        if (user?.Id is not { Length: > 0 } id)
            return false;

        var payload = JsonSerializer.SerializeToUtf8Bytes(api.ExportCookies(),
            VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            return await ActivateAsync(FindOrAdd(id, user.DisplayName), payload, user, true) is null;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
            DiscardSignIn();
        }
    }

    /// <summary>
    ///     Replaces the client's cookies with <paramref name="payload" /> and marks the account active.
    ///     Returns an error message, or null. The previous account is restored when the new one is dead.
    /// </summary>
    private async Task<string?> ActivateAsync(Account account, byte[] payload, ApiAuthUser? known, bool fresh)
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
            return Localization.Get("error.authSessionExpired");

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
            return Localization.Get("error.authSessionExpired");
        }

        await CompleteAsync(account, user, fresh);
        return null;
    }

    /// <summary>Takes the account from an API reply and marks the session as signed in.</summary>
    private async Task CompleteAsync(Account account, ApiAuthUser user, bool fresh)
    {
        var id = user.Id!;

        account.Name = user.DisplayName ?? id;
        account.AvatarUrl = ProfileIcon(user);
        account.LastUsed = DateTimeOffset.UtcNow;

        if (fresh)
        {
            // A new cookie cannot be written into a password-protected file, because the password is not
            // kept; the session is dropped and the account page asks for a storage mode again.
            if (account.Storage == AuthStorage.Password)
            {
                AuthStore.Delete(AccountStore.PathOf(account.Dir));
                account.Storage = AuthStorage.None;
                account.Stored = false;
                account.ChoiceMade = false;
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
        }

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
            return;

        if (active.Storage == AuthStorage.Password)
        {
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
            return;
        }

        try
        {
            var error = await ActivateAsync(active, payload, null, false);
            if (error is null)
                Log.Information("Restored the stored VRChat session");
            else
                DropSession(active);
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

        _active = index.Active is { Length: > 0 } active
            ? _accounts.FirstOrDefault(account => account.Dir == active)
            : null;
    }

    private void PersistIndex() =>
        AccountStore.Save(new AccountIndex(
            _active is { Stored: true } ? _active.Dir : null,
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

    /// <summary>Deletes one account's folder and drops it from the list.</summary>
    private void RemoveAccount(Account account)
    {
        AuthStore.Delete(AccountStore.PathOf(account.Dir));
        AccountStore.Delete(account.Dir);
        _accounts.Remove(account);

        if (ReferenceEquals(account, _active))
            _active = null;

        PersistIndex();
        Notify();
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
        }

        Notify();
    }

    /// <summary>The session stopped working. The stored cookie stays, so an unlock can still try it.</summary>
    private void Expire()
    {
        _pipeline.Stop();
        PresenceService.Instance.Clear();
        Database.Instance.ClearAccount();

        lock (_gate)
        {
            _active = null;
            _account = null;
            _location = "";
            _state = "loggedOut";
            _twoFactorMethods = [];
            _userRefreshedAt = DateTimeOffset.MinValue;
            _ready = false;
        }

        Log.Warning("The VRChat session expired");
        PersistIndex();
        Notify();
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

    private void DiscardSignIn()
    {
        lock (_gate)
        {
            _signIn?.Dispose();
            _signIn = null;

            _device?.Dispose();
            _device = null;
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
                _active?.ChoiceMade ?? false, accounts);
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

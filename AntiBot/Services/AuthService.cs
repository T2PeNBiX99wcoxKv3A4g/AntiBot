using System.Net;
using System.Security.Cryptography;
using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Owns the VRChat session: sign-in, the second factor, the device (QR) flow, keeping the cookie
///     between launches, and telling the interface when any of that changes.
/// </summary>
/// <remarks>
///     The password is only ever used to answer one sign-in request, or to derive the key that unlocks
///     a stored cookie; it is never written anywhere. A .NET string cannot be wiped, so the only thing
///     this class can do is not keep it: it lives in the message payload and is released with it.
/// </remarks>
internal sealed class AuthService : Singleton<AuthService>
{
    private static readonly TimeSpan LocationRefreshInterval = TimeSpan.FromSeconds(20);
    private readonly VrchatApi _api = new();

    private readonly Lock _gate = new();
    private readonly VrchatPipeline _pipeline = new();

    private VrchatAccount? _account;
    private string _location = "";
    private string _state = "loggedOut";
    private AuthStorage _storage = AuthStorage.None;
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

    public string State
    {
        get
        {
            lock (_gate)
                return _state;
        }
    }

    /// <summary>Raised after the session state changed, so the instance list can react to a sign-in.</summary>
    public event Action? Changed;

    /// <summary>Raised when VRChat pushes a notification over the pipeline.</summary>
    public event Action? Notification;

    /// <summary>Restores a stored session. Called once, after the singletons exist.</summary>
    public void Initialize() => _ = RestoreAsync();

    /// <summary>
    ///     The instance the signed-in account is in, refreshed at most every
    ///     <see cref="LocationRefreshInterval" />, or null when the session is gone.
    /// </summary>
    public async Task<string?> GetLocationAsync(CancellationToken token)
    {
        if (!IsLoggedIn)
            return null;

        if (DateTimeOffset.UtcNow - _userRefreshedAt < LocationRefreshInterval)
            return _location;

        var (user, status) = await _api.GetCurrentUserAsync(token);

        if (user is null)
        {
            if (status == HttpStatusCode.Unauthorized)
                Expire();

            return null;
        }

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
        IsLoggedIn
            ? _api.GetInstanceAsync(location, token)
            : Task.FromResult<(ApiInstance?, string?)>((null, null));

    public Task<(ApiUser? User, string? Error)> GetUserAsync(string userId, CancellationToken token) =>
        IsLoggedIn
            ? _api.GetUserAsync(userId, token)
            : Task.FromResult<(ApiUser?, string?)>((null, null));

    public Task<ApiFile?> GetFileAsync(string fileId, CancellationToken token) =>
        IsLoggedIn ? _api.GetFileAsync(fileId, token) : Task.FromResult<ApiFile?>(null);

    public Task<ApiNotification[]?> GetFriendRequestsAsync(CancellationToken token) =>
        IsLoggedIn ? _api.GetFriendRequestsAsync(token) : Task.FromResult<ApiNotification[]?>(null);

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "auth.state" => Task.FromResult<NativeResponse?>(context.Reply("auth.state.result", Snapshot())),
        "auth.login" => LoginAsync(context),
        "auth.verify" => VerifyAsync(context),
        "auth.unlock" => UnlockAsync(context),
        "auth.storage.save" => SaveStorageAsync(context),
        "auth.logout" => LogoutAsync(context),
        "auth.device.start" => StartDeviceAsync(context),
        "auth.device.poll" => PollDeviceAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> LoginAsync(NativeContext context)
    {
        var request = context.Payload<AuthLoginRequest>();
        if (request?.Username is not { Length: > 0 } username || request.Password is not { Length: > 0 } password)
            return context.Fail("auth.login.result", "Enter your VRChat username and password.");

        var (user, error) = await _api.LoginAsync(username, password, CancellationToken.None);
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

        return await CompleteAsync(user, true)
            ? context.Reply("auth.login.result", Snapshot())
            : context.Fail("auth.login.result", "VRChat returned no account. Sign in again.");
    }

    private async Task<NativeResponse?> VerifyAsync(NativeContext context)
    {
        var request = context.Payload<AuthVerifyRequest>();
        if (request?.Code.Trim() is not { Length: > 0 } code)
            return context.Fail("auth.verify.result", "Enter the code.");

        var verified = request.Method switch
        {
            "totp" => await _api.VerifyTotpAsync(code, CancellationToken.None),
            "emailOtp" => await _api.VerifyEmailOtpAsync(code, CancellationToken.None),
            _ => await _api.VerifyRecoveryAsync(code, CancellationToken.None)
        };

        if (!verified)
            return context.Fail("auth.verify.result", "That code was not accepted.");

        var (user, _) = await _api.GetCurrentUserAsync(CancellationToken.None);
        return await CompleteAsync(user, true)
            ? context.Reply("auth.verify.result", Snapshot())
            : context.Fail("auth.verify.result", "The session could not be confirmed. Sign in again.");
    }

    private async Task<NativeResponse?> UnlockAsync(NativeContext context)
    {
        var password = context.Payload<AuthUnlockRequest>()?.Password;
        var hello = _storage == AuthStorage.Hello;

        if (!hello && password is not { Length: > 0 })
            return context.Fail("auth.unlock.result", "Enter your password to unlock the saved session.");

        var (status, payload) = await AuthStore.LoadAsync(hello ? null : password);

        if (status == SessionLoadStatus.Cancelled)
            return context.Fail("auth.unlock.result", "The Windows Hello prompt was cancelled.");

        if (status == SessionLoadStatus.None || payload is null)
            return context.Fail("auth.unlock.result",
                hello ? "The saved session could not be unlocked." : "That password does not unlock the saved session.");

        try
        {
            if (!await UseCookiesAsync(payload))
            {
                Forget();
                return context.Fail("auth.unlock.result", "The saved session has expired. Sign in again.");
            }
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }

        return context.Reply("auth.unlock.result", Snapshot());
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

        if (mode != AuthStorage.None && !IsLoggedIn)
            return context.Fail("auth.storage.save.result", "Sign in first.");

        var cookies = mode == AuthStorage.None
            ? []
            : JsonSerializer.SerializeToUtf8Bytes(_api.ExportCookies(), VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            if (!await AuthStore.SaveAsync(cookies, mode, request?.Password))
                return context.Fail("auth.storage.save.result", "Enter the password that unlocks the session.");
        }
        finally
        {
            CryptographicOperations.ZeroMemory(cookies);
        }

        lock (_gate)
        {
            _storage = mode;

            // Forgetting a stored session from the unlock screen leaves nothing to unlock.
            if (mode == AuthStorage.None && _state == "locked")
                _state = "loggedOut";
        }

        Log.Information("Session storage set to {Mode}", mode);
        Notify();
        return context.Reply("auth.storage.save.result", Snapshot());
    }

    private async Task<NativeResponse?> LogoutAsync(NativeContext context)
    {
        await _api.LogoutAsync(CancellationToken.None);
        Forget();
        return context.Reply("auth.logout.result", Snapshot());
    }

    private async Task<NativeResponse?> StartDeviceAsync(NativeContext context)
    {
        var device = await _api.StartDeviceAsync(CancellationToken.None);
        if (device?.DeviceCode is not { Length: > 0 } code ||
            device.VerificationUrlComplete is not { Length: > 0 } url)
            return context.Fail("auth.device.start.result", "VRChat did not start a device sign-in.");

        return context.Reply("auth.device.start.result", new DeviceCodePayload(
            code, url, QrCode.DataUrl(url), device.Interval ?? 5, device.ExpiresIn ?? 300));
    }

    private async Task<NativeResponse?> PollDeviceAsync(NativeContext context)
    {
        var code = context.Payload<DevicePollRequest>()?.DeviceCode;
        if (code is not { Length: > 0 })
            return context.Fail("auth.device.poll.result", "The device sign-in is missing its code.");

        var (approved, reason) = await _api.PollDeviceAsync(code, CancellationToken.None);
        if (!approved)
            return context.Reply("auth.device.poll.result", new DevicePollPayload(false, reason ?? "pending", null));

        var (user, _) = await _api.GetCurrentUserAsync(CancellationToken.None);
        return await CompleteAsync(user, true)
            ? context.Reply("auth.device.poll.result", new DevicePollPayload(true, null, Snapshot()))
            : context.Fail("auth.device.poll.result", "The session could not be confirmed. Sign in again.");
    }

    /// <summary>Takes the account from an API reply and marks the session as signed in.</summary>
    private async Task<bool> CompleteAsync(ApiAuthUser? user, bool fresh = false)
    {
        if (user?.Id is not { Length: > 0 } id)
            return false;

        AuthStorage storage;
        lock (_gate)
        {
            _account = new(id, user.DisplayName ?? id, ProfileIcon(user), user.Status,
                user.StatusDescription);
            _location = user.Location ?? "";
            _userRefreshedAt = DateTimeOffset.UtcNow;
            _state = "loggedIn";
            _twoFactorMethods = [];
            storage = _storage;
        }

        // A fresh sign-in issues a new cookie. System storage can be updated silently; a password-
        // protected file cannot, because the password is not kept, so it is dropped and asked for again.
        if (fresh && storage is AuthStorage.System or AuthStorage.Tpm or AuthStorage.Hello or AuthStorage.Software)
            await PersistAsync(storage);
        else if (fresh && storage == AuthStorage.Password)
        {
            AuthStore.Delete();
            lock (_gate)
                _storage = AuthStorage.None;
        }

        Log.Information("Signed in as {Name}", user.DisplayName ?? id);

        // The pipeline is what makes the account page and the list update within seconds.
        PresenceService.Instance.Set(id, user.Status, user.StatusDescription, PresenceSource.Pipeline);

        if (_api.AuthToken is { Length: > 0 } token)
            _pipeline.Start(token);
        else
            Log.Warning("No auth cookie, so the pipeline cannot be started");

        Notify();
        return true;
    }

    /// <summary>Re-writes the system- or TPM-protected cookie after a fresh sign-in.</summary>
    private async Task PersistAsync(AuthStorage storage)
    {
        var cookies = JsonSerializer.SerializeToUtf8Bytes(_api.ExportCookies(),
            VrchatJsonContext.Default.CookieRecordArray);

        try
        {
            await AuthStore.SaveAsync(cookies, storage, null);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(cookies);
        }
    }

    private async Task<bool> UseCookiesAsync(byte[] payload)
    {
        var cookies = Try.Run(() =>
                JsonSerializer.Deserialize(payload, VrchatJsonContext.Default.CookieRecordArray))
            .GetOrNull();

        if (cookies is not { Length: > 0 })
            return false;

        _api.ImportCookies(cookies);

        var (user, _) = await _api.GetCurrentUserAsync(CancellationToken.None);
        return await CompleteAsync(user);
    }

    private async Task RestoreAsync()
    {
        if (!AuthStore.Exists)
            return;

        var mode = AuthStore.StoredMode;
        lock (_gate)
            _storage = mode;

        if (mode == AuthStorage.Password)
        {
            // Unlocking needs the password, which only the account page can ask for.
            lock (_gate)
                _state = "locked";

            Notify();
            return;
        }

        var (status, payload) = await AuthStore.LoadAsync(null);

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
            Forget();
            return;
        }

        try
        {
            if (await UseCookiesAsync(payload))
                Log.Information("Restored the stored VRChat session");
            else
                Forget();
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    /// <summary>Drops the session, the stored cookie and the account, and tells the interface.</summary>
    private void Forget()
    {
        AuthStore.Delete();
        _api.ResetCookies();
        _pipeline.Stop();
        PresenceService.Instance.Clear();

        lock (_gate)
        {
            _account = null;
            _location = "";
            _state = "loggedOut";
            _storage = AuthStorage.None;
            _twoFactorMethods = [];
            _userRefreshedAt = DateTimeOffset.MinValue;
        }

        Notify();
    }

    /// <summary>The session stopped working. The stored cookie stays, so an unlock can still try it.</summary>
    private void Expire()
    {
        _pipeline.Stop();
        PresenceService.Instance.Clear();

        lock (_gate)
        {
            _account = null;
            _location = "";
            _state = "loggedOut";
            _twoFactorMethods = [];
            _userRefreshedAt = DateTimeOffset.MinValue;
        }

        Log.Warning("The VRChat session expired");
        Notify();
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
            return new(_state, _account, StorageName(_storage), _twoFactorMethods,
                AuthStore.IsSystemStorageAvailable, AuthStore.SystemStorageName,
                AuthStore.IsTpmAvailable, AuthStore.IsHelloAvailable, AuthStore.IsSoftwareAvailable, expiresAt);
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
}
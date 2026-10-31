using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     The VRChat web API, as far as AntiBot needs it: sign-in, the session cookie, and the instance
///     the signed-in account is in.
/// </summary>
/// <remarks>
///     The cookie jar belongs to this client alone, so nothing else in the process can send the session
///     to another host by accident. A <see cref="User-Agent" /> is mandatory: VRChat refuses requests
///     without one.
/// </remarks>
internal sealed class VrchatApi : IDisposable
{
    private static readonly Uri BaseUri = new("https://api.vrchat.cloud/api/1/");
    private static readonly ILogger Logger = Log.ForContext<VrchatApi>();

    private CookieContainer _cookies = new();
    private HttpClient _http = null!;

    public VrchatApi() => Build();

    /// <summary>The value of the <c>auth</c> cookie, which the pipeline websocket accepts.</summary>
    public string? AuthToken => _cookies.GetCookies(BaseUri)["auth"]?.Value;

    public void Dispose() => _http.Dispose();

    /// <summary>Signs in with a password. The reply says whether a second factor is still needed.</summary>
    public async Task<(ApiAuthUser? User, string? Error)> LoginAsync(string username, string password,
        CancellationToken token)
    {
        // VRChat expects both halves percent-encoded, the way its own clients send them.
        var basic = Convert.ToBase64String(Encoding.UTF8.GetBytes(
            $"{Uri.EscapeDataString(username)}:{Uri.EscapeDataString(password)}"));

        using var request = new HttpRequestMessage(HttpMethod.Get, "auth/user");
        request.Headers.Authorization = new("Basic", basic);

        using var response = await _http.SendAsync(request, token);
        var body = await response.Content.ReadAsStringAsync(token);

        if (!response.IsSuccessStatusCode)
            return (null, Describe(response.StatusCode, body));

        return (Deserialize(body, VrchatJsonContext.Default.ApiAuthUser), null);
    }

    public Task<bool> VerifyTotpAsync(string code, CancellationToken token) =>
        VerifyAsync("auth/twofactorauth/totp/verify", code, token);

    public Task<bool> VerifyEmailOtpAsync(string code, CancellationToken token) =>
        VerifyAsync("auth/twofactorauth/emailotp/verify", code, token);

    /// <summary>The recovery codes VRChat hands out when 2FA is enabled.</summary>
    public Task<bool> VerifyRecoveryAsync(string code, CancellationToken token) =>
        VerifyAsync("auth/twofactorauth/otp/verify", code, token);

    /// <summary>The account behind the current cookies, or null when the session is gone.</summary>
    public async Task<(ApiAuthUser? User, HttpStatusCode Status)> GetCurrentUserAsync(CancellationToken token)
    {
        using var response = await _http.GetAsync("auth/user", token);
        if (!response.IsSuccessStatusCode)
            return (null, response.StatusCode);

        var user = Deserialize(await response.Content.ReadAsStringAsync(token),
            VrchatJsonContext.Default.ApiAuthUser);

        return (user, response.StatusCode);
    }

    /// <summary>The instance at <paramref name="location" /> (<c>wrld_…:instance</c>).</summary>
    public async Task<(ApiInstance? Instance, string? Error)> GetInstanceAsync(string location,
        CancellationToken token)
    {
        using var response = await _http.GetAsync(new Uri(BaseUri, $"instances/{location}"), token);
        var body = await response.Content.ReadAsStringAsync(token);

        if (!response.IsSuccessStatusCode)
            return (null, Describe(response.StatusCode, body));

        return (Deserialize(body, VrchatJsonContext.Default.ApiInstance), null);
    }

    /// <summary>One player's profile. This endpoint is tightly rate limited, so callers must cache.</summary>
    public async Task<(ApiUser? User, string? Error)> GetUserAsync(string userId, CancellationToken token)
    {
        using var response = await _http.GetAsync(new Uri(BaseUri, $"users/{Uri.EscapeDataString(userId)}"), token);
        var body = await response.Content.ReadAsStringAsync(token);

        if (!response.IsSuccessStatusCode)
            return (null, Describe(response.StatusCode, body));

        return (Deserialize(body, VrchatJsonContext.Default.ApiUser), null);
    }

    /// <summary>
    ///     One uploaded file. An avatar image is named <c>Avatar - &lt;name&gt; - Image - &lt;date&gt;</c>,
    ///     which is how the avatar's name is known without a third-party database.
    /// </summary>
    public async Task<(ApiFile? File, HttpStatusCode Status)> GetFileAsync(string fileId, CancellationToken token)
    {
        using var response = await _http.GetAsync(new Uri(BaseUri, $"file/{Uri.EscapeDataString(fileId)}"), token);
        if (!response.IsSuccessStatusCode)
        {
            Logger.Debug("File lookup {FileId} answered {Status}", fileId, response.StatusCode);
            return (null, response.StatusCode);
        }

        var body = await response.Content.ReadAsStringAsync(token);
        return (Deserialize(body, VrchatJsonContext.Default.ApiFile), response.StatusCode);
    }

    /// <summary>
    ///     The pending friend requests, as notifications. VRChat has two notification APIs and its own
    ///     <c>type</c> filter is unreliable, so the lists are fetched whole and filtered here.
    /// </summary>
    public async Task<ApiNotification[]?> GetFriendRequestsAsync(CancellationToken token)
    {
        // The visible v1 list is the only one that says what is still pending.
        var pending = await FetchAsync("auth/user/notifications?hidden=false", token);
        if (pending is null)
            return null;

        var requests = new Dictionary<string, ApiNotification>();

        foreach (var notification in pending)
            if (FriendRequestId(notification) is { } id)
                requests[id] = notification;

        // The hidden and v2 lists only add history; a failure there must not stop the poll.
        foreach (var path in new[] { "auth/user/notifications?hidden=true", "notifications" })
            foreach (var notification in await FetchAllAsync(path, token))
                if (FriendRequestId(notification) is { } id)
                    requests.TryAdd(id, notification with { Hidden = true });

        return [.. requests.Values];
    }

    private static string? FriendRequestId(ApiNotification notification) =>
        notification.Type == "friendRequest" && notification.Id is { Length: > 0 } id ? id : null;

    private async Task<ApiNotification[]> FetchAllAsync(string path, CancellationToken token)
    {
        var all = new List<ApiNotification>();

        for (var offset = 0; offset < 500; offset += 100)
        {
            var separator = path.Contains('?') ? '&' : '?';
            var page = await FetchAsync($"{path}{separator}n=100&offset={offset}", token);
            if (page is null)
                break;

            all.AddRange(page);

            if (page.Length < 100)
                break;
        }

        return [.. all];
    }

    private async Task<ApiNotification[]?> FetchAsync(string path, CancellationToken token)
    {
        var attempt = await Try.Run(async () =>
        {
            using var response = await _http.GetAsync(path, token);
            if (!response.IsSuccessStatusCode)
                return null;

            return Deserialize(await response.Content.ReadAsStringAsync(token),
                VrchatJsonContext.Default.ApiNotificationArray);
        });

        return attempt
            .OnFailure(ex => Logger.Warning(ex, "Notifications request {Path} failed", path))
            .GetOrNull();
    }

    /// <summary>The public profile of a user; <c>users/{id}</c> does not include the bio for non-friends.</summary>
    public async Task<ApiPublicProfile?> GetPublicProfileAsync(string userId, CancellationToken token)
    {
        using var response = await _http.GetAsync(new Uri(BaseUri, $"profile/{Uri.EscapeDataString(userId)}"),
            token);
        if (!response.IsSuccessStatusCode)
            return null;

        return Deserialize(await response.Content.ReadAsStringAsync(token),
            VrchatJsonContext.Default.ApiPublicProfile);
    }

    /// <summary>Hides a friend request notification (VRChat's "reject").</summary>
    public async Task<bool> HideFriendRequestAsync(string notificationId, CancellationToken token)
    {
        using var response = await _http.PutAsync(
            $"auth/user/notifications/{Uri.EscapeDataString(notificationId)}/hide", null, token);
        return response.IsSuccessStatusCode;
    }

    /// <summary>Adds a player moderation: <c>block</c>, <c>interactOff</c> or <c>muteChat</c>.</summary>
    public async Task<bool> ModerateUserAsync(string userId, string type, CancellationToken token)
    {
        using var content = Json(JsonSerializer.Serialize(new ApiModerationRequest(userId, type),
            VrchatJsonContext.Default.ApiModerationRequest));
        using var response = await _http.PostAsync("auth/user/playermoderations", content, token);

        if (!response.IsSuccessStatusCode)
            Logger.Warning("Moderation {Type} for {UserId} answered {Status}", type, userId, response.StatusCode);

        return response.IsSuccessStatusCode;
    }

    /// <summary>Removes a player moderation: <c>unblock</c>, <c>interactOn</c> or <c>unmuteChat</c>.</summary>
    public async Task<bool> UnmoderateUserAsync(string userId, string type, CancellationToken token)
    {
        using var content = Json(JsonSerializer.Serialize(new ApiModerationRequest(userId, type),
            VrchatJsonContext.Default.ApiModerationRequest));
        using var response = await _http.PutAsync("auth/user/unplayermoderate", content, token);
        return response.IsSuccessStatusCode;
    }

    /// <summary>
    ///     Creates a new instance of a world. The home location is only a world id, while a self-invite
    ///     needs <c>worldId:instanceId</c>, so going home opens an instance of the home world first.
    /// </summary>
    public async Task<string?> CreateInstanceAsync(string worldId, string ownerId, CancellationToken token)
    {
        // The home instance type is a client setting, not part of the API; try the common ones.
        foreach (var type in new[] { "hidden", "private", "friends" })
            if (await CreateInstanceAsync(worldId, ownerId, type, token) is { Length: > 0 } location)
                return location;

        return null;
    }

    private async Task<string?> CreateInstanceAsync(string worldId, string ownerId, string type,
        CancellationToken token)
    {
        using var content = Json(JsonSerializer.Serialize(
            new ApiCreateInstanceRequest(worldId, type, "us", ownerId, false),
            VrchatJsonContext.Default.ApiCreateInstanceRequest));
        using var response = await _http.PostAsync("instances", content, token);
        var body = await response.Content.ReadAsStringAsync(token);

        if (!response.IsSuccessStatusCode)
        {
            Logger.Warning("Creating a {Type} instance of {WorldId} answered {Status}: {Body}", type, worldId,
                response.StatusCode, body);
            return null;
        }

        var instance = Deserialize(body, VrchatJsonContext.Default.ApiInstance);
        return instance?.Location ??
               (instance?.WorldId is { Length: > 0 } id && instance.InstanceId is { Length: > 0 } instanceId
                   ? $"{id}:{instanceId}"
                   : null);
    }

    /// <summary>Sends the account an invite to a location; its own home world is how it goes home.</summary>
    public async Task<bool> InviteMyselfAsync(string location, CancellationToken token)
    {
        using var response = await _http.PostAsync($"invite/myself/to/{location}", null, token);
        Logger.Debug("Self invite to {Location} answered {Status}", location, response.StatusCode);
        return response.IsSuccessStatusCode;
    }

    /// <summary>Starts a device (QR) sign-in; the account is approved in a browser or the VRChat app.</summary>
    public async Task<ApiDeviceCode?> StartDeviceAsync(CancellationToken token)
    {
        using var content = Json("{}");
        using var response = await _http.PostAsync("auth/device/code", content, token);
        if (!response.IsSuccessStatusCode)
            return null;

        return Deserialize(await response.Content.ReadAsStringAsync(token),
            VrchatJsonContext.Default.ApiDeviceCode);
    }

    /// <summary>
    ///     One poll of a device sign-in. Returns the account once it was approved, or the reason it is
    ///     not ready yet (<c>authorization_pending</c>, <c>slow_down</c>, <c>expired_token</c>).
    /// </summary>
    public async Task<(bool Approved, string? Reason)> PollDeviceAsync(string deviceCode, CancellationToken token)
    {
        using var content = Json(JsonSerializer.Serialize(new(deviceCode),
            VrchatJsonContext.Default.ApiDeviceStatusRequest));
        using var response = await _http.PostAsync("auth/device/status", content, token);
        var body = await response.Content.ReadAsStringAsync(token);

        if (!response.IsSuccessStatusCode)
            return (false, Describe(response.StatusCode, body));

        var status = Deserialize(body, VrchatJsonContext.Default.ApiDeviceStatus);
        return (status?.User is not null, status?.User is null ? "authorization_pending" : null);
    }

    /// <summary>Ends the session on VRChat's side. Best effort: the local state is cleared either way.</summary>
    public async Task LogoutAsync(CancellationToken token)
    {
        try
        {
            using var response = await _http.PostAsync("auth/logout", null, token);
            Logger.Debug("VRChat sign-out answered {Status}", response.StatusCode);
        }
        catch (Exception ex)
        {
            Logger.Debug(ex, "VRChat sign-out request failed");
        }
    }

    public CookieRecord[] ExportCookies() =>
    [
        .. _cookies.GetCookies(BaseUri)
            .Select(cookie => new CookieRecord(cookie.Name, cookie.Value, cookie.Domain, cookie.Path,
                new(cookie.Expires.ToUniversalTime()), cookie.Secure, cookie.HttpOnly))
    ];

    public void ImportCookies(IEnumerable<CookieRecord> cookies)
    {
        ResetCookies();

        foreach (var record in cookies)
        {
            var cookie = new Cookie(record.Name, record.Value, record.Path ?? "/", record.Domain ?? BaseUri.Host)
            {
                Secure = record.Secure,
                HttpOnly = record.HttpOnly
            };

            if (record.Expires > DateTimeOffset.UnixEpoch)
                cookie.Expires = record.Expires.UtcDateTime;

            try
            {
                _cookies.Add(cookie);
            }
            catch (CookieException ex)
            {
                Logger.Warning(ex, "Skipping an unusable stored cookie {Name}", record.Name);
            }
        }
    }

    public void ResetCookies()
    {
        _http.Dispose();
        Build();
    }

    private void Build()
    {
        _cookies = new();

        var handler = new SocketsHttpHandler
        {
            UseCookies = true,
            CookieContainer = _cookies,
            AutomaticDecompression = DecompressionMethods.All,
            ConnectTimeout = TimeSpan.FromSeconds(15)
        };

        _http = new(handler)
        {
            BaseAddress = BaseUri,
            Timeout = TimeSpan.FromSeconds(30)
        };

        _http.DefaultRequestHeaders.UserAgent.ParseAdd(
            $"AntiBot/{AppInfoService.Version} ({AppInfoService.Platform})");
        _http.DefaultRequestHeaders.Accept.Add(new("application/json"));
    }

    private async Task<bool> VerifyAsync(string path, string code, CancellationToken token)
    {
        using var content = Json(JsonSerializer.Serialize(new(code),
            VrchatJsonContext.Default.ApiCodeRequest));
        using var response = await _http.PostAsync(path, content, token);
        if (!response.IsSuccessStatusCode)
            return false;

        var body = await response.Content.ReadAsStringAsync(token);
        return Deserialize(body, VrchatJsonContext.Default.ApiVerifyResult)?.Verified == true;
    }

    private static ByteArrayContent Json(string json)
    {
        var content = new ByteArrayContent(Encoding.UTF8.GetBytes(json));
        content.Headers.ContentType = new("application/json")
        {
            CharSet = "utf-8"
        };
        return content;
    }

    private static T? Deserialize<T>(string body, JsonTypeInfo<T> type) =>
        Try.Run(() => JsonSerializer.Deserialize(body, type)).GetOrNull();

    /// <summary>Turns an error response into something the account page can show.</summary>
    private static string Describe(HttpStatusCode status, string body)
    {
        var message = Try.Run(() =>
                JsonSerializer.Deserialize(body, VrchatJsonContext.Default.ApiErrorBody)?.Error?.Message)
            .GetOrNull();

        return status switch
        {
            HttpStatusCode.Unauthorized => Localization.Get("error.authUnauthorized"),
            HttpStatusCode.Forbidden => Localization.Get("error.authForbidden"),
            HttpStatusCode.TooManyRequests => Localization.Get("error.authRateLimited"),
            _ => message is { Length: > 0 }
                ? message
                : Localization.Get("error.vrchatStatus").Replace("{status}", ((int)status).ToString())
        };
    }
}
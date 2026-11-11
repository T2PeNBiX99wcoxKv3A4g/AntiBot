using System.Collections.Concurrent;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Loads everything the instance list shows about a player in one go: the profile (name, trust,
///     pronouns, status, platform and avatar) and the avatar's name. Lookups start immediately and in
///     parallel, and the six list fields are published together.
/// </summary>
/// <remarks>
///     There is deliberately no request queue or pacing here. A queue made new players appear one by
///     one and left the rest of the row as placeholders; if VRChat does answer 429, that is logged and
///     the next refresh retries.
/// </remarks>
internal sealed class PlayerService : Singleton<PlayerService>
{
    /// <summary>How long a cached profile is considered good enough to skip a lookup.</summary>
    private static readonly TimeSpan CacheLifetime = TimeSpan.FromMinutes(2);

    /// <summary>The public bio is worth another lookup, but not on every instance refresh.</summary>
    private static readonly TimeSpan BioLifetime = TimeSpan.FromMinutes(10);

    /// <summary>A profile with these points already deserves the extra public-profile lookup.</summary>
    private const int BioScoreThreshold = 20;

    private readonly ConcurrentDictionary<string, DateTimeOffset> _bioFetchedAt = new();
    private readonly ConcurrentDictionary<string, DateTimeOffset> _fetchedAt = new();
    private readonly ConcurrentDictionary<string, byte> _inFlight = new();
    private readonly ConcurrentDictionary<string, byte> _loaded = new();
    private readonly ConcurrentDictionary<string, PlayerProfile> _profiles = new();
    private readonly CancellationTokenSource _stop = new();

    /// <summary>Raised when a player's whole profile (and avatar name) arrived.</summary>
    public event Action? Updated;

    /// <summary>Loads the cache and registers the message handler. Called once, after the database exists.</summary>
    public void Start()
    {
        // An empty row is a failed lookup from an older build; never let it stand in for a real profile.
        foreach (var (id, profile) in Database.Instance.LoadPlayers())
            if (!IsEmpty(profile))
                _profiles[id] = profile;

        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "user.bio"
            ? context.Reply("user.bio.result",
                new UserBioPayload(await FetchBioAsync(context.Payload<UserBioRequest>()?.UserId ?? "",
                    CancellationToken.None)))
            : null;

    /// <summary>
    ///     The bio only exists on the public profile, so it is fetched when the panel opens. A stored
    ///     bio is returned at once and refreshed in the background: the cache makes the panel instant,
    ///     it does not stop it from updating.
    /// </summary>
    public async Task<string?> FetchBioAsync(string userId, CancellationToken token)
    {
        if (userId.Length == 0)
            return null;

        var profile = Get(userId);
        if (profile?.Bio is { Length: > 0 } cached)
        {
            _ = RefreshBioAsync(userId, token);
            return cached;
        }

        return await RefreshBioAsync(userId, token);
    }

    /// <summary>Reads the public profile and replaces the stored bio when VRChat has a newer one.</summary>
    private async Task<string?> RefreshBioAsync(string userId, CancellationToken token)
    {
        try
        {
            var publicProfile = await AuthService.Instance.GetPublicProfileAsync(userId, token);
            if (publicProfile?.Bio is not { Length: > 0 } bio)
                return null;

            // Re-read after the request: a full profile lookup may have landed while it was in flight.
            var current = Get(userId);
            if (current?.Bio == bio)
                return bio;

            // The bio is text worth keeping even when the rest of the profile has not arrived yet;
            // the next full lookup overwrites this minimal row.
            var updated = current is null
                ? new PlayerProfile(userId, "", null, null, null, null, null, null, bio, null, [], null, null, null)
                : current with { Bio = bio };

            _profiles[userId] = updated;
            await Database.Instance.SavePlayerAsync(updated, token);
            Updated?.Invoke();

            return bio;
        }
        catch (OperationCanceledException)
        {
            return null;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Bio refresh for {UserId} failed", userId);
            return null;
        }
    }

    public PlayerProfile? Get(string userId) => _profiles.GetValueOrDefault(userId);

    /// <summary>
    ///     Fetches a profile now, for a caller that cannot wait for a later refresh (the batch page).
    ///     The avatar name is resolved too, so the returned row matches the instance list.
    /// </summary>
    public async Task<PlayerProfile?> FetchNowAsync(string userId, CancellationToken token)
    {
        if (userId.Length == 0)
            return null;

        var profile = await FetchProfileAsync(userId, token);

        // The batch page and the debug check expect the full profile, including the bio that the
        // normal user endpoint may omit.
        if (profile is not null)
        {
            await FetchBioAsync(userId, token);
            profile = Get(userId) ?? profile;
        }

        var fileId = AvatarService.FileIdOf(profile?.AvatarUrl) ?? AvatarService.FileIdOf(profile?.AvatarImageUrl) ??
            AvatarService.FileIdOf(profile?.IconUrl);

        if (fileId is not null)
            await AvatarService.Instance.ResolveAsync(fileId, token);

        _loaded[userId] = 0;
        Updated?.Invoke();
        return profile;
    }

#if DEBUG
    /// <summary>Debug build only: fetches a profile now, so the scoring page can test any user id.</summary>
    public Task<PlayerProfile?> FetchAsync(string userId, CancellationToken token) =>
        FetchNowAsync(userId, token);
#endif

    /// <summary>Whether a lookup for this user has finished, successfully or not.</summary>
    public bool IsLoaded(string userId) => _loaded.ContainsKey(userId);

    /// <summary>
    ///     Starts loading a player unless a fresh profile is cached. <paramref name="avatarUrl" /> is the
    ///     instance roster's avatar image, which lets the avatar name lookup run beside the profile
    ///     instead of waiting for it. Safe to call for every join and every refresh.
    /// </summary>
    public void Request(string userId, string? avatarUrl = null)
    {
        if (userId.Length == 0)
            return;

        var profile = Get(userId);
        var fresh = profile is not null &&
                    DateTimeOffset.UtcNow - _fetchedAt.GetValueOrDefault(userId) < CacheLifetime;
        // A custom icon hides the thumbnail, so the full-size avatar image is the next candidate
        // before falling back to the icon itself (which carries no avatar name).
        var fileId = AvatarService.FileIdOf(avatarUrl ?? profile?.AvatarUrl ?? profile?.AvatarImageUrl ??
            profile?.IconUrl);
        var avatarKnown = fileId is null || AvatarService.Instance.NameFor(fileId) is not null;

        if (fresh && avatarKnown)
            return;

        if (_inFlight.TryAdd(userId, 0))
            _ = LoadAsync(userId, avatarUrl, fresh);
    }

    private async Task LoadAsync(string userId, string? avatarUrl, bool skipProfile)
    {
        var token = _stop.Token;

        try
        {
            PlayerProfile? profile = skipProfile ? Get(userId) : null;

            // The roster already carries the avatar image, so that lookup starts now; the profile
            // supplies the other five fields (and the avatar too when the roster has no image).
            var hintId = AvatarService.FileIdOf(avatarUrl);
            var hintTask = hintId is null ? null : AvatarService.Instance.ResolveAsync(hintId, token);

            if (!skipProfile)
            {
                profile = await FetchProfileAsync(userId, token);
                _loaded[userId] = 0;

                // All six fields the list shows come from the profile, so they are published together;
                // the avatar's name is extra and arrives separately.
                Updated?.Invoke();

                // The bio is a strong signal but needs a second endpoint. Fetch it for accounts that
                // already look suspicious, so a clean-looking profile does not cause one call per user.
                if (profile is not null && NeedsBio(profile) && BioIsStale(userId))
                {
                    _bioFetchedAt[userId] = DateTimeOffset.UtcNow;
                    await FetchBioAsync(userId, token);
                }
            }

            var fileId = hintId ?? AvatarService.FileIdOf(profile?.AvatarUrl) ??
                AvatarService.FileIdOf(profile?.AvatarImageUrl) ?? AvatarService.FileIdOf(profile?.IconUrl);

            if (fileId is not null && fileId != hintId)
                await AvatarService.Instance.ResolveAsync(fileId, token);

            if (hintTask is not null)
                await hintTask;
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Profile lookup for {UserId} failed", userId);
        }
        finally
        {
            _loaded[userId] = 0;
            _inFlight.TryRemove(userId, out _);
            Updated?.Invoke();
        }
    }

    private async Task<PlayerProfile?> FetchProfileAsync(string userId, CancellationToken token)
    {
        var (user, error) = await AuthService.Instance.GetUserAsync(userId, token);
        if (user?.Id is not { Length: > 0 } id)
        {
            if (error is not null)
                Log.Debug("Profile lookup for {UserId} failed: {Error}", userId, error);

            return null;
        }

        var profile = new PlayerProfile(id, user.DisplayName ?? id, user.CurrentAvatarThumbnailImageUrl,
            FirstNonEmpty(user.IconUrl, user.ProfilePicOverride, user.ProfilePicOverrideThumbnail),
            user.CurrentAvatarImageUrl, user.Status, user.StatusDescription, user.Pronouns, user.Bio,
            user.DateJoined, user.Tags ?? [], user.Platform, user.LastPlatform, user.LastActivity,
            user.IsFriend ?? false);

        // A reply that carries nothing worth showing must not become the cached answer.
        if (IsEmpty(profile))
            return null;

        _profiles[id] = profile;
        _fetchedAt[id] = DateTimeOffset.UtcNow;

        await Database.Instance.SavePlayerAsync(profile, token);

        return profile;
    }

    /// <summary>Whether this profile already scores enough to justify the extra public-profile call.</summary>
    private static bool NeedsBio(PlayerProfile profile) =>
        ThreatScoring.Assess(profile, profile.DisplayName, null, false, profile.Platform).Score >=
        BioScoreThreshold;

    private bool BioIsStale(string userId) =>
        !_bioFetchedAt.TryGetValue(userId, out var at) || DateTimeOffset.UtcNow - at > BioLifetime;

    /// <summary>Whether the profile has any of the fields the list and the details panel show.</summary>
    private static bool IsEmpty(PlayerProfile profile) =>
        profile.DisplayName.Length == 0 &&
        string.IsNullOrEmpty(profile.AvatarUrl) &&
        string.IsNullOrEmpty(profile.IconUrl) &&
        string.IsNullOrEmpty(profile.AvatarImageUrl) &&
        string.IsNullOrEmpty(profile.Status) &&
        string.IsNullOrEmpty(profile.StatusDescription) &&
        string.IsNullOrEmpty(profile.Pronouns) &&
        string.IsNullOrEmpty(profile.Bio) &&
        string.IsNullOrEmpty(profile.Platform) &&
        profile.Tags.Length == 0;

    private static string? FirstNonEmpty(params string?[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrEmpty(value));
}

using System.Collections.Concurrent;
using System.Threading.Channels;
using AntiBot.Models;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Keeps a profile for every player seen in an instance: the API is asked once per user, the answer is
///     cached in memory and in the database, and a single worker paces the requests.
/// </summary>
/// <remarks>
///     <c>GET users/{id}</c> is one of the most tightly rate-limited endpoints, so lookups go through one
///     queue with a fixed gap, a fresh cache is never asked again, and a 429 pauses the queue instead of
///     retrying into it.
/// </remarks>
internal sealed class PlayerService : Singleton<PlayerService>
{
    /// <summary>The gap between two lookups. VRChat publishes no limit, so this stays conservative.</summary>
    private static readonly TimeSpan RequestInterval = TimeSpan.FromMilliseconds(100);

    /// <summary>How many lookups run side by side; a full instance should be ready in seconds.</summary>
    private const int Workers = 5;

    /// <summary>How long a cached profile is considered good enough to skip a lookup.</summary>
    private static readonly TimeSpan CacheLifetime = TimeSpan.FromMinutes(2);

    /// <summary>How long the queue pauses after VRChat answered 429.</summary>
    private static readonly TimeSpan RateLimitPause = TimeSpan.FromSeconds(60);

    private readonly ConcurrentDictionary<string, DateTimeOffset> _fetchedAt = new();
    private readonly ConcurrentDictionary<string, byte> _pending = new();
    private readonly ConcurrentDictionary<string, PlayerProfile> _profiles = new();
    private readonly Channel<string> _queue = Channel.CreateUnbounded<string>();

    private readonly CancellationTokenSource _stop = new();
    private long _pausedUntil;

    /// <summary>Raised when a profile arrived, so the instance list can redraw with it.</summary>
    public event Action? Updated;

    /// <summary>Loads the cache and starts the worker. Called once, after the database exists.</summary>
    public void Start()
    {
        foreach (var (id, profile) in Database.Instance.LoadPlayers())
            _profiles[id] = profile;

        for (var i = 0; i < Workers; i++)
            _ = Task.Run(() => RunAsync(_stop.Token));
    }

    public PlayerProfile? Get(string userId) => _profiles.GetValueOrDefault(userId);

    /// <summary>Asks for a profile unless it is cached and still fresh. Safe to call for every join.</summary>
    public void Request(string userId)
    {
        if (userId.Length == 0)
            return;

        if (_profiles.ContainsKey(userId) &&
            DateTimeOffset.UtcNow - _fetchedAt.GetValueOrDefault(userId) < CacheLifetime)
            return;

        if (!_pending.TryAdd(userId, 0))
            return;

        _queue.Writer.TryWrite(userId);
    }

    private async Task RunAsync(CancellationToken token)
    {
        try
        {
            while (await _queue.Reader.WaitToReadAsync(token))
            while (_queue.Reader.TryRead(out var userId))
            {
                _pending.TryRemove(userId, out _);

                // A 429 pauses every worker, not just the one that saw it.
                var pause = Interlocked.Read(ref _pausedUntil) - Environment.TickCount64;
                if (pause > 0)
                    await Task.Delay((int)pause, token);

                try
                {
                    await FetchAsync(userId, token);
                }
                catch (OperationCanceledException)
                {
                    throw;
                }
                catch (Exception ex)
                {
                    // A disposed client or a dropped connection must not kill the worker.
                    Log.Debug(ex, "Profile lookup for {UserId} failed", userId);
                }

                await Task.Delay(RequestInterval, token);
            }
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Player lookups stopped");
        }
    }

    private async Task FetchAsync(string userId, CancellationToken token)
    {
        if (!AuthService.Instance.IsReady)
            return;

        var (user, error) = await AuthService.Instance.GetUserAsync(userId, token);
        if (user?.Id is not { Length: > 0 } id)
        {
            if (error is not null)
            {
                Log.Debug("Profile lookup for {UserId} failed: {Error}", userId, error);

                if (error.Contains("Too many", StringComparison.OrdinalIgnoreCase))
                {
                    Log.Information("Profile lookups paused after a rate limit");
                    Interlocked.Exchange(ref _pausedUntil,
                        Environment.TickCount64 + (long)RateLimitPause.TotalMilliseconds);
                }
            }

            return;
        }

        var profile = new PlayerProfile(id, user.DisplayName ?? id, user.CurrentAvatarThumbnailImageUrl,
            FirstNonEmpty(user.IconUrl, user.ProfilePicOverride, user.ProfilePicOverrideThumbnail),
            user.CurrentAvatarImageUrl, user.Status, user.StatusDescription, user.Pronouns, user.Bio,
            user.DateJoined, user.Tags ?? [], user.Platform, user.LastPlatform, user.LastActivity,
            user.IsFriend ?? false);

        _profiles[id] = profile;
        _fetchedAt[id] = DateTimeOffset.UtcNow;

        await Database.Instance.SavePlayerAsync(profile, token);

        // The profile is what the list needs first; the avatar name is looked up after it.
        AvatarService.Instance.Request(AvatarService.FileIdOf(profile.AvatarUrl));

        Updated?.Invoke();
    }

    private static string? FirstNonEmpty(params string?[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrEmpty(value));
}
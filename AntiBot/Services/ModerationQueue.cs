namespace AntiBot.Services;

/// <summary>
///     Serializes every VRChat moderation request, whether it comes from automatic protection, a friend
///     request, the batch page or an undo. VRChat accepts roughly one such request every few seconds,
///     so one queue keeps the whole app inside that pace instead of several callers racing.
/// </summary>
internal sealed class ModerationQueue : Singleton<ModerationQueue>
{
    /// <summary>VRChat accepts about one moderation request every few seconds.</summary>
    private const long GapMilliseconds = 3000;

    private readonly SemaphoreSlim _gate = new(1, 1);
    private long _last;

    public Task<bool> ModerateAsync(string userId, string type, CancellationToken token) =>
        EnqueueAsync(() => AuthService.Instance.ModerateUserAsync(userId, type, token), token);

    public Task<bool> UnmoderateAsync(string userId, string type, CancellationToken token) =>
        EnqueueAsync(() => AuthService.Instance.UnmoderateUserAsync(userId, type, token), token);

    public Task<bool> HideFriendRequestAsync(string notificationId, CancellationToken token) =>
        EnqueueAsync(() => AuthService.Instance.HideFriendRequestAsync(notificationId, token), token);

    /// <summary>Paces the call and retries a refused one, so a 429 is not silently dropped.</summary>
    private async Task<bool> EnqueueAsync(Func<Task<bool>> call, CancellationToken token)
    {
        await _gate.WaitAsync(token);

        try
        {
            for (var attempt = 0; attempt < 3; attempt++)
            {
                await PaceAsync(token);

                if (await call())
                    return true;

                await Task.Delay(TimeSpan.FromSeconds(2), token);
            }

            return false;
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Waits until the server would accept another call, and marks the moment it was made.</summary>
    private async Task PaceAsync(CancellationToken token)
    {
        var wait = Interlocked.Read(ref _last) + GapMilliseconds - Environment.TickCount64;
        if (wait > 0)
            await Task.Delay((int)wait, token);

        Interlocked.Exchange(ref _last, Environment.TickCount64);
    }
}
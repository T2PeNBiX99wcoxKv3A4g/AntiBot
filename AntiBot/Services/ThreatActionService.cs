using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Runs the automatic protection for a high-threat user: block the user, turn their avatar
///     interactions off and hide their chat box. Disabled actions are skipped, friends are treated like
///     whitelisted users, and the whole sequence is serialized because VRChat rate-limits these calls.
/// </summary>
internal sealed class ThreatActionService : Singleton<ThreatActionService>
{
    /// <summary>VRChat accepts about one moderation request every few seconds.</summary>
    private const long ModerationGapMilliseconds = 3000;

    private readonly HashSet<string> _acted = new(StringComparer.OrdinalIgnoreCase);
    private readonly SemaphoreSlim _actions = new(1, 1);
    private readonly Lock _gate = new();
    private readonly HashSet<string> _rejecting = new(StringComparer.OrdinalIgnoreCase);
    private readonly CancellationTokenSource _stop = new();
    private string _instance = "";
    private long _lastModerationAt;

    public ThreatActionService() => InstanceService.Instance.Published += OnSnapshot;

    private void OnSnapshot(InstanceSnapshot snapshot)
    {
        var settings = SettingsService.Instance.Current;

        lock (_gate)
            if (snapshot.Instance != _instance)
            {
                _instance = snapshot.Instance;
                _acted.Clear();
            }

        foreach (var user in snapshot.Users)
        {
            // Friends are treated like whitelisted users: never act on someone already on the list.
            if (user.Local || user.IsFriend || user.Threat < settings.ThreatThreshold)
                continue;

            if (settings.Whitelist.Contains(user.UserId, StringComparer.OrdinalIgnoreCase))
                continue;

            lock (_gate)
                if (!_acted.Add(user.UserId))
                    continue;

            _ = ActAsync(user, settings);
        }
    }

    private async Task ActAsync(InstanceUser user, AppSettings settings)
    {
        var detail = Describe(user);
        var avatar = user.IconUrl ?? user.AvatarUrl;

        // Closing the client is the only action that can beat an avatar download, and it needs no API
        // call, so it runs first and outside the rate-limited queue. Safe Mode comes next: it replaces
        // every non-friend avatar at once, which blocking does not do because the client only re-reads
        // its moderation list later.
        var closed = settings.AutoCloseVrchat &&
                     !(settings.SkipCloseInVr && VrchatClient.IsVrActive()) &&
                     VrchatClient.Close();

        if (closed)
            await OperationService.Instance.LogAsync("closeVrchat", user.UserId, user.Name, detail);
        else if (settings.AutoSafeMode && VrchatOscService.Instance.EnableSafeMode())
            await OperationService.Instance.LogAsync("safeMode", user.UserId, user.Name, detail);

        try
        {
            await _actions.WaitAsync(_stop.Token);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        try
        {
            // Block first: it is the action that actually removes the bot's avatar and interactions.
            if (settings.AutoBlock && await ModerateAsync(user.UserId, "block"))
                await OperationService.Instance.LogAsync("block", user.UserId, user.Name, detail, avatar);

            if (settings.AutoDisableAvatarInteraction && await ModerateAsync(user.UserId, "interactOff"))
                await OperationService.Instance.LogAsync("avatarInteractionOff", user.UserId, user.Name, detail, avatar);

            if (settings.AutoHideChatBox && await ModerateAsync(user.UserId, "muteChat"))
                await OperationService.Instance.LogAsync("chatBoxHidden", user.UserId, user.Name, detail, avatar);
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        finally
        {
            _actions.Release();
        }
    }

    /// <summary>Rejects a friend request from a high-threat user, once.</summary>
    public async Task RejectIfNeededAsync(FriendRequest request)
    {
        var settings = SettingsService.Instance.Current;

        if (!settings.AutoRejectFriendRequests || !request.Active || request.Rejected)
            return;
        if (request.User.IsFriend)
            return;
        if (request.User.Threat < settings.ThreatThreshold)
            return;
        if (settings.Whitelist.Contains(request.UserId, StringComparer.OrdinalIgnoreCase))
            return;

        lock (_gate)
            if (!_rejecting.Add(request.Id))
                return;

        try
        {
            await AuthService.Instance.HideFriendRequestAsync(request.Id, _stop.Token);

            try
            {
                await _actions.WaitAsync(_stop.Token);
            }
            catch (OperationCanceledException)
            {
                return;
            }

            try
            {
                await ApplyModerationAsync(request.User, settings);
            }
            finally
            {
                _actions.Release();
            }

            await Database.Instance.SetFriendRequestRejectedAsync(request.Id, true, _stop.Token);
            await OperationService.Instance.LogAsync("rejectRequest", request.UserId, request.User.Name,
                Describe(request.User), request.User.IconUrl ?? request.User.AvatarUrl);
        }
        finally
        {
            lock (_gate)
                _rejecting.Remove(request.Id);
        }
    }

    /// <summary>Undoes an automatic rejection, e.g. after a false positive.</summary>
    public async Task UndoAsync(FriendRequest request)
    {
        await AuthService.Instance.UnmoderateUserAsync(request.UserId, "block", _stop.Token);
        await AuthService.Instance.UnmoderateUserAsync(request.UserId, "interactOff", _stop.Token);
        await AuthService.Instance.UnmoderateUserAsync(request.UserId, "muteChat", _stop.Token);

        await Database.Instance.SetFriendRequestRejectedAsync(request.Id, false, _stop.Token);
        await OperationService.Instance.LogAsync("undoReject", request.UserId, request.User.Name,
            Describe(request.User), request.User.IconUrl ?? request.User.AvatarUrl);
    }

    private async Task ApplyModerationAsync(InstanceUser user, AppSettings settings)
    {
        if (settings.AutoBlock)
            await ModerateAsync(user.UserId, "block");

        if (settings.AutoDisableAvatarInteraction)
            await ModerateAsync(user.UserId, "interactOff");

        if (settings.AutoHideChatBox)
            await ModerateAsync(user.UserId, "muteChat");
    }

    /// <summary>
    ///     VRChat allows roughly one moderation request at a time, so calls are paced and a 429 is
    ///     retried instead of silently dropping the action.
    /// </summary>
    private async Task<bool> ModerateAsync(string userId, string type)
    {
        for (var attempt = 0; attempt < 3; attempt++)
        {
            var wait = Interlocked.Read(ref _lastModerationAt) + ModerationGapMilliseconds -
                       Environment.TickCount64;
            if (wait > 0)
                await Task.Delay((int)wait, _stop.Token);

            Interlocked.Exchange(ref _lastModerationAt, Environment.TickCount64);

            if (await AuthService.Instance.ModerateUserAsync(userId, type, _stop.Token))
                return true;

            await Task.Delay(TimeSpan.FromSeconds(2), _stop.Token);
        }

        return false;
    }

    private static string Describe(InstanceUser user) =>
        $"{user.Threat}%" +
        (user.ThreatReasons is { Length: > 0 } reasons
            ? " · " + string.Join(", ", reasons.Select(reason => reason.Text))
            : "");
}

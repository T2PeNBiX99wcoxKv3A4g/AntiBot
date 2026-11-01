using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Runs the automatic protection for a high-threat user. The local actions (closing the client,
///     Safe Mode, avatar switch) go first because they need no server; the moderation calls queue
///     behind each other because VRChat rate-limits them. Disabled actions are skipped and friends are
///     treated like whitelisted users.
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

        // Closing the client is the only action that can beat an avatar download, and it waits for
        // VRChat to quit, so it runs on its own task instead of holding up everyone else.
        var close = settings.AutoCloseVrchat && !(settings.SkipCloseInVr && VrchatClient.IsVrActive())
            ? Task.Run(VrchatClient.Close)
            : null;

        if (close is not null && await close)
        {
            await OperationService.Instance.LogAsync("closeVrchat", user.UserId, user.Name, detail);
        }
        else if (VrchatClient.IsRunning())
        {
            // OSC is local and instant, so it goes out now, before the rate-limited API queue.
            await ApplyOscAsync(user, settings, detail);
        }

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
                // Hiding the notification is an API call too, so it waits in the same queue.
                await PaceAsync();
                await AuthService.Instance.HideFriendRequestAsync(request.Id, _stop.Token);
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

    /// <summary>Sends the local actions, which need no server and never wait behind the API calls.</summary>
    private static async Task ApplyOscAsync(InstanceUser user, AppSettings settings, string detail)
    {
        if (settings.AutoSafeMode && VrchatOscService.Instance.EnableSafeMode())
            await OperationService.Instance.LogAsync("safeMode", user.UserId, user.Name, detail);

        // A different avatar is only useful if it is not the one already worn, which VRChat reports.
        if (settings.AutoSafeAvatar && VrchatOscService.Instance.ChangeAvatar(settings.SafeAvatarId))
            await OperationService.Instance.LogAsync("switchedAvatar", user.UserId, user.Name, detail);
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
            await PaceAsync();

            if (await AuthService.Instance.ModerateUserAsync(userId, type, _stop.Token))
                return true;

            await Task.Delay(TimeSpan.FromSeconds(2), _stop.Token);
        }

        return false;
    }

    /// <summary>Waits until the server would accept another call, and marks the moment it was made.</summary>
    private async Task PaceAsync()
    {
        var wait = Interlocked.Read(ref _lastModerationAt) + ModerationGapMilliseconds -
                   Environment.TickCount64;
        if (wait > 0)
            await Task.Delay((int)wait, _stop.Token);

        Interlocked.Exchange(ref _lastModerationAt, Environment.TickCount64);
    }

    private static string Describe(InstanceUser user) =>
        $"{user.Threat}" +
        (user.ThreatReasons is { Length: > 0 } reasons
            ? " · " + string.Join(", ", reasons.Select(reason => reason.Text))
            : "");
}

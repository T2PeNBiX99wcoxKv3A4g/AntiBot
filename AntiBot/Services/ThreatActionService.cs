using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Notifications;

namespace AntiBot.Services;

/// <summary>
///     Runs the automatic protection for a high-threat user. The local actions (closing the client,
///     Safe Mode, avatar switch) go first because they need no server; the moderation calls queue
///     behind each other because VRChat rate-limits them. Disabled actions are skipped and friends are
///     treated like whitelisted users.
/// </summary>
[Singleton]
internal partial class ThreatActionService
{
    private readonly HashSet<string> _acted = new(StringComparer.OrdinalIgnoreCase);
    private readonly Lock _gate = new();
    private readonly HashSet<string> _rejecting = new(StringComparer.OrdinalIgnoreCase);
    private readonly CancellationTokenSource _stop = new();
    private string _instance = "";

    private ThreatActionService() => InstanceService.Instance.Published += OnSnapshot;

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

            WarnSignedOut(user, settings);
            _ = ActAsync(user, settings);
        }
    }

    /// <summary>
    ///     A high-threat user was caught while the app is signed out, so the API actions cannot run.
    ///     This is the moment the user needs to know, not just when the session died.
    /// </summary>
    private static void WarnSignedOut(InstanceUser user, AppSettings settings)
    {
        if (AuthService.Instance.IsReady)
            return;

        if (!settings.AutoBlock && !settings.AutoDisableAvatarInteraction && !settings.AutoHideChatBox)
            return;

        NotificationService.Notify("auth.signedOut",
            Localization.Get("auth.expired.detectedTitle"),
            Localization.Get("auth.expired.detectedMessage").Replace("{name}", user.Name));
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
            await OperationService.Instance.LogAsync("closeVrchat", user.UserId, user.Name, detail);
        else if (VrchatClient.IsRunning())
            // OSC is local and instant, so it goes out now, before the rate-limited API queue.
            await ApplyOscAsync(user, settings, detail);

        try
        {
            // Block first: it is the action that actually removes the bot's avatar and interactions.
            if (settings.AutoBlock &&
                await ModerationQueue.Instance.ModerateAsync(user.UserId, "block", _stop.Token))
                await OperationService.Instance.LogAsync("block", user.UserId, user.Name, detail, avatar);

            if (settings.AutoDisableAvatarInteraction &&
                await ModerationQueue.Instance.ModerateAsync(user.UserId, "interactOff", _stop.Token))
                await OperationService.Instance.LogAsync("avatarInteractionOff", user.UserId, user.Name, detail, avatar);

            if (settings.AutoHideChatBox &&
                await ModerationQueue.Instance.ModerateAsync(user.UserId, "muteChat", _stop.Token))
                await OperationService.Instance.LogAsync("chatBoxHidden", user.UserId, user.Name, detail, avatar);
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
    }

    /// <summary>Rejects a friend request from a high-threat user, once.</summary>
    /// <remarks>
    ///     Only the API actions apply here: a request arrives before the user is in an instance, so
    ///     there is no avatar to replace and nothing to close.
    /// </remarks>
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
                // Hiding the notification is an API call too, so it waits in the same queue.
                await ModerationQueue.Instance.HideFriendRequestAsync(request.Id, _stop.Token);
                await ApplyModerationAsync(request.User, settings);
            }
            catch (OperationCanceledException)
            {
                return;
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
        await ModerationQueue.Instance.UnmoderateAsync(request.UserId, "block", _stop.Token);
        await ModerationQueue.Instance.UnmoderateAsync(request.UserId, "interactOff", _stop.Token);
        await ModerationQueue.Instance.UnmoderateAsync(request.UserId, "muteChat", _stop.Token);

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
            await ModerationQueue.Instance.ModerateAsync(user.UserId, "block", _stop.Token);

        if (settings.AutoDisableAvatarInteraction)
            await ModerationQueue.Instance.ModerateAsync(user.UserId, "interactOff", _stop.Token);

        if (settings.AutoHideChatBox)
            await ModerationQueue.Instance.ModerateAsync(user.UserId, "muteChat", _stop.Token);
    }

    private static string Describe(InstanceUser user) =>
        $"{user.Threat}" +
        (user.ThreatReasons is { Length: > 0 } reasons
            ? " · " + string.Join(", ", reasons.Select(reason => reason.Text))
            : "");
}
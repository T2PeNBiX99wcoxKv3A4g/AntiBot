using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Runs the automatic protection: a user whose threat reaches the threshold is blocked, has avatar
///     interactions turned off and their chat box hidden; the account can also be sent home.
/// </summary>
internal sealed class ThreatActionService : Singleton<ThreatActionService>
{
    private readonly HashSet<string> _acted = new(StringComparer.OrdinalIgnoreCase);
    private readonly Lock _gate = new();
    private readonly HashSet<string> _rejecting = new(StringComparer.OrdinalIgnoreCase);
    private readonly CancellationTokenSource _stop = new();
    private string _instance = "";
    private bool _returnedHome;

    public ThreatActionService() => InstanceService.Instance.Published += OnSnapshot;

    private void OnSnapshot(InstanceSnapshot snapshot)
    {
        var settings = SettingsService.Instance.Current;

        lock (_gate)
            if (snapshot.Instance != _instance)
            {
                _instance = snapshot.Instance;
                _acted.Clear();
                _returnedHome = false;
            }

        foreach (var user in snapshot.Users)
        {
            if (user.Local || user.Threat < settings.ThreatThreshold)
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

        // The lighter moderations first: blocking the user may make the rest pointless.
        if (settings.AutoDisableAvatarInteraction &&
            await AuthService.Instance.ModerateUserAsync(user.UserId, "interactOff", _stop.Token))
            await OperationService.Instance.LogAsync("avatarInteractionOff", user.UserId, user.Name, detail, avatar);

        if (settings.AutoHideChatBox &&
            await AuthService.Instance.ModerateUserAsync(user.UserId, "muteChat", _stop.Token))
            await OperationService.Instance.LogAsync("chatBoxHidden", user.UserId, user.Name, detail, avatar);

        if (settings.AutoBlock && await AuthService.Instance.ModerateUserAsync(user.UserId, "block", _stop.Token))
            await OperationService.Instance.LogAsync("block", user.UserId, user.Name, detail, avatar);

        if (!settings.AutoReturnHome)
            return;

        lock (_gate)
        {
            if (_returnedHome)
                return;

            _returnedHome = true;
        }

        if (await AuthService.Instance.ReturnHomeAsync(_stop.Token))
            await OperationService.Instance.LogAsync("returnHome", user.UserId, user.Name, detail);
    }

    /// <summary>Rejects a friend request from a high-threat user, once.</summary>
    public async Task RejectIfNeededAsync(FriendRequest request)
    {
        var settings = SettingsService.Instance.Current;

        if (!settings.AutoRejectFriendRequests || !request.Active || request.Rejected)
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
            await ApplyModerationAsync(request.User, settings);

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
        if (settings.AutoDisableAvatarInteraction)
            await AuthService.Instance.ModerateUserAsync(user.UserId, "interactOff", _stop.Token);

        if (settings.AutoHideChatBox)
            await AuthService.Instance.ModerateUserAsync(user.UserId, "muteChat", _stop.Token);

        if (settings.AutoBlock)
            await AuthService.Instance.ModerateUserAsync(user.UserId, "block", _stop.Token);
    }

    private static string Describe(InstanceUser user) =>
        $"{user.Threat}%" +
        (user.ThreatReasons is { Length: > 0 } reasons ? " · " + string.Join(", ", reasons) : "");
}

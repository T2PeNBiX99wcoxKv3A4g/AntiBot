using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Incoming VRChat friend requests, kept as history. Bots send them to get onto the friend list,
///     which exposes the avatar and user id; AntiBot only records them and never accepts or declines.
/// </summary>
internal sealed class FriendRequestService : Singleton<FriendRequestService>
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromSeconds(30);

    private readonly Lock _gate = new();
    private readonly CancellationTokenSource _stop = new();
    private string _pushed = "";
    private FriendRequestRow[] _rows;

    public FriendRequestService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;
        AuthService.Instance.Changed += OnAuthChanged;
        PlayerService.Instance.Updated += Publish;
        PresenceService.Instance.Updated += Publish;
        AvatarService.Instance.Updated += Publish;

        // The history is on disk, so the page has something to show before the API answers.
        _rows = [.. Database.Instance.LoadFriendRequests()];

        _ = RunAsync(_stop.Token);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "friendRequests.snapshot"
            ? Task.FromResult<NativeResponse?>(context.Reply("friendRequests.snapshot.result", Build()))
            : Task.FromResult<NativeResponse?>(null);

    private void OnAuthChanged()
    {
        if (AuthService.Instance.IsLoggedIn)
            _ = RefreshAsync(_stop.Token);
        else
            Publish();
    }

    private async Task RunAsync(CancellationToken token)
    {
        using var timer = new PeriodicTimer(PollInterval);

        try
        {
            while (await timer.WaitForNextTickAsync(token))
                await RefreshAsync(token);
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Friend request polling stopped");
        }
    }

    private async Task RefreshAsync(CancellationToken token)
    {
        if (!AuthService.Instance.IsLoggedIn)
            return;

        var notifications = await AuthService.Instance.GetFriendRequestsAsync(token);

        // A failed poll is not an empty history, so keep what is already recorded.
        if (notifications is null)
            return;

        var rows = notifications
            .Where(notification => notification.Type == "friendRequest" &&
                                   notification.SenderUserId is { Length: > 0 })
            .Select(notification => new FriendRequestRow(notification.Id ?? "", notification.SenderUserId!,
                notification.SenderUsername ?? "", notification.CreatedAt ?? "", notification.Seen ?? false,
                true, 0, 0))
            .ToArray();

        await Database.Instance.SaveFriendRequestsAsync(rows, token);

        foreach (var row in rows)
            PlayerService.Instance.Request(row.UserId);

        var history = Database.Instance.LoadFriendRequests();

        lock (_gate)
            _rows = [.. history];

        Publish();
    }

    private FriendRequest[] Build()
    {
        FriendRequestRow[] rows;

        lock (_gate)
            rows = _rows;

        return
        [
            .. rows.Select(row => new FriendRequest(row.Id, row.UserId, row.CreatedAt, row.Active,
                row.FirstSeen, InstanceService.Instance.Describe(row.UserId, row.DisplayName)))
        ];
    }

    private void Publish()
    {
        var requests = Build();

        var signature = string.Join('|', requests.Select(request =>
            $"{request.Id}:{request.Active}:{request.User.Name}:{request.User.Status}:" +
            $"{request.User.StatusDescription}:{request.User.Pronouns}:{request.User.AvatarUrl}:" +
            $"{request.User.AvatarName}:{request.User.Bio}"));

        lock (_gate)
        {
            if (signature == _pushed)
                return;

            _pushed = signature;
        }

        WindowManager.Instance.NotifyMainWindow("friendRequests.changed", requests);
    }
}

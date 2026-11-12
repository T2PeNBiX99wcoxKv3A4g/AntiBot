using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Incoming VRChat friend requests, kept as history. Bots send them to get onto the friend list,
///     which exposes the avatar and user id; AntiBot only records them and never accepts or declines.
/// </summary>
[Singleton]
internal sealed partial class FriendRequestService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan NotificationDebounce = TimeSpan.FromSeconds(3);

    private readonly Lock _gate = new();
    private readonly CancellationTokenSource _stop = new();
    private long _lastRefreshAt;
    private string _pushed = "";
    private FriendRequestRow[] _rows;

    public FriendRequestService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;
        AuthService.Instance.Changed += OnAuthChanged;
        AuthService.Instance.Notification += OnNotification;
        PlayerService.Instance.Updated += Publish;
        PresenceService.Instance.Updated += Publish;

        // The history is on disk, so the page has something to show before the API answers.
        _rows = [.. Database.Instance.LoadFriendRequests()];

        _ = RunAsync(_stop.Token);
    }

    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "friendRequests.snapshot":
                return context.Reply("friendRequests.snapshot.result", Build());

            case "friendRequests.clear":
                await Database.Instance.ClearFriendRequestsAsync();

                lock (_gate)
                    _rows = [];

                Publish();
                return context.Reply("friendRequests.clear.result", new OkPayload());

            case "friendRequests.undo":
                var requestId = context.Payload<FriendRequestActionRequest>()?.Id;
                var request = requestId is { Length: > 0 }
                    ? Build().FirstOrDefault(item => item.Id == requestId)
                    : null;

                if (request is not null)
                {
                    await ThreatActionService.Instance.UndoAsync(request);
                    await RefreshAsync(_stop.Token);
                }

                return context.Reply("friendRequests.undo.result", new OkPayload());

            default:
                return null;
        }
    }

    private void OnAuthChanged()
    {
        if (AuthService.Instance.IsLoggedIn)
            _ = RefreshAsync(_stop.Token);
        else
            Publish();
    }

    /// <summary>A notification just arrived; refresh unless the pipeline is sending a burst.</summary>
    private void OnNotification()
    {
        if (Environment.TickCount64 - Interlocked.Read(ref _lastRefreshAt) < NotificationDebounce.TotalMilliseconds)
            return;

        _ = RefreshAsync(_stop.Token);
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

        Interlocked.Exchange(ref _lastRefreshAt, Environment.TickCount64);

        var notifications = await AuthService.Instance.GetFriendRequestsAsync(token);

        // A failed poll is not an empty history, so keep what is already recorded.
        if (notifications is null)
            return;

        var rows = notifications
            .Where(notification => notification.Type == "friendRequest" &&
                                   notification.SenderUserId is { Length: > 0 })
            .Select(notification => new FriendRequestRow(notification.Id ?? "", notification.SenderUserId!,
                notification.SenderUsername ?? "", notification.CreatedAt ?? "", notification.Seen ?? false,
                !notification.Hidden, false, 0, 0))
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
            .. rows.Select(row => new FriendRequest(row.Id, row.UserId, row.CreatedAt, row.Active, row.Rejected,
                row.FirstSeen, InstanceService.Instance.Describe(row.UserId, row.DisplayName)))
        ];
    }

    private void Publish()
    {
        var requests = Build();

        var signature = string.Join('|', requests.Select(request =>
            $"{request.Id}:{request.Active}:{request.Rejected}:{request.User.Name}:{request.User.Status}:" +
            $"{request.User.StatusDescription}:{request.User.Pronouns}:{request.User.AvatarUrl}:" +
            $"{request.User.AvatarName}:{request.User.Bio}:{request.User.Threat}"));

        lock (_gate)
        {
            if (signature == _pushed)
                return;

            _pushed = signature;
        }

        WindowManager.Instance.NotifyMainWindow("friendRequests.changed", requests);

        // A request from a high-threat user is hidden and moderated, once.
        foreach (var request in requests)
            _ = ThreatActionService.Instance.RejectIfNeededAsync(request);
    }
}
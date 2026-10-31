using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Records every automatic action, lets it be undone, and hands the history to the interface.</summary>
internal sealed class OperationService : Singleton<OperationService>
{
    private readonly Lock _gate = new();
    private string _pushed = "";

    public OperationService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;

        // An old row has no avatar; fill it in as the profiles arrive.
        PlayerService.Instance.Updated += Publish;
        AvatarService.Instance.Updated += Publish;
    }

    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "operations.snapshot":
                return context.Reply("operations.snapshot.result", Snapshot());

            case "operations.clear":
                await Database.Instance.ClearOperationsAsync();
                Publish();
                return context.Reply("operations.clear.result", new OkPayload());

            case "operations.undo":
                await UndoAsync(context.Payload<OperationActionRequest>()?.Id ?? 0);
                return context.Reply("operations.undo.result", new OkPayload());

            case "user.describe":
                var request = context.Payload<UserDescribeRequest>();
                return context.Reply("user.describe.result",
                    InstanceService.Instance.Describe(request?.UserId ?? "", request?.DisplayName ?? ""));

            default:
                return null;
        }
    }

    public async Task LogAsync(string kind, string userId, string displayName, string detail,
        string? avatarUrl = null)
    {
        await Database.Instance.AddOperationAsync(kind, userId, displayName, detail, avatarUrl);
        Log.Information("Operation {Kind} for {Name} ({Detail})", kind, displayName, detail);
        NotificationService.Instance.Notify(userId, "AntiBot", $"{KindLabel(kind)} · {displayName}");
        Publish();
    }

    /// <summary>Takes an action back: a block becomes an unblock, and so on.</summary>
    private async Task UndoAsync(long id)
    {
        var entry = Database.Instance.LoadOperation(id);
        if (entry is null || entry.Undone)
            return;

        var (type, kind) = entry.Kind switch
        {
            "block" => ("unblock", "unblock"),
            "avatarInteractionOff" => ("interactOn", "avatarInteractionOn"),
            "chatBoxHidden" => ("unmuteChat", "chatBoxShown"),
            _ => ((string?)null, (string?)null)
        };

        if (type is null)
            return;

        if (!await AuthService.Instance.UnmoderateUserAsync(entry.UserId, type, CancellationToken.None))
            return;

        await Database.Instance.SetOperationUndoneAsync(id);
        await LogAsync(kind!, entry.UserId, entry.DisplayName, $"undid {KindLabel(entry.Kind)}",
            entry.AvatarUrl);
    }

    /// <summary>Entries with an avatar from the profile cache, so rows recorded earlier get one too.</summary>
    private OperationEntry[] Snapshot()
    {
        var entries = Database.Instance.LoadOperations();

        return
        [
            .. entries.Select(entry => entry.AvatarUrl is { Length: > 0 }
                ? entry
                : entry with { AvatarUrl = AvatarOf(entry.UserId) })
        ];
    }

    private static string? AvatarOf(string userId)
    {
        if (userId.Length == 0)
            return null;

        PlayerService.Instance.Request(userId);
        var user = InstanceService.Instance.Describe(userId, "");
        return user.IconUrl ?? user.AvatarUrl;
    }

    private void Publish()
    {
        var entries = Snapshot();
        var signature = string.Join('|', entries.Select(entry => $"{entry.Id}:{entry.AvatarUrl}:{entry.Undone}"));

        lock (_gate)
        {
            if (signature == _pushed)
                return;

            _pushed = signature;
        }

        WindowManager.Instance.NotifyMainWindow("operations.changed", entries);
    }

    private static string KindLabel(string kind) => kind switch
    {
        "block" => "Blocked",
        "avatarInteractionOff" => "Avatar interactions off",
        "chatBoxHidden" => "Chat box hidden",
        "returnHome" => "Returned home",
        "rejectRequest" => "Friend request rejected",
        "undoReject" => "Rejection undone",
        "unblock" => "Unblocked",
        "avatarInteractionOn" => "Avatar interactions on",
        "chatBoxShown" => "Chat box shown",
        _ => kind
    };
}

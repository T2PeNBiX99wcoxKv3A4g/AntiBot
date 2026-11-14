using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Notifications;
using System.Globalization;

namespace AntiBot.Services;

/// <summary>Records every automatic action, lets it be undone, and hands the history to the interface.</summary>
[Singleton]
internal partial class OperationService
{
    private readonly Lock _gate = new();
    private string _pushed = "";

    private OperationService() => NativeBridge.MessageReceived += HandleMessageAsync;

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
                var result = await UndoAsync(context.Payload<OperationActionRequest>()?.Id ?? 0);
                return context.Reply("operations.undo.result", new OperationUndoPayload(result.Ok, result.Message));

            case "user.describe":
                var request = context.Payload<UserDescribeRequest>();
                return context.Reply("user.describe.result",
                    InstanceService.Instance.Describe(request?.UserId ?? "", request?.DisplayName ?? ""));

            default:
                return null;
        }
    }

    public async Task LogAsync(string kind, string userId, string displayName, string detail,
        string? avatarUrl = null, bool notify = true)
    {
        await Database.Instance.AddOperationAsync(kind, userId, displayName, detail, avatarUrl);
        Log.Information("Operation {Kind} for {Name} ({Detail})", kind, displayName, detail);

        // Taking an action back is a user-initiated correction, not a new automatic action worth a toast.
        if (notify && !IsUndo(kind))
            _ = NotifyAsync(kind, userId, displayName, avatarUrl);

        Publish();
    }

    /// <summary>
    ///     Shows the action as a notification: the translated label, the picture of the player it was
    ///     about, and a button that opens the operation history. The download runs apart from the
    ///     action, so it never holds up the next moderation call.
    /// </summary>
    private static async Task NotifyAsync(string kind, string userId, string displayName, string? avatarUrl)
    {
        var image = await PlayerImages.GetAsync(avatarUrl ?? AvatarOf(userId));

        NotificationService.Notify(userId, Localization.Get(KindKey(kind)), displayName,
            new NotificationOptions
            {
                Action = "operations",
                ImagePath = image,
                ButtonText = Localization.Get("open_operations")
            });
    }

    private static bool IsUndo(string kind) =>
        kind is "unblock" or "avatarInteractionOn" or "chatBoxShown" or "undoReject";

    /// <summary>Takes an action back: a block becomes an unblock, and so on.</summary>
    private async Task<(bool Ok, string Message)> UndoAsync(long id)
    {
        var entry = Database.Instance.LoadOperation(id);
        if (entry is null || entry.Undone)
            return (false, Localization.Get("operation.cannot_undo"));

        // The unmoderate endpoint removes the moderation of the given type, so it is the original
        // type that is sent back, not its opposite.
        var (type, kind) = entry.Kind switch
        {
            "block" => ("block", "unblock"),
            "avatarInteractionOff" => ("interactOff", "avatarInteractionOn"),
            "chatBoxHidden" => ("muteChat", "chatBoxShown"),
            _ => (null, null)
        };

        if (type is null)
            return (false, Localization.Get("operation.cannot_undo"));

        if (!await ModerationQueue.Instance.UnmoderateAsync(entry.UserId, type, CancellationToken.None))
            return (false, Localization.Get("operation.undo_refused"));

        await Database.Instance.SetOperationUndoneAsync(id);
        await LogAsync(kind!, entry.UserId, entry.DisplayName, entry.Detail, entry.AvatarUrl);

        return (true, $"{Localization.Get(KindKey(kind!))} · {entry.DisplayName}");
    }

    /// <summary>Entries with an avatar from the profile cache, so rows recorded earlier get one too.</summary>
    private OperationEntry[] Snapshot()
    {
        var entries = Database.Instance.LoadOperations();

        return
        [
            .. entries.Select(entry => entry with { Detail = LocalizeDetail(entry.Detail) })
                .Select(entry => entry.AvatarUrl is { Length: > 0 }
                    ? entry
                    : entry with
                    {
                        AvatarUrl = AvatarOf(entry.UserId)
                    })
        ];
    }

    /// <summary>
    ///     Turns a stored detail into the current language. The entry holds reason keys, with the
    ///     value in parentheses when it fills a placeholder; anything that is not one is left alone.
    /// </summary>
    private static string LocalizeDetail(string detail)
    {
        var separator = detail.IndexOf(" · ", StringComparison.Ordinal);
        if (separator < 0 || !int.TryParse(detail.AsSpan(0, separator), out _))
            return detail;

        var reasons = detail[(separator + 3)..]
            .Split(", ", StringSplitOptions.RemoveEmptyEntries)
            .Select(LocalizeReason)
            .Where(reason => reason.Length > 0)
            .ToArray();

        return reasons.Length == 0
            ? detail[..separator]
            : $"{detail[..separator]} · {string.Join(", ", reasons)}";
    }

    private static string LocalizeReason(string reason)
    {
        var open = reason.IndexOf('(');
        var hasDetail = open > 0 && reason.EndsWith(')');
        var key = hasDetail ? reason[..open] : reason;
        var detail = hasDetail ? reason[(open + 1)..^1] : null;

        if (!IsLocalizationKey(key))
            return reason;

        var text = Localization.Get(key);
        if (detail is null)
            return text;

        var years = int.TryParse(detail, out var days) ? days / 365 : 0;
        return text
            .Replace("{days}", detail)
            .Replace("{years}", years.ToString(CultureInfo.InvariantCulture));
    }

    private static bool IsLocalizationKey(string value) =>
        value.Length > 0 && char.IsAsciiLetterLower(value[0]) &&
        value.All(c => char.IsAsciiLetterLower(c) || char.IsAsciiDigit(c) || c is '_' or '.');

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

    /// <summary>The translation key for an operation kind; the history page uses the same labels.</summary>
    private static string KindKey(string kind) => kind switch
    {
        "block" => "blocked",
        "avatarInteractionOff" => "avatar_interactions_off",
        "chatBoxHidden" => "chat_box_hidden",
        "closeVrchat" => "closed_vr_chat",
        "safeMode" => "safe_mode_on",
        "switchedAvatar" => "switched_avatar",
        "returnHome" => "returned_home",
        "rejectRequest" => "request_rejected",
        "undoReject" => "rejection_undone",
        "unblock" => "unblocked",
        "avatarInteractionOn" => "avatar_interactions_on",
        "chatBoxShown" => "chat_box_shown",
        _ => kind
    };
}
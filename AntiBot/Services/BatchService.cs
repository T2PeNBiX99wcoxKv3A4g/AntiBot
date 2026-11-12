using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Applies the configured moderation actions to a pasted list of VRChat users. The user lookup is
///     paced a little so a large list does not trip the profile endpoint, and every moderation call
///     goes through <see cref="ModerationQueue" />, which keeps VRChat's rate limit.
/// </summary>
[Singleton]
internal sealed partial class BatchService
{
    /// <summary>A small gap between profile lookups; the instance page has no queue, this page does.</summary>
    private static readonly TimeSpan ProfileGap = TimeSpan.FromMilliseconds(250);

    private readonly Lock _gate = new();
    private readonly List<BatchOutcomePayload> _outcomes = [];
    private string[] _actions = [];
    private CancellationTokenSource? _cancellation;
    private bool _cancelled;
    private int _done;
    private string? _error;
    private int _failed;
    private bool _running;
    private int _total;

    public BatchService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "batch.parse" => ParseAsync(context),
        "batch.run" => RunAsync(context),
        "batch.stop" => Stop(context),
        "batch.state" => Task.FromResult<NativeResponse?>(context.Reply("batch.state.result", State())),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>Pulls the ids out of the pasted links and loads every profile the instance list shows.</summary>
    private async Task<NativeResponse?> ParseAsync(NativeContext context)
    {
        if (!AuthService.Instance.IsReady)
            return context.Reply("batch.parse.result",
                new BatchPreviewPayload([], [], Localization.Get("batch.error.signedOut")));

        var text = context.Payload<BatchParseRequest>()?.Text ?? "";
        var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var ids = new List<string>();
        var invalid = new List<string>();

        foreach (var line in text.Split(['\r', '\n'],
                     StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var id = Ids.User(line);
            if (id is null)
            {
                invalid.Add(line);
                continue;
            }

            if (seen.Add(id))
                ids.Add(id);
        }

        if (ids.Count == 0)
            return context.Reply("batch.parse.result",
                new BatchPreviewPayload([], [.. invalid], Localization.Get("batch.error.noUsers")));

        var users = new List<InstanceUser>(ids.Count);

        for (var index = 0; index < ids.Count; index++)
        {
            var id = ids[index];

            try
            {
                await PlayerService.Instance.FetchNowAsync(id, CancellationToken.None);
                users.Add(InstanceService.Instance.Describe(id, ""));
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Batch profile lookup for {UserId} failed", id);
                users.Add(InstanceService.Instance.Describe(id, ""));
            }

            if (index + 1 < ids.Count)
                await Task.Delay(ProfileGap, CancellationToken.None);
        }

        return context.Reply("batch.parse.result", new BatchPreviewPayload([.. users], [.. invalid]));
    }

    private Task<NativeResponse?> RunAsync(NativeContext context)
    {
        if (!AuthService.Instance.IsReady)
            return Task.FromResult<NativeResponse?>(Reply(context, false, 0, [],
                Localization.Get("batch.error.signedOut")));

        var ids = (context.Payload<BatchRunRequest>()?.UserIds ?? [])
            .Select(Ids.User)
            .OfType<string>()
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Where(id => !string.Equals(id, AuthService.Instance.CurrentUserId, StringComparison.OrdinalIgnoreCase))
            .ToArray();

        if (ids.Length == 0)
            return Task.FromResult<NativeResponse?>(Reply(context, false, 0, [],
                Localization.Get("batch.error.noUsers")));

        var actions = ConfiguredActions();
        if (actions.Length == 0)
            return Task.FromResult<NativeResponse?>(Reply(context, false, 0, [],
                Localization.Get("batch.error.noActions")));

        int total;
        string[] kinds;
        CancellationToken token;

        lock (_gate)
        {
            if (_running)
                return Task.FromResult<NativeResponse?>(Reply(context, false, 0, [],
                    Localization.Get("batch.error.running")));

            _running = true;
            _cancelled = false;
            _error = null;
            _done = 0;
            _failed = 0;
            total = _total = ids.Length * actions.Length;
            kinds = _actions = [.. actions.Select(action => action.Label)];
            _outcomes.Clear();
            _cancellation = new();
            token = _cancellation.Token;
        }

        _ = Task.Run(() => ExecuteAsync(ids, actions, token));
        return Task.FromResult<NativeResponse?>(Reply(context, true, total, kinds, null));
    }

    private Task<NativeResponse?> Stop(NativeContext context)
    {
        lock (_gate)
            _cancellation?.Cancel();

        return Task.FromResult<NativeResponse?>(context.Reply("batch.stop.result", new OkPayload()));
    }

    private async Task ExecuteAsync(string[] ids, (string Api, string Kind, string Label)[] actions,
        CancellationToken token)
    {
        var outcomes = new List<BatchOutcomePayload>();
        var cancelled = false;
        string? error = null;

        try
        {
            foreach (var id in ids)
            {
                token.ThrowIfCancellationRequested();

                var user = await DescribeAsync(id, token);
                var ok = true;
                string? userError = null;

                foreach (var (api, kind, _) in actions)
                {
                    token.ThrowIfCancellationRequested();

                    if (!AuthService.Instance.IsReady)
                    {
                        error = Localization.Get("batch.error.signedOut");
                        ok = false;
                        userError = error;
                        break;
                    }

                    var success = await ModerationQueue.Instance.ModerateAsync(id, api, token);

                    if (success)
                        await OperationService.Instance.LogAsync(kind, id, user.Name,
                            $"batch · {user.Threat}", user.IconUrl ?? user.AvatarUrl, false);
                    else
                    {
                        ok = false;
                        userError ??= Localization.Get("batch.error.apiRefused");
                    }

                    lock (_gate)
                    {
                        _done++;

                        if (!success)
                            _failed++;
                    }

                    PublishProgress(id);
                }

                outcomes.Add(new(id, ok, userError));

                if (error is not null)
                    break;
            }
        }
        catch (OperationCanceledException)
        {
            cancelled = true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Batch action failed");
            error = ex.Message;
        }
        finally
        {
            BatchFinishedPayload payload;

            lock (_gate)
            {
                _running = false;
                _cancelled = cancelled;
                _error = error;
                _outcomes.Clear();
                _outcomes.AddRange(outcomes);
                _cancellation?.Dispose();
                _cancellation = null;

                payload = new(cancelled, _done, _total, _failed, error, [.. outcomes]);
            }

            WindowManager.Instance.NotifyMainWindow("batch.finished", payload);
        }
    }

    /// <summary>The profile is normally cached from the preview; a row that is still a placeholder is loaded now.</summary>
    private static async Task<InstanceUser> DescribeAsync(string id, CancellationToken token)
    {
        var user = InstanceService.Instance.Describe(id, "");
        if (user.ProfileLoaded)
            return user;

        try
        {
            await PlayerService.Instance.FetchNowAsync(id, token);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            Serilog.Log.Warning(ex, "Batch profile lookup for {UserId} failed", id);
        }

        return InstanceService.Instance.Describe(id, "");
    }

    private void PublishProgress(string? userId)
    {
        BatchProgressPayload payload;

        lock (_gate)
            payload = new(_running, _done, _total, _failed, userId);

        WindowManager.Instance.NotifyMainWindow("batch.progress", payload);
    }

    private BatchStatePayload State()
    {
        lock (_gate)
            return new(_running, _done, _total, _failed, _cancelled, _error, [.. _outcomes], _actions);
    }

    private static (string Api, string Kind, string Label)[] ConfiguredActions()
    {
        var settings = SettingsService.Instance.Current;
        var actions = new List<(string Api, string Kind, string Label)>();

        // The label is what the page shows; the kind is what the operation history stores and undoes.
        if (settings.AutoBlock)
            actions.Add(("block", "block", "Blocked"));

        if (settings.AutoDisableAvatarInteraction)
            actions.Add(("interactOff", "avatarInteractionOff", "Avatar interactions off"));

        if (settings.AutoHideChatBox)
            actions.Add(("muteChat", "chatBoxHidden", "Chat box hidden"));

        return [.. actions];
    }

    private static NativeResponse Reply(NativeContext context, bool started, int total, string[] actions,
        string? error) =>
        context.Reply("batch.run.result", new BatchStartPayload(started, total, actions, error));
}
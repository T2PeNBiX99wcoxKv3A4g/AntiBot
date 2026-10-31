using AntiBot.Messaging;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Records every automatic action and hands the history to the interface.</summary>
internal sealed class OperationService : Singleton<OperationService>
{
    private readonly Lock _gate = new();
    private string _pushed = "";

    public OperationService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "operations.snapshot":
                return context.Reply("operations.snapshot.result", Database.Instance.LoadOperations().ToArray());

            case "operations.clear":
                await Database.Instance.ClearOperationsAsync();
                Publish();
                return context.Reply("operations.clear.result", new OkPayload());

            default:
                return null;
        }
    }

    public async Task LogAsync(string kind, string userId, string displayName, string detail)
    {
        await Database.Instance.AddOperationAsync(kind, userId, displayName, detail);
        Log.Information("Operation {Kind} for {Name} ({Detail})", kind, displayName, detail);
        Publish();
    }

    private void Publish()
    {
        var entries = Database.Instance.LoadOperations().ToArray();
        var signature = string.Join('|', entries.Select(entry => entry.Id));

        lock (_gate)
        {
            if (signature == _pushed)
                return;

            _pushed = signature;
        }

        WindowManager.Instance.NotifyMainWindow("operations.changed", entries);
    }
}

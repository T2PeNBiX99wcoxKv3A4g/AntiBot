using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Placeholder for the future detection pipeline. It currently only reports an idle status; no
///     VRChat log is read, no account is inspected and nothing is blocked.
/// </summary>
internal sealed class GuardService : Singleton<GuardService>
{
    public GuardService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "guard.status"
            ? Task.FromResult<NativeResponse?>(context.Reply("guard.status.result", GuardStatus.Idle))
            : Task.FromResult<NativeResponse?>(null);
}
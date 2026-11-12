using AntiBot.Messaging;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Hands a VRChat link to the default browser; nothing else is allowed through.</summary>
internal sealed class AppLinkService : Singleton<AppLinkService>
{
    public AppLinkService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "system.openUrl"
            ? Task.FromResult<NativeResponse?>(Open(context))
            : Task.FromResult<NativeResponse?>(null);

    private static NativeResponse Open(NativeContext context)
    {
        var url = context.Payload<OpenUrlRequest>()?.Url;

        if (!IsVrchatLink(url))
            return context.Fail("system.openUrl.result", Localization.Get("error.onlyVrchatLinks"));

        SystemLauncher.Open(url!);
        return context.Reply("system.openUrl.result", new OkPayload());
    }

    private static bool IsVrchatLink(string? url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps &&
        (uri.Host == "vrchat.com" || uri.Host.EndsWith(".vrchat.com", StringComparison.OrdinalIgnoreCase));
}

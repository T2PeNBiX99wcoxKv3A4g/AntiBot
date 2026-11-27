using AntiBot.Messaging;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;

namespace AntiBot.Services;

/// <summary>Hands a VRChat link to the default browser; nothing else is allowed through.</summary>
[Singleton]
internal partial class AppLinkService
{
    [NativeMessage("system.openUrl")]
    private static NativeResponse Open(NativeContext context)
    {
        var url = context.Payload<OpenUrlRequest>()?.Url;

        if (!IsVrchatLink(url))
            return context.Fail("system.openUrl.result", Localization.Get("error.only_vrchat_links"));

        SystemLauncher.Open(url!);
        return context.Reply("system.openUrl.result", new OkPayload());
    }

    /// <summary>Opens the community submission page; only GitHub is allowed through this door.</summary>
    [NativeMessage("community.open")]
    private static NativeResponse OpenCommunity(NativeContext context)
    {
        var url = context.Payload<OpenUrlRequest>()?.Url;

        if (!IsGitHubLink(url))
            return context.Fail("community.open.result", Localization.Get("error.only_github_links"));

        SystemLauncher.Open(url!);
        return context.Reply("community.open.result", new OkPayload());
    }

    private static bool IsVrchatLink(string? url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps &&
        (uri.Host == "vrchat.com" || uri.Host.EndsWith(".vrchat.com", StringComparison.OrdinalIgnoreCase));

    private static bool IsGitHubLink(string? url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps &&
        uri.Host.Equals("github.com", StringComparison.OrdinalIgnoreCase);
}
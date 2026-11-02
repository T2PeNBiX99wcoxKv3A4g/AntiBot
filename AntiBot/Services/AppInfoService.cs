using AntiBot.Messaging;
using JetBrains.Annotations;
using PhotinoNetUtils;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Answers the <c>app.*</c> messages about the build, its log folder and the release page.</summary>
internal sealed class AppInfoService : Singleton<AppInfoService>
{
    /// <summary>The version declared in the csproj (<c>&lt;Version&gt;</c>).</summary>
    [PublicAPI] public static readonly string Version =
        BuildInfo.VersionOf(typeof(AppInfoService).Assembly);

    /// <summary>Lower-case platform id, so the UI can adapt platform-specific actions.</summary>
    [PublicAPI] public static readonly string Platform = BuildInfo.Platform;

    /// <summary>Whether this is a debug build, which is the only one that shows the debug page.</summary>
#if DEBUG
    [PublicAPI] public static readonly bool Debug = true;
#else
    [PublicAPI] public static readonly bool Debug = false;
#endif

    /// <summary>
    ///     Changes whenever this build does. The interface is always served from the same address, so
    ///     this is what tells the web view that what it cached belongs to an older build.
    /// </summary>
    [PublicAPI] public static readonly string BuildToken = BuildInfo.BuildTokenFor(typeof(AppInfoService).Assembly);

    public AppInfoService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "app.info" => Task.FromResult<NativeResponse?>(context.Reply("app.info.result",
            new AppInfoPayload(Version, Platform, Constants.LogDirectory, WindowManager.Instance.DrawsWindowCorners,
                Debug))),
        "app.openLogs" => Task.FromResult<NativeResponse?>(Open(context, Constants.LogDirectory,
            "app.openLogs.result", "error.openLogsFailed")),
        "app.openReleases" => Task.FromResult<NativeResponse?>(Open(context, Constants.ReleasesUrl,
            "app.openReleases.result", "error.openReleasesFailed")),
        "system.openUrl" => Task.FromResult<NativeResponse?>(OpenUrl(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>Opens a folder or a fixed link with the system's default handler.</summary>
    private static NativeResponse Open(NativeContext context, string target, string replyType, string errorKey)
    {
        var started = Try.Run(() => SystemLauncher.Open(target));

        if (started.Exception is not { } exception)
            return context.Reply(replyType, new OkPayload());

        Constants.Logger.Warning(exception, "Failed to open {Target}", target);
        return context.Fail(replyType, Localization.Get(errorKey));
    }

    /// <summary>Hands a VRChat link to the default browser; nothing else is allowed through.</summary>
    private static NativeResponse OpenUrl(NativeContext context)
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

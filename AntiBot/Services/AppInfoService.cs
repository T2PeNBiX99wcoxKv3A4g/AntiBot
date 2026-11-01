using AntiBot.Messaging;
using JetBrains.Annotations;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Answers the <c>app.info</c> message so the UI can show the build version.</summary>
internal sealed class AppInfoService : Singleton<AppInfoService>
{
    /// <summary>The version declared in the csproj (<c>&lt;Version&gt;</c>).</summary>
    [PublicAPI] public static readonly string Version =
        typeof(AppInfoService).Assembly.GetName().Version?.ToString(3) ?? "0.0.0";

    /// <summary>Lower-case platform id, so the UI can adapt platform-specific actions.</summary>
    [PublicAPI] public static readonly string Platform =
        OperatingSystem.IsWindows() ? "windows" :
        OperatingSystem.IsLinux() ? "linux" : "unknown";

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
    [PublicAPI] public static readonly string BuildToken = ResolveBuildToken();

    public AppInfoService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "app.info" => Task.FromResult<NativeResponse?>(context.Reply("app.info.result",
            new AppInfoPayload(Version, Platform, WindowManager.Instance.DrawsWindowCorners, Debug))),
        "system.openUrl" => Task.FromResult<NativeResponse?>(OpenUrl(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

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

    /// <summary>The executable's write time, which a replacement binary always changes.</summary>
    private static string ResolveBuildToken()
    {
        var executable = Environment.ProcessPath;
        return string.IsNullOrEmpty(executable)
            ? Version
            : File.GetLastWriteTimeUtc(executable).Ticks.ToString();
    }
}
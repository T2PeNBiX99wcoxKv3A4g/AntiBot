using JetBrains.Annotations;
using PhotinoNetUtils;
using Serilog;

namespace AntiBot;

[PublicAPI]
public static class Constants
{
#if DEBUG
    [PublicAPI] internal const bool IsDebugMode = true;
#else
    [PublicAPI] internal const bool IsDebugMode = false;
#endif

    public const string Name = "AntiBot";
    public const string WindowTitle = Name;

    /// <summary>Where a newer release can be downloaded.</summary>
    public const string ReleasesUrl = "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest";

    /// <summary>
    ///     The shared "Core" logger. Resolved from the configured <see cref="Log.Logger" /> on every
    ///     access, so it must not be captured before <see cref="Logging.Initialize" /> has run.
    /// </summary>
    internal static ILogger Logger => Log.Logger.ForContext("SourceContext", "Core");

    /// <summary>
    ///     Where the settings live: <c>%APPDATA%\AntiBot</c> (roaming).
    /// </summary>
    internal static string SettingsDirectory => AppPaths.SettingsDirectory(Name);

    /// <summary>Where <see cref="Logging" /> writes its rolling files.</summary>
    internal static string LogDirectory => AppPaths.LogDirectory(Name);

    /// <summary>
    ///     A directory we own, used as the host's content root. The static server creates a
    ///     <c>wwwroot</c> web root under it when missing, which without this would land next to the
    ///     executable.
    /// </summary>
    internal static string DataDirectory => AppPaths.DataDirectory(Name);
}
using PhotinoNetUtils;

namespace AntiBot.Services;

/// <summary>The running build's identity, shared by the API clients and the web view cache.</summary>
internal static class AppIdentity
{
    public static readonly string Version = BuildInfo.VersionOf(typeof(AppIdentity).Assembly);
    public static readonly string Platform = BuildInfo.Platform;
    public static readonly string BuildToken = BuildInfo.BuildTokenFor(typeof(AppIdentity).Assembly);
}
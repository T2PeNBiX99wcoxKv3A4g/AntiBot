namespace AntiBot.Models;

/// <summary>Persisted settings. The log folder defaults to VRChat's own folder.</summary>
public sealed record AppSettings(string LogDirectory, string[] AvatarApiProviders)
{
    /// <summary>The avatar databases VRCX uses, in the same request format.</summary>
    public static readonly string[] DefaultAvatarApiProviders =
    [
        "https://api.avtrdb.com/v3/avatar/search/vrcx",
        "https://vrcx.vrcdb.com/avatars/Avatar/VRCX"
    ];

    public static AppSettings Default { get; } = new(ResolveDefaultLogDirectory(), DefaultAvatarApiProviders);

    public static string DefaultLogDirectory => Default.LogDirectory;

    private static string ResolveDefaultLogDirectory()
    {
        if (Environment.GetEnvironmentVariable("ANTIBOT_VRCHAT_LOG_DIR") is { Length: > 0 } custom)
            return custom;

        // LocalLow sits beside Local; there is no SpecialFolder for it.
        var local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
            .TrimEnd(Path.DirectorySeparatorChar);
        var localLow = Path.Combine(Path.GetDirectoryName(local) ?? local, "LocalLow", "VRChat", "VRChat");

        if (!OperatingSystem.IsLinux() || Directory.Exists(localLow))
            return localLow;

        // VRChat runs under Proton on Linux, which keeps the game inside a Steam prefix.
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var prefixes = new[]
        {
            Path.Combine(home, ".steam", "steam", "steamapps", "compatdata", "438100", "pfx"),
            Path.Combine(home, ".local", "share", "Steam", "steamapps", "compatdata", "438100", "pfx")
        };

        return prefixes
            .Select(prefix => Path.Combine(prefix, "drive_c", "users", "steamuser",
                "AppData", "LocalLow", "VRChat", "VRChat"))
            .FirstOrDefault(Directory.Exists) ?? localLow;
    }
}
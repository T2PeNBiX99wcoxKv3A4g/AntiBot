namespace AntiBot.Models;

/// <summary>Persisted settings. The log folder defaults to VRChat's own folder.</summary>
public sealed record AppSettings
{
    /// <summary>The avatar databases VRCX uses, in the same request format.</summary>
    public static readonly string[] DefaultAvatarApiProviders =
    [
        "https://api.avtrdb.com/v3/avatar/search/vrcx",
        "https://vrcx.vrcdb.com/avatars/Avatar/VRCX"
    ];

    public string LogDirectory { get; init; } = ResolveDefaultLogDirectory();

    /// <summary>UI and backend language: <c>en</c>, <c>ja</c>, <c>zh-CN</c> or <c>zh-TW</c>.</summary>
    public string Language { get; init; } = "en";

    /// <summary>Start with the window hidden in the tray.</summary>
    public bool StartHidden { get; init; }

    public string[] AvatarApiProviders { get; init; } = DefaultAvatarApiProviders;

    /// <summary>Block a user whose threat reaches <see cref="ThreatThreshold" />.</summary>
    public bool AutoBlock { get; init; } = true;

    /// <summary>Turn avatar interactions off for a high-threat user.</summary>
    public bool AutoDisableAvatarInteraction { get; init; } = true;

    /// <summary>Hide a high-threat user's chat box.</summary>
    public bool AutoHideChatBox { get; init; } = true;

    /// <summary>Close VRChat when a high-threat user appears, so the instance is left at once.</summary>
    public bool AutoCloseVrchat { get; init; }

    /// <summary>Turn VRChat's Safe Mode on over OSC, which replaces every non-friend avatar at once.</summary>
    public bool AutoSafeMode { get; init; }

    /// <summary>Leave VRChat alone while a VR headset is in use; closing it there is disruptive.</summary>
    public bool SkipCloseInVr { get; init; } = true;

    /// <summary>Hide friend requests from high-threat users.</summary>
    public bool AutoRejectFriendRequests { get; init; } = true;

    /// <summary>0-100; at or above this the automatic actions run.</summary>
    public int ThreatThreshold { get; init; } = 50;

    /// <summary>Users that are never acted on, whatever their score.</summary>
    public string[] Whitelist { get; init; } = [];

    public static AppSettings Default { get; } = new();

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

using PhotinoNetUtils.Settings;

namespace AntiBot.Models;

/// <summary>Persisted settings. The log folder defaults to VRChat's own folder.</summary>
[SettingsModel]
public sealed record AppSettings
{
    /// <summary>The avatar databases VRCX uses, in the same request format.</summary>
    public static readonly string[] DefaultAvatarApiProviders =
    [
        "https://api.avtrdb.com/v3/avatar/search/vrcx",
        "https://vrcx.vrcdb.com/avatars/Avatar/VRCX"
    ];

    [Setting(Comment = "The VRChat log folder AntiBot follows.")]
    public string LogDirectory { get; init; } = ResolveDefaultLogDirectory();

    /// <summary>UI and backend language: <c>system</c>, <c>en</c>, <c>ja</c>, <c>zh-CN</c> or <c>zh-TW</c>.</summary>
    [Setting(Comment = "Interface and backend language: system, en, ja, zh-CN or zh-TW.")]
    public string Language { get; init; } = "system";

    /// <summary>The port VRChat listens on for OSC.</summary>
    [Setting(Comment = "Port VRChat listens on for OSC.")]
    public int OscPort { get; init; } = 9000;

    /// <summary>Start with the window hidden in the tray.</summary>
    [Setting(Comment = "Start with the window hidden in the tray.")]
    public bool StartHidden { get; init; }

    [Setting(Comment = "Avatar-name lookup endpoints, tried in order.")]
    public string[] AvatarApiProviders { get; init; } = DefaultAvatarApiProviders;

    /// <summary>Block a user whose threat reaches <see cref="ThreatThreshold" />.</summary>
    [Setting(Comment = "Block a user whose threat reaches the threshold.")]
    public bool AutoBlock { get; init; } = true;

    /// <summary>Turn avatar interactions off for a high-threat user.</summary>
    [Setting(Comment = "Turn avatar interactions off for a high-threat user.")]
    public bool AutoDisableAvatarInteraction { get; init; } = true;

    /// <summary>Hide a high-threat user's chat box.</summary>
    [Setting(Comment = "Hide a high-threat user's chat box.")]
    public bool AutoHideChatBox { get; init; } = true;

    /// <summary>Close VRChat when a high-threat user appears, so the instance is left at once.</summary>
    [Setting(Comment = "Close VRChat when a high-threat user appears.")]
    public bool AutoCloseVrchat { get; init; }

    /// <summary>Turn VRChat's Safe Mode on over OSC, which replaces every non-friend avatar at once.</summary>
    [Setting(Comment = "Turn VRChat's Safe Mode on over OSC.")]
    public bool AutoSafeMode { get; init; } = true;

    /// <summary>Switch to <see cref="SafeAvatarId" /> over OSC when a high-threat user appears.</summary>
    [Setting(Comment = "Switch to the safe avatar over OSC.")]
    public bool AutoSafeAvatar { get; init; }

    /// <summary>The avatar to switch to; it has to be a favourite, a recent or one of the user's own.</summary>
    [Setting(Comment = "Avatar to switch to; a favourite, recent or one of your own.")]
    public string SafeAvatarId { get; init; } = "";

    /// <summary>Leave VRChat alone while a VR headset is in use; closing it there is disruptive.</summary>
    [Setting(Comment = "Leave VRChat alone while a VR headset is in use.")]
    public bool SkipCloseInVr { get; init; } = true;

    /// <summary>Hide friend requests from high-threat users.</summary>
    [Setting(Comment = "Hide friend requests from high-threat users.")]
    public bool AutoRejectFriendRequests { get; init; } = true;

    /// <summary>0-100; at or above this the automatic actions run.</summary>
    [Setting(Comment = "0-100; at or above this the automatic actions run.")]
    public int ThreatThreshold { get; init; } = 50;

    /// <summary>Users that are never acted on, whatever their score.</summary>
    [Setting(Comment = "Users that are never acted on, whatever their score.")]
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
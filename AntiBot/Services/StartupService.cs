using System.Runtime.Versioning;
using AntiBot.Messaging;
using PhotinoNetUtils;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Registers AntiBot to start with the user's session. The autostart entry's presence is the
///     state, so deleting it by hand turns the feature off too.
/// </summary>
/// <remarks>
///     Windows uses a shortcut in the per-user Startup folder; Linux uses the XDG autostart directory.
/// </remarks>
internal sealed class StartupService : Singleton<StartupService>
{
    private const string ShortcutName = "AntiBot.lnk";
    private const string DesktopEntryName = "AntiBot.desktop";

    private readonly string _entryPath;

    public StartupService()
    {
        _entryPath = OperatingSystem.IsWindows()
            ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Startup), ShortcutName)
            : Path.Combine(ConfigHome(), "autostart", DesktopEntryName);

        NativeBridge.MessageReceived += HandleMessageAsync;
        Refresh();
    }

    public static bool IsSupported => OperatingSystem.IsWindows() || OperatingSystem.IsLinux();

    private bool IsEnabled => IsSupported && File.Exists(_entryPath);

    /// <summary>Rewrites an existing entry so a moved executable or a new icon is picked up.</summary>
    private void Refresh()
    {
        if (IsEnabled)
            Try.Run(Create).OnFailure(ex => Log.Warning(ex, "Failed to refresh the autostart entry"));
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "app.startup" => Task.FromResult<NativeResponse?>(Status(context)),
        "app.setStartup" => Task.FromResult<NativeResponse?>(Set(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private NativeResponse Status(NativeContext context) =>
        context.Reply("app.startup.result", new StartupPayload(IsSupported, IsEnabled));

    private NativeResponse Set(NativeContext context)
    {
        var enabled = context.Payload<StartupRequest>()?.Enabled ?? false;

        if (!IsSupported)
            return context.Reply("app.setStartup.result", new StartupPayload(false, false));

        Try.Run(() =>
        {
            if (enabled)
                Create();
            else if (File.Exists(_entryPath))
                File.Delete(_entryPath);
        }).OnFailure(ex => Log.Warning(ex, "Failed to update the autostart entry"));

        return context.Reply("app.setStartup.result", new StartupPayload(IsSupported, IsEnabled));
    }

    private void Create()
    {
        var executable = Environment.ProcessPath;
        if (string.IsNullOrEmpty(executable))
        {
            Log.Warning("Cannot create the autostart entry: the executable path is unknown");
            return;
        }

        if (OperatingSystem.IsLinux())
            WriteDesktopEntry(executable);
        else if (OperatingSystem.IsWindows())
            WindowsShortcut.Create(_entryPath, executable, "", Path.GetDirectoryName(executable) ?? "",
                Constants.WindowTitle);
    }

    [SupportedOSPlatform("linux")]
    private void WriteDesktopEntry(string executable)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_entryPath)!);

        var icon = AppIcon.EnsureExtracted(typeof(StartupService).Assembly, Constants.Name) ?? "antibot";

        File.WriteAllText(_entryPath, string.Join("\n",
            "[Desktop Entry]",
            "Type=Application",
            $"Name={Constants.WindowTitle}",
            $"Comment={Constants.WindowTitle}",
            $"Exec=\"{executable}\"",
            $"Icon={icon}",
            "Terminal=false",
            "X-GNOME-Autostart-enabled=true",
            ""));

        File.SetUnixFileMode(_entryPath, File.GetUnixFileMode(_entryPath) | UnixFileMode.UserExecute);
    }

    private static string ConfigHome()
    {
        var configured = Environment.GetEnvironmentVariable("XDG_CONFIG_HOME");
        return string.IsNullOrEmpty(configured)
            ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".config")
            : configured;
    }
}

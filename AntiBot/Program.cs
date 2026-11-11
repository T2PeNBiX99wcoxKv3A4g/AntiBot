using System.Diagnostics.CodeAnalysis;
using AntiBot.Messaging;
using AntiBot.Services;
using PhotinoNetUtils;
using PhotinoNetUtils.Interop;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Services;
using Serilog;
#if !DEBUG
using PhotinoNetUtils.Hosting;
#endif

namespace AntiBot;

internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        if (!OperatingSystem.IsWindows() && !OperatingSystem.IsLinux())
            throw new PlatformNotSupportedException("AntiBot supports Windows and Linux.");

        // Main must stay synchronous: [STAThread] is ignored for an async entry point, and the
        // Photino message loop / WebView2 require an STA thread.
        Logging.Initialize(Constants.Name, "antibot");

        // The bridge serializes through this context; it has to know it before the interface speaks.
        NativeBridge.Initialize(AppJsonContext.Default);

        // The language lives in the settings; load them before anything asks for a string.
        SettingsService.Instance.Load();
        Localization.Initialize(typeof(Program).Assembly, "AntiBot.Resources.i18n.",
            () => SettingsService.Instance.Language);

        if (OperatingSystem.IsLinux())
        {
            LinuxDiagnostics.Write();

            // The Wayland app id must match the desktop entry's file name, or the compositor will not
            // associate our windows with our icon.
            LinuxGtk.SetProgramName(Constants.Name);
        }

        try
        {
            foreach (var arg in args)
                Log.Information("arg: {Arg}", arg);

            // Only one instance may run; later launches forward their arguments to it and exit.
            using var singleInstance = new SingleInstance(Constants.Name);
            if (!singleInstance.IsFirstInstance)
            {
                // A second launch with no arguments is still an activation request: send a marker so
                // the running instance shows its window instead of ignoring the empty payload.
                singleInstance.ForwardAsync(args.Length == 0 ? ["--activate"] : args).GetAwaiter().GetResult();
                return;
            }

#if !DEBUG
            // Kestrel binds to an OS-assigned port, so several Photino apps can run side by side.
            using var staticServer = StaticServer.Start(Constants.DataDirectory);
            var appUrl = $"{staticServer.BaseUrl}/index.html?v={AppInfoService.BuildToken}";
#else
            // A Debug build always talks to the Vite dev server, which is where hot reload lives.
            const string appUrl = "http://127.0.0.1:3200";
#endif

            Log.Information("Serving React app at {AppUrl}", appUrl);

            // Touching each singleton constructs it, which is what registers its message handlers.
            _ = AppInfoService.Instance;
            _ = UpdateService.Instance;
            _ = StartupService.Instance;
            _ = VrchatLogService.Instance;

            // Reads the log for the OSC port and the shield level, so Safe Mode can be requested.
            _ = VrchatOscService.Instance;

            // The instance events and the player cache live in the local database.
            Database.Instance.Initialize();
            _ = PlayerService.Instance;
            PlayerService.Instance.Start();
            _ = AvatarService.Instance;
            AvatarService.Instance.Start();

            // Construct the auth service before the instance list, which subscribes to it.
            _ = AuthService.Instance;
            AuthService.Instance.Initialize();

            _ = InstanceService.Instance;
            _ = FriendRequestService.Instance;
            _ = OperationService.Instance;
            _ = ThreatActionService.Instance;
            _ = BatchService.Instance;

            var manager = WindowManager.Instance;
            manager.AppUrl = appUrl;
            manager.IconPath = AppIcon.EnsureExtracted(typeof(Program).Assembly, Constants.Name);

            // Without a tray the window is the only way back in, so it always shows there.
            var hasTray = OperatingSystem.IsWindows() ||
                          OperatingSystem.IsLinux() && LinuxDiagnostics.AppIndicatorLibrary is not null;
            manager.ShowMainWindowOnStartup = !SettingsService.Instance.Current.StartHidden || !hasTray;

            using var tray = CreateTray(manager.IconPath);

            manager.MainWindowCreated +=
                [SuppressMessage("ReSharper", "AccessToDisposedClosure")]
                () =>
                    singleInstance.StartServer(_ => manager.ShowMainWindow());

            manager.CreateMainWindow();
            StartTray(tray);
            VrchatLogService.Instance.Start();

            using var termination = TerminationSignals.Handle(manager.Exit);
            manager.Run();

            Log.Information("Exiting");
        }
        catch (Exception ex)
        {
            // The window procedure runs native code, so a failure there surfaces here. Record it
            // before the runtime prints its own crash dialog.
            Log.Fatal(ex, "Unhandled exception");
            throw;
        }
        finally
        {
            Logging.Shutdown();
        }
    }

    /// <summary>
    ///     Starts the tray icon and records whether it exists, so closing the window only hides it
    ///     when there is really something to restore it from.
    /// </summary>
    private static void StartTray(ITrayIcon tray)
    {
        var manager = WindowManager.Instance;
        TrayIconFactory.StartWhenReady(tray, manager.RunOnMainWindow, started => manager.CloseToTray = started);
    }

    /// <summary>The platform's tray icon, or a no-op stand-in when there is none.</summary>
    private static ITrayIcon CreateTray(string? iconPath)
    {
        var manager = WindowManager.Instance;

        return TrayIconFactory.CreateStandard(
            Constants.Name,
            Constants.WindowTitle,
            iconPath,
            Localization.Get("tray.open"),
            Localization.Get("tray.settings"),
            Localization.Get("tray.exit"),
            () => manager.ShowMainWindow(),
            () => manager.ShowMainWindow("settings"),
            manager.Exit,
            manager.ReloadWebView,
            Localization.Get("tray.reload"));
    }
}

using System.Diagnostics.CodeAnalysis;
using System.Runtime.Versioning;
using AntiBot.Messaging;
using AntiBot.Services;
using PhotinoNetUtils;
using PhotinoNetUtils.Interop;
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
            SettingsService.Instance.Load();
            _ = VrchatLogService.Instance;

            // Construct the auth service first: the instance list subscribes to it.
            _ = AuthService.Instance;
            AuthService.Instance.Initialize();

            _ = InstanceService.Instance;

            var manager = WindowManager.Instance;
            manager.AppUrl = appUrl;
            manager.IconPath = AppIcon.EnsureExtracted(typeof(Program).Assembly, Constants.Name);

            using var tray = CreateTray(manager.IconPath);

            manager.MainWindowCreated +=
                [SuppressMessage("ReSharper", "AccessToDisposedClosure")]
                () =>
                    singleInstance.StartServer(_ => manager.ShowMainWindow());

            manager.CreateMainWindow();
            StartTray(tray);
            VrchatLogService.Instance.Start();
            manager.Run();

            Log.Information("Exiting");
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
        if (!OperatingSystem.IsLinux())
        {
            WindowManager.Instance.CloseToTray = tray.Start();
            return;
        }

        StartLinuxTrayWhenReady(tray);
    }

    /// <summary>
    ///     On GTK the tray can only be built on the UI thread and only once the toolkit has a display
    ///     connection, which appears when the message loop starts. libayatana-appindicator aborts the
    ///     process if it is asked any earlier, so it waits for the toolkit to report ready.
    /// </summary>
    [SupportedOSPlatform("linux")]
    private static void StartLinuxTrayWhenReady(ITrayIcon tray) =>
        _ = Task.Run(async () =>
        {
            for (var attempt = 0; attempt < 100 && !TrayIconFactory.IsToolkitReady; attempt++)
                await Task.Delay(100);

            WindowManager.Instance.RunOnMainWindow(() => { WindowManager.Instance.CloseToTray = tray.Start(); });
        });

    /// <summary>The platform's tray icon, or a no-op stand-in when there is none.</summary>
    private static ITrayIcon CreateTray(string? iconPath)
    {
        var manager = WindowManager.Instance;

        return TrayIconFactory.Create(
            Constants.Name,
            Constants.WindowTitle,
            iconPath,
            manager.ShowMainWindow,
            [
                new("Open", manager.ShowMainWindow),
                new("Exit", manager.Exit, true)
            ]);
    }
}
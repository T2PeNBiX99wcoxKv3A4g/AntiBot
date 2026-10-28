using AntiBot.Messaging;
using Photino.NET;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Interop;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Owns the Photino window and the message loop: creation, hiding to the tray and bringing it
///     back.
/// </summary>
internal sealed class WindowManager : Singleton<WindowManager>
{
    /// <summary>
    ///     Per-app web view data folder. On Windows, Photino defaults to a WebView2 folder shared by
    ///     every Photino app, which breaks when another app holds it, so keep ours separate.
    /// </summary>
    private static readonly string WebViewDataPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name, "webview");

    private bool _allowClose;
    private PhotinoWindow? _mainWindow;

    /// <summary>Address the window loads the interface from, set before the window is created.</summary>
    public string AppUrl { get; set; } = "";

    /// <summary>Path to the extracted icon for the window, or null to keep the default.</summary>
    public string? IconPath { get; set; }

    /// <summary>
    ///     Whether closing the window hides it. Set once the tray reports whether it was really
    ///     created, so a missing tray can never leave the window hidden with no way back.
    /// </summary>
    public bool CloseToTray { get; set; }

    /// <summary>Raised once the window's native handle exists (the message loop is about to start).</summary>
    public event Action? MainWindowCreated;

    public void CreateMainWindow()
    {
        PrepareWebViewData();

        var window = new PhotinoWindow()
            // The native layer prints every property setter and message it handles. That is useful
            // while debugging, but it floods the log with JSON payloads in a release build.
            .SetLogVerbosity(Constants.IsDebugMode ? 3 : 0)
            .SetTitle(Constants.WindowTitle)
            .SetTemporaryFilesPath(WebViewDataPath)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1280, 800))
            .SetMinSize(900, 560)
            .SetContextMenuEnabled(false)
            .RegisterWebMessageReceivedHandler((sender, message) =>
                _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
            .RegisterWindowClosingHandler((_, _) =>
            {
                // Stay resident: closing the window hides it instead of shutting down.
                if (_allowClose || !CloseToTray)
                {
                    Log.Information("Main window closing (allowed)");
                    return false;
                }

                Log.Information("Main window closing -> hiding to the tray");
                HideMainWindow();
                return true;
            });

        if (IconPath is { Length: > 0 } icon)
            window.SetIconFile(icon);

        window.RegisterWindowCreatedHandler((_, _) => MainWindowCreated?.Invoke());

        window.Load(AppUrl);
        _mainWindow = window;
    }

    /// <summary>Starts the message loop; blocks until the window is closed for good.</summary>
    public void Run() => _mainWindow?.WaitForClose();

    /// <summary>Shows the main window, restoring it first when it is hidden or minimised.</summary>
    public void ShowMainWindow()
    {
        Log.Information("Showing the main window");
        RunOnMainWindow(() => Show(_mainWindow!));
    }

    public void HideMainWindow()
    {
        Log.Information("Hiding the main window");
        RunOnMainWindow(() => Hide(_mainWindow!));
    }

    /// <summary>Runs an action on the UI thread, once the message loop is running.</summary>
    public void RunOnMainWindow(Action action) => _mainWindow?.Invoke(action);

    public void Exit()
    {
        _allowClose = true;
        RunOnMainWindow(() => _mainWindow?.Close());
    }

    private static void Show(PhotinoWindow window)
    {
        if (OperatingSystem.IsWindows())
        {
            var handle = window.WindowHandle;
            if (handle == IntPtr.Zero)
                return;

            NativeMethods.ShowWindow(handle, NativeMethods.SwRestore);
            NativeMethods.SetForegroundWindow(handle);
            return;
        }

        if (OperatingSystem.IsLinux())
        {
            if (LinuxGtk.Present(window.Title))
                return;

            window.SetMinimized(false);
            window.SetTopMost(true);
        }
    }

    private static void Hide(PhotinoWindow window)
    {
        if (OperatingSystem.IsWindows())
        {
            var handle = window.WindowHandle;
            if (handle != IntPtr.Zero)
                NativeMethods.ShowWindow(handle, NativeMethods.SwHide);
            return;
        }

        // Minimising leaves the window in the taskbar; hiding it outright does not.
        if (OperatingSystem.IsLinux() && !LinuxGtk.Hide(window.Title))
            window.SetMinimized(true);
    }

    /// <summary>
    ///     Drops the web view's data folder when this build is not the one that filled it, so an
    ///     upgrade never keeps serving the previous interface from the web view cache.
    /// </summary>
    private void PrepareWebViewData()
    {
        var marker = Path.Combine(Path.GetDirectoryName(WebViewDataPath)!, "webview.build");

        Try.Run(() =>
        {
            if (File.Exists(marker) && File.ReadAllText(marker) != AppInfoService.BuildToken)
            {
                Log.Information("This is a different build; clearing the web view's cache");
                Directory.Delete(WebViewDataPath, true);
            }

            File.WriteAllText(marker, AppInfoService.BuildToken);
        }).OnFailure(ex => Log.Warning(ex, "Failed to prepare the web view's data folder"));
    }
}
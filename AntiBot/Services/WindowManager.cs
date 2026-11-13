using AntiBot.Messaging;
using Photino.NET;
using PhotinoNetUtils.Hosting;
using PhotinoNetUtils.Interop;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Notifications;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Services;

namespace AntiBot.Services;

/// <summary>
///     Owns the Photino window and the message loop: creation, hiding to the tray and bringing it
///     back.
/// </summary>
[Singleton]
internal partial class WindowManager
{
    private bool _allowClose;
    private bool _hideWhenRendered;
    private PhotinoWindow? _mainWindow;
    private WebViewRecovery? _webViewRecovery;

    /// <summary>
    ///     Whether the interface has to paint the window's rounded corners, because the platform leaves
    ///     an undecorated window without a frame (Linux).
    /// </summary>
    public bool DrawsWindowCorners { get; private set; }

    /// <summary>Address the window loads the interface from, set before the window is created.</summary>
    public string AppUrl { get; set; } = "";

    /// <summary>Whether the window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; set; } = true;

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
        var webViewData = WebViewCache.Prepare(Constants.DataDirectory, AppIdentity.BuildToken);

        var window = new PhotinoWindow()
            // The native layer prints every property setter and message it handles. That is useful
            // while debugging, but it floods the log with JSON payloads in a release build.
            .SetLogVerbosity(Constants.IsDebugMode ? 3 : 0)
            .SetTitle(Constants.WindowTitle)
            // The id Windows attributes a toast to; the Start Menu shortcut carries it too.
            .SetNotificationRegistrationId(Constants.Name)
            .SetTemporaryFilesPath(webViewData)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1280, 800))
            .SetMinSize(900, 560)
            // Only here so nothing flashes; the window is hidden once the interface has rendered.
            .SetMinimized(!ShowMainWindowOnStartup)
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

        // The interface draws its own title bar. On Windows the native frame stays and WindowFrame
        // hides its non-client area, because a chromeless popup is a window no shell — or tiling
        // window manager — will arrange. Elsewhere chromeless is still the simplest way.
        if (!OperatingSystem.IsWindows())
            window.SetChromeless(true);

        window.RegisterWindowCreatedHandler((_, _) =>
        {
            // The native window now exists, so Photino can hand notifications to the OS. Anything
            // raised while it was starting (an auto sign-in failure, for example) is sent here.
            NotificationService.Attach(window);

            if (OperatingSystem.IsWindows())
            {
                WindowFrame.RemoveTitleBar(window.WindowHandle);

                // Photino drops a Start Menu shortcut for the toast registration and never revisits
                // it, so a build that moved or changed its icon would keep the old one.
                StartMenuShortcut.Refresh(Constants.WindowTitle);
            }
            else if (OperatingSystem.IsLinux())
            {
                LinuxWindow.UseClientSideFrame(window.Title);
                DrawsWindowCorners = LinuxWindow.EnableTransparency(window.Title);
            }

            // Hiding a window while its web view is still starting leaves it blank, so it stays
            // minimised until the interface reports in (or the timeout below hides it anyway).
            if (!ShowMainWindowOnStartup)
            {
                _hideWhenRendered = true;
                Log.Information("Starting hidden; the window stays minimised until its interface has rendered");
                _ = Task.Delay(TimeSpan.FromSeconds(10)).ContinueWith(_ => HideWhenRendered());
            }

            MainWindowCreated?.Invoke();
        });

        _webViewRecovery = WebViewRecovery.Attach(window, AppUrl);
        window.Load(AppUrl);
        _mainWindow = window;

        // The shared gate holds events raised before the page reports ready, then sends them.
        WebViewEvents.Ready += HideWhenRendered;
        WebViewEvents.Attach(window);
    }

    /// <summary>Starts the message loop; blocks until the window is closed for good.</summary>
    public void Run() => _mainWindow?.WaitForClose();

    /// <summary>Shows the main window, restoring it first when it is hidden or minimised.</summary>
    public void ShowMainWindow(string? page = null)
    {
        Log.Information("Showing the main window");
        RunOnMainWindow(() => Show(_mainWindow!));

        if (page is { Length: > 0 })
            NotifyMainWindow("app.navigate", new AppNavigatePayload(page));
    }

    public void HideMainWindow()
    {
        Log.Information("Hiding the main window");
        RunOnMainWindow(() => Hide(_mainWindow!));
    }

    /// <summary>Runs an action on the UI thread, once the message loop is running.</summary>
    public void RunOnMainWindow(Action action) => _mainWindow?.Invoke(action);

    /// <summary>Pushes an event to the interface; the shared gate queues it until the page is ready.</summary>
    public void NotifyMainWindow(string type, object? data) => WebViewEvents.Notify(type, data);

    private void HideWhenRendered()
    {
        if (!_hideWhenRendered || _mainWindow is not { } window)
            return;

        _hideWhenRendered = false;
        RunOnMainWindow(() => Hide(window));
    }

    public void Exit()
    {
        NotificationService.Detach();
        WebViewEvents.Detach();
        _allowClose = true;
        _webViewRecovery?.Dispose();
        RunOnMainWindow(() => _mainWindow?.Close());
    }

    /// <summary>Reloads the main UI from the tray's recovery action.</summary>
    public void ReloadWebView() => _webViewRecovery?.Reload();

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
}
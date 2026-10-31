using System.Diagnostics;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
#if WINDOWS_DESKTOP
using Windows.UI.Notifications;
#endif

namespace AntiBot.Services;

/// <summary>
///     Shows a system notification for an automatic action: a Windows toast, or libnotify on Linux.
/// </summary>
/// <remarks>
///     A toast on Windows needs an AppUserModelID the shell knows about; the Start Menu shortcut this
///     app creates carries <see cref="Constants.Name" /> as its id.
/// </remarks>
internal sealed class NotificationService : Singleton<NotificationService>
{
    /// <summary>One notification per user per window, so one block does not fire four toasts.</summary>
    private static readonly TimeSpan Debounce = TimeSpan.FromSeconds(15);

    private readonly Lock _gate = new();
    private readonly Dictionary<string, long> _last = new();

    public void Notify(string key, string title, string message)
    {
        var now = Environment.TickCount64;

        lock (_gate)
        {
            if (_last.TryGetValue(key, out var last) && now - last < Debounce.TotalMilliseconds)
                return;

            _last[key] = now;
        }

        if (OperatingSystem.IsWindows())
            NotifyWindows(title, message);
        else if (OperatingSystem.IsLinux())
            NotifyLinux(title, message);
    }

    private void NotifyWindows(string title, string message)
    {
#if WINDOWS_DESKTOP
        Try.Run(() =>
        {
            var xml = ToastNotificationManager.GetTemplateContent(ToastTemplateType.ToastText02);
            var text = xml.GetElementsByTagName("text");
            text[0].AppendChild(xml.CreateTextNode(title));
            text[1].AppendChild(xml.CreateTextNode(message));

            ToastNotificationManager.CreateToastNotifier(Constants.Name).Show(new ToastNotification(xml));
        }).OnFailure(ex => Log.Warning(ex, "Could not show a Windows toast"));
#endif
    }

    private void NotifyLinux(string title, string message) =>
        Try.Run(() =>
        {
            ProcessStartInfo request = new("notify-send")
            {
                ArgumentList = { "--app-name", Constants.Name, title, message }
            };

            Process.Start(request)?.Dispose();
        }).OnFailure(ex => Log.Debug(ex, "Could not show a Linux notification"));
}

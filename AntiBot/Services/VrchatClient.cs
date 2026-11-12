using System.Diagnostics;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Finds the local VRChat client and closes it. Leaving the instance is the only thing that stops
///     an avatar download in time, and VRChat has no API for that, so this is the fallback.
/// </summary>
internal static class VrchatClient
{
    private static readonly string[] ProcessNames = ["VRChat", "VRChat.exe"];

    /// <summary>The PC VR runtimes, which are only up while a headset is actually in use.</summary>
    private static readonly string[] VrRuntimes = ["vrserver", "vrmonitor", "OVRServer_x64"];

    /// <summary>How long to wait for VRChat to finish quitting before giving up.</summary>
    private static readonly TimeSpan CloseTimeout = TimeSpan.FromSeconds(4);

    /// <summary>Whether a VR runtime is running, which means closing the client would be disruptive.</summary>
    public static bool IsVrActive() => VrRuntimes.Any(IsRunning);

    /// <summary>Whether VRChat is running on this machine.</summary>
    public static bool IsRunning() => ProcessNames.Any(IsRunning);

    /// <summary>
    ///     Asks VRChat to quit normally, which is what makes the client tell the instance it is leaving.
    ///     Killing it would skip that packet, and the account would stay in the instance until VRChat's
    ///     server notices, so a hung client is reported instead of being forced.
    /// </summary>
    public static bool Close()
    {
        var closed = false;

        foreach (var name in ProcessNames)
        {
            Process[] processes;

            try
            {
                processes = Process.GetProcessesByName(name);
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Could not list the {Name} processes", name);
                continue;
            }

            foreach (var process in processes)
                using (process)
                    try
                    {
                        if (process.CloseMainWindow())
                            closed |= process.WaitForExit((int)CloseTimeout.TotalMilliseconds);
                    }
                    catch (Exception ex)
                    {
                        Log.Warning(ex, "Could not close VRChat");
                    }
        }

        if (!closed && IsRunning())
            Log.Warning("VRChat did not quit; it is left running rather than forced, so it can leave cleanly");

        return closed;
    }

    private static bool IsRunning(string name)
    {
        try
        {
            var processes = Process.GetProcessesByName(name);

            foreach (var process in processes)
                process.Dispose();

            return processes.Length > 0;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Could not check for {Name}", name);
            return false;
        }
    }
}
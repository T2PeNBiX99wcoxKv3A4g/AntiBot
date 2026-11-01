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

    /// <summary>Whether a VR runtime is running, which means closing the client would be disruptive.</summary>
    public static bool IsVrActive() => VrRuntimes.Any(IsRunning);

    /// <summary>Whether VRChat is running on this machine.</summary>
    public static bool IsRunning() => ProcessNames.Any(IsRunning);

    /// <summary>Closes VRChat, waiting briefly for a graceful quit before forcing it.</summary>
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
                        process.CloseMainWindow();

                        if (!process.WaitForExit(1500))
                            process.Kill(true);

                        closed = true;
                    }
                    catch (Exception ex)
                    {
                        Log.Warning(ex, "Could not close VRChat");
                    }
        }

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

using System.Net;
using System.Net.Sockets;
using System.Text;
using AntiBot.Models;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Sends VRChat the OSC input it accepts, and reads the log to know whether OSC is listening and
///     which shield level is in use. Safe Mode is the only way to replace a user's avatar without
///     leaving the instance: blocking is server-side and the client does not re-evaluate at once.
/// </summary>
internal sealed class VrchatOscService : Singleton<VrchatOscService>
{
    /// <summary>VRChat listens here unless it was started with <c>--osc=inPort:ip:outPort</c>.</summary>
    private const int DefaultPort = 9000;

    private const string OscLine = "of type OSC on ";
    private const string SafetyLine = "Safety level set to:";

    private readonly UdpClient _udp = new();
    private bool _oscListening;
    private int _port = DefaultPort;
    private bool _safeMode;

    public VrchatOscService()
    {
        // The log says whether OSC is enabled and what the shield level is; nothing else reports it.
        VrchatLogService.Instance.LinesRead += OnLinesRead;
    }

    /// <summary>Whether VRChat advertised an OSC port this session, which means it is listening.</summary>
    public bool IsListening => _oscListening;

    /// <summary>Whether the shield level is the one Safe Mode sets.</summary>
    public bool IsSafeMode => _safeMode;

    /// <summary>
    ///     Presses VRChat's panic button, which turns Safe Mode on and replaces every non-friend avatar
    ///     at once. Does nothing when OSC is off or Safe Mode already looks on, because the button is a
    ///     toggle and a second press would turn it back off.
    /// </summary>
    public bool EnableSafeMode()
    {
        if (!_oscListening || _safeMode)
            return false;

        try
        {
            Send("/input/PanicButton", ",T");
            Send("/input/PanicButton", ",F");
            _safeMode = true;
            Log.Information("Safe Mode requested over OSC on port {Port}", _port);
            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not send the Safe Mode request over OSC");
            return false;
        }
    }

    private void Send(string address, string tags) =>
        _udp.Send(Message(address, tags), new IPEndPoint(IPAddress.Loopback, _port));

    /// <summary>An OSC message with no arguments: the padded address, then the padded type tags.</summary>
    private static byte[] Message(string address, string tags) =>
        [.. Padded(address), .. Padded(tags)];

    private static byte[] Padded(string value)
    {
        var bytes = Encoding.ASCII.GetBytes(value);
        var padded = new byte[(bytes.Length + 4) & ~3];
        bytes.CopyTo(padded, 0);
        return padded;
    }

    private void OnLinesRead(VrchatLogBatch batch)
    {
        foreach (var line in batch.Lines)
        {
            var message = line.Message;

            if (message.Contains(OscLine, StringComparison.Ordinal))
            {
                var port = message[(message.IndexOf(OscLine, StringComparison.Ordinal) + OscLine.Length)..].Trim();
                if (int.TryParse(port, out var value))
                {
                    _port = value;
                    _oscListening = true;
                }
            }
            else if (message.Contains(SafetyLine, StringComparison.Ordinal))
            {
                // Safe Mode is the Maximum shield level; anything else means it was turned off.
                _safeMode = message.TrimEnd().EndsWith("Maximum", StringComparison.Ordinal);
            }
        }
    }
}

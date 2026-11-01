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

    /// <summary>VRChat sends its own OSC here; that is how the current avatar becomes known.</summary>
    private const int DefaultOutPort = 9001;

    private const string OscLine = "of type OSC on ";
    private const string SafetyLine = "Safety level set to:";
    private const string AvatarChange = "/avatar/change";

    private readonly UdpClient _udp = new();
    private readonly UdpClient? _receive;
    private string? _currentAvatar;
    private bool _oscListening;
    private int _port = DefaultPort;
    private bool _safeMode;

    public VrchatOscService()
    {
        // The log says whether OSC is enabled and what the shield level is; nothing else reports it.
        VrchatLogService.Instance.LinesRead += OnLinesRead;

        _receive = TryListen();

        if (_receive is not null)
            _ = Task.Run(ReceiveAsync);
    }

    /// <summary>Whether VRChat advertised an OSC port this session, which means it is listening.</summary>
    public bool IsListening => _oscListening;

    /// <summary>Whether the shield level is the one Safe Mode sets.</summary>
    public bool IsSafeMode => _safeMode;

    /// <summary>The avatar VRChat last reported wearing, or null while it has not said.</summary>
    public string? CurrentAvatar => _currentAvatar;

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

    /// <summary>
    ///     Asks VRChat to wear a different avatar. Only avatars in the favourites, the recents or the
    ///     user's own uploads can be switched to, and VRChat silently ignores anything else.
    /// </summary>
    public bool ChangeAvatar(string? avatarId)
    {
        if (!_oscListening || avatarId is not { Length: > 0 } || !avatarId.StartsWith("avtr_", StringComparison.Ordinal))
            return false;

        // VRChat reports the avatar it loads, so asking for the one already worn would only reload it.
        if (string.Equals(_currentAvatar, avatarId, StringComparison.OrdinalIgnoreCase))
            return false;

        try
        {
            Send("/avatar/change", ",s", avatarId);
            Log.Information("Asked VRChat to switch to {AvatarId} over OSC", avatarId);
            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not send the avatar change over OSC");
            return false;
        }
    }

    /// <summary>Binds the port VRChat sends its OSC to; a busy port only costs the avatar tracking.</summary>
    private UdpClient? TryListen()
    {
        try
        {
            return new UdpClient(new IPEndPoint(IPAddress.Loopback, DefaultOutPort));
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Could not listen for VRChat's OSC output on port {Port}", DefaultOutPort);
            return null;
        }
    }

    private async Task ReceiveAsync()
    {
        while (_receive is not null)
        {
            try
            {
                var packet = await _receive.ReceiveAsync();
                Read(packet.Buffer);
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Stopped reading VRChat's OSC output");
                return;
            }
        }
    }

    private void Read(byte[] data)
    {
        var address = Text(data, 0, out var offset);
        if (address != AvatarChange)
            return;

        var tags = Text(data, offset, out offset);
        if (tags.StartsWith(",s", StringComparison.Ordinal))
            _currentAvatar = Text(data, offset, out _);
    }

    /// <summary>Reads one OSC string: null-terminated ASCII, padded to a multiple of four.</summary>
    private static string Text(byte[] data, int offset, out int next)
    {
        var end = Array.IndexOf(data, (byte)0, offset);
        if (end < 0)
        {
            next = data.Length;
            return "";
        }

        next = (end + 4) & ~3;
        return Encoding.ASCII.GetString(data, offset, end - offset);
    }

    private void Send(string address, string tags, string? argument = null)
    {
        var message = new List<byte>();
        message.AddRange(Padded(address));
        message.AddRange(Padded(tags));

        if (argument is not null)
            message.AddRange(Padded(argument));

        _udp.Send([.. message], new IPEndPoint(IPAddress.Loopback, _port));
    }

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

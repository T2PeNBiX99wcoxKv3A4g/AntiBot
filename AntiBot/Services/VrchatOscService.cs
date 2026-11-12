using System.Net;
using System.Net.Sockets;
using System.Text;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Sends VRChat the OSC input it accepts, and reads the log to know whether OSC is listening. Safe
///     Mode is the only way to replace a user's avatar without leaving the instance: blocking is
///     server-side and the client does not re-evaluate at once.
/// </summary>
internal sealed class VrchatOscService : Singleton<VrchatOscService>
{
    /// <summary>VRChat sends its own OSC here; that is how the current avatar becomes known.</summary>
    private const int DefaultOutPort = 9001;

    private const string OscLine = "of type OSC on ";
    private const string AvatarChange = "/avatar/change";

    private readonly UdpClient _udp = new();
    private readonly UdpClient? _receive;
    private string? _currentAvatar;
    private int _detectedPort;
    private bool _oscListening;

    public VrchatOscService()
    {
        // The log says which port VRChat listens on; nothing else reports it.
        VrchatLogService.Instance.LinesRead += OnLinesRead;
        NativeBridge.MessageReceived += HandleMessageAsync;

        _receive = TryListen();

        if (_receive is not null)
            _ = Task.Run(ReceiveAsync);
    }

    /// <summary>Whether VRChat advertised an OSC port this session, which means it is listening.</summary>
    public bool IsListening => _oscListening;

    /// <summary>The avatar VRChat last reported wearing, or null while it has not said.</summary>
    public string? CurrentAvatar => _currentAvatar;

    /// <summary>The port messages are sent to, as configured; VRChat listens on 9000 by default.</summary>
    public int Port => SettingsService.Instance.Current.OscPort;

    /// <summary>The port VRChat itself advertised in its log, or 0 when it has not said.</summary>
    public int DetectedPort => _detectedPort;

    /// <summary>Whether VRChat's own OSC output is being received, which tells the current avatar.</summary>
    public bool IsReceiving => _receive is not null;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "osc.status" => Task.FromResult<NativeResponse?>(context.Reply("osc.status.result",
            new OscStatusPayload(IsListening, Port, IsReceiving, DetectedPort))),
        "osc.test" => Task.FromResult<NativeResponse?>(TestConnection(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>
    ///     Opens VRChat's Quick Menu, which is a visible sign that the messages arrive. The port from
    ///     the request wins, so the test also works before the field was saved.
    /// </summary>
    private NativeResponse TestConnection(NativeContext context)
    {
        var port = context.Payload<OscTestRequest>()?.Port is > 0 and var requested ? requested : Port;
        var sent = false;

        try
        {
            Send("/input/QuickMenuToggleRight", ",T", null, port);
            Send("/input/QuickMenuToggleRight", ",F", null, port);
            sent = true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not send the OSC test message");
        }

        Log.Information("OSC test on port {Port}: {Sent}", port, sent);
        return context.Reply("osc.test.result",
            new OscTestPayload(sent, IsListening, port, IsReceiving, DetectedPort));
    }

    /// <summary>
    ///     Presses VRChat's panic button, which turns Safe Mode on and replaces every non-friend avatar
    ///     at once. The button only turns it on, so sending it again is harmless; nothing is queued
    ///     because the message never leaves the machine.
    /// </summary>
    public bool EnableSafeMode()
    {
        if (!_oscListening)
            return false;

        try
        {
            Send("/input/PanicButton", ",T");
            Send("/input/PanicButton", ",F");
            Log.Information("Safe Mode requested over OSC on port {Port}", Port);
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
            return new(new IPEndPoint(IPAddress.Loopback, DefaultOutPort));
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

    private void Send(string address, string tags, string? argument = null, int? port = null)
    {
        var message = new List<byte>();
        message.AddRange(Padded(address));
        message.AddRange(Padded(tags));

        if (argument is not null)
            message.AddRange(Padded(argument));

        var target = port ?? Port;
        _udp.Send([.. message], new(IPAddress.Loopback, target));
        Log.Debug("OSC {Address} sent to port {Port} ({Bytes} bytes)", address, target, message.Count);
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
                    _detectedPort = value;
                    _oscListening = true;
                }
            }
        }
    }
}

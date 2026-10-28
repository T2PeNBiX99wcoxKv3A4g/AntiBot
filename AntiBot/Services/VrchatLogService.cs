using System.Diagnostics;
using System.Text;
using System.Text.RegularExpressions;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Follows the newest VRChat output log and streams its new lines to the interface.
///     The file is opened for reading with full sharing, so VRChat keeps writing to it while it is
///     being read, and the newest file is picked up automatically when VRChat starts a new session.
/// </summary>
internal sealed partial class VrchatLogService : Singleton<VrchatLogService>
{
    /// <summary>How much of an existing log is read on attach, so the viewer starts with history.</summary>
    private const int PrefillBytes = 256 * 1024;

    /// <summary>How many lines stay available for a page that mounts later.</summary>
    private const int BufferLimit = 5000;

    private const int ReadBufferSize = 64 * 1024;

    private static readonly TimeSpan PollInterval = TimeSpan.FromMilliseconds(400);
    private static readonly UTF8Encoding Utf8 = new(false);

    private readonly Queue<VrchatLogLine> _buffer = new();
    private readonly char[] _charBuffer = new char[Utf8.GetMaxCharCount(ReadBufferSize)];
    private readonly Decoder _decoder = Utf8.GetDecoder();
    private readonly Lock _gate = new();
    private readonly StringBuilder _pending = new();
    private readonly byte[] _readBuffer = new byte[ReadBufferSize];

    private CancellationTokenSource? _cancellation;

    /// <summary>Set while the first, partial line of a pre-filled log still has to be dropped.</summary>
    private bool _dropPartialLine;

    private string? _file;
    private long _lastId;
    private string? _modifiedAt;
    private bool _started;
    private FileStream? _stream;

    public VrchatLogService() => NativeBridge.MessageReceived += HandleMessageAsync;

    /// <summary>The VRChat log folder, <c>%USERPROFILE%\AppData\LocalLow\VRChat\VRChat</c> on Windows.</summary>
    public static string LogDirectory { get; } = ResolveLogDirectory();

    /// <summary>Starts the polling loop. Calling it more than once has no effect.</summary>
    public void Start()
    {
        CancellationToken token;

        lock (_gate)
        {
            if (_started)
                return;

            _started = true;
            _cancellation = new();
            token = _cancellation.Token;
        }

        Log.Information("Following VRChat logs in {Directory}", LogDirectory);
        _ = Task.Run(() => PollAsync(token), token);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "log.snapshot" => Task.FromResult<NativeResponse?>(context.Reply("log.snapshot.result", Snapshot())),
        "log.openFolder" => Task.FromResult<NativeResponse?>(OpenFolder(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task PollAsync(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            if (Poll() is { } batch)
            {
                Log.Debug("Read {Count} new VRChat log line(s) from {File}", batch.Lines.Count, batch.File);
                WindowManager.Instance.NotifyMainWindow("log.lines", batch);
            }

            try
            {
                await Task.Delay(PollInterval, token);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }

    /// <summary>Reads whatever was appended since the last poll; null when nothing changed.</summary>
    private VrchatLogBatch? Poll()
    {
        lock (_gate)
        {
            var newest = FindNewestLog();

            if (newest is null)
            {
                if (_file is null)
                    return null;

                Log.Information("No VRChat log is present any more");

                // Tell the viewer to go back to its "waiting for VRChat" state.
                Detach();
                return new(null, null, true, []);
            }

            var reset = !string.Equals(newest, _file, StringComparison.OrdinalIgnoreCase);
            if (reset && !Attach(newest))
                return null;

            _modifiedAt = Try.Run(() => File.GetLastWriteTimeUtc(newest).ToString("O")).GetOrNull()
                          ?? _modifiedAt;

            var lines = ReadNewLines();

            return reset || lines.Count > 0
                ? new VrchatLogBatch(_file, _modifiedAt, reset, lines)
                : null;
        }
    }

    /// <summary>
    ///     The newest log VRChat has written. Sessions are usually named by their start date, but the
    ///     write time is what really tells a live log from an old one.
    /// </summary>
    private string? FindNewestLog() =>
        Try.Run(() => Directory.Exists(LogDirectory)
                ? Directory.EnumerateFiles(LogDirectory, "output_log*.txt")
                    .Select(path => new FileInfo(path))
                    .MaxBy(info => info.LastWriteTimeUtc)?.FullName
                : null)
            .OnFailure(ex => Log.Debug(ex, "Failed to list {Directory}", LogDirectory))
            .GetOrNull();

    /// <summary>Opens a log for reading without claiming it exclusively. The tail is loaded on attach.</summary>
    private bool Attach(string path)
    {
        Detach();

        var attempt = Try.Run(() =>
        {
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read,
                FileShare.ReadWrite | FileShare.Delete, 16 * 1024, FileOptions.SequentialScan);
            _stream = stream;

            // Start near the end, so attaching to a long log does not send megabytes to the page.
            _dropPartialLine = stream.Length > PrefillBytes;
            stream.Seek(Math.Max(0, stream.Length - PrefillBytes), SeekOrigin.Begin);

            _file = path;
            _modifiedAt = File.GetLastWriteTimeUtc(path).ToString("O");
            Log.Information("Attached to VRChat log {File}", path);
            return true;
        }).OnFailure(ex => Log.Warning(ex, "Failed to read VRChat log {File}", path));

        if (attempt.IsSuccess)
            return true;

        Detach();
        return false;
    }

    /// <summary>Reads every byte appended since the last read. Callers must hold the gate.</summary>
    private List<VrchatLogLine> ReadNewLines()
    {
        var lines = new List<VrchatLogLine>();

        if (_stream is not { } stream)
            return lines;

        // A log that shrank was recreated, so follow the new content from the beginning.
        if (stream.Position > Try.Run(() => stream.Length).GetOrNull())
        {
            Try.Run(() => stream.Seek(0, SeekOrigin.Begin));
            _decoder.Reset();
            _pending.Clear();
            _dropPartialLine = false;
            Log.Information("VRChat log was truncated; reading it again from the start");
        }

        while (true)
        {
            var read = Try.Run(() => stream.Read(_readBuffer, 0, _readBuffer.Length)).GetOrNull();
            if (read <= 0)
                break;

            var decoded = _decoder.GetChars(_readBuffer, 0, read, _charBuffer, 0);
            Append(decoded, lines);
        }

        return lines;
    }

    /// <summary>Splits decoded characters on newlines, holding back a line that is not finished yet.</summary>
    private void Append(int count, List<VrchatLogLine> lines)
    {
        var start = 0;

        while (start < count)
        {
            if (_dropPartialLine)
            {
                // The pre-fill started in the middle of a line; everything up to the first newline is
                // the remainder of a line that belongs to a part of the log the viewer never saw.
                var newline = Array.IndexOf(_charBuffer, '\n', start, count - start);
                if (newline < 0)
                    return;

                _dropPartialLine = false;
                start = newline + 1;
                continue;
            }

            var end = Array.IndexOf(_charBuffer, '\n', start, count - start);
            if (end < 0)
            {
                _pending.Append(_charBuffer, start, count - start);
                return;
            }

            _pending.Append(_charBuffer, start, end - start);
            start = end + 1;

            var text = _pending.ToString().TrimEnd('\r');
            _pending.Clear();

            var line = Parse(text);
            lines.Add(line);

            _buffer.Enqueue(line);
            if (_buffer.Count > BufferLimit)
                _buffer.Dequeue();
        }
    }

    private VrchatLogLine Parse(string text)
    {
        var match = LinePattern().Match(text);

        return match.Success
            ? new(++_lastId, match.Groups["time"].Value, match.Groups["level"].Value.ToLowerInvariant(),
                match.Groups["message"].Value)
            : new(++_lastId, "", "", text);
    }

    private void Detach()
    {
        if (_stream is { } stream)
            Try.Run(stream.Dispose).OnFailure(ex => Log.Debug(ex, "Failed to close the VRChat log"));

        _stream = null;
        _file = null;
        _modifiedAt = null;
        _buffer.Clear();
        _pending.Clear();
        _decoder.Reset();
        _dropPartialLine = false;
    }

    private VrchatLogSnapshot Snapshot()
    {
        lock (_gate)
            return new(LogDirectory, Directory.Exists(LogDirectory), _file, _modifiedAt, _buffer.ToArray());
    }

    private NativeResponse OpenFolder(NativeContext context)
    {
        if (!Directory.Exists(LogDirectory))
            return context.Fail("log.openFolder.result", "error.logDirectoryMissing");

        ProcessStartInfo request = OperatingSystem.IsWindows()
            ? new("explorer.exe", LogDirectory)
            : new("xdg-open", LogDirectory);

        return Try.Run(() => Process.Start(request) is not null)
            .OnFailure(ex => Log.Warning(ex, "Failed to open {Directory}", LogDirectory))
            ? context.Reply("log.openFolder.result", new OkPayload())
            : context.Fail("log.openFolder.result", "error.openFolder");
    }

    private static string ResolveLogDirectory()
    {
        if (Environment.GetEnvironmentVariable("ANTIBOT_VRCHAT_LOG_DIR") is { Length: > 0 } custom)
            return custom;

        // LocalLow sits beside Local; there is no SpecialFolder for it.
        var local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
            .TrimEnd(Path.DirectorySeparatorChar);
        var localLow = Path.Combine(Path.GetDirectoryName(local) ?? local, "LocalLow", "VRChat", "VRChat");

        if (!OperatingSystem.IsLinux() || Directory.Exists(localLow))
            return localLow;

        // VRChat runs under Proton on Linux, which keeps the game inside a Steam prefix.
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var prefixes = new[]
        {
            Path.Combine(home, ".steam", "steam", "steamapps", "compatdata", "438100", "pfx"),
            Path.Combine(home, ".local", "share", "Steam", "steamapps", "compatdata", "438100", "pfx")
        };

        return prefixes
            .Select(prefix => Path.Combine(prefix, "drive_c", "users", "steamuser",
                "AppData", "LocalLow", "VRChat", "VRChat"))
            .FirstOrDefault(Directory.Exists) ?? localLow;
    }

    [GeneratedRegex(
        @"^\d{4}\.\d{2}\.\d{2} (?<time>\d{2}:\d{2}:\d{2}) (?<level>Trace|Debug|Info|Warning|Error|Fatal)\s+-\s{0,2}(?<message>.*)$")]
    private static partial Regex LinePattern();
}

using System.Diagnostics;
using System.Text;
using System.Text.RegularExpressions;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Streams VRChat's log to the interface while VRChat runs. No log is opened at all while VRChat is
///     not running; once it starts, the newest log in the configured folder is followed, opened for
///     reading with full sharing so VRChat keeps writing to it.
/// </summary>
internal sealed partial class VrchatLogService : Singleton<VrchatLogService>
{
    /// <summary>How many lines stay available for a page that mounts later.</summary>
    private const int BufferLimit = 5000;

    private const int ReadBufferSize = 64 * 1024;

    private static readonly TimeSpan PollInterval = TimeSpan.FromMilliseconds(400);
    private static readonly TimeSpan ProcessCheckInterval = TimeSpan.FromSeconds(1);
    private static readonly UTF8Encoding Utf8 = new(false);
    private static readonly string[] VrchatProcessNames = ["VRChat", "VRChat.exe"];

    private readonly Queue<VrchatLogLine> _buffer = new();
    private readonly char[] _charBuffer = new char[Utf8.GetMaxCharCount(ReadBufferSize)];
    private readonly Decoder _decoder = Utf8.GetDecoder();
    private readonly Lock _gate = new();
    private readonly StringBuilder _pending = new();
    private readonly byte[] _readBuffer = new byte[ReadBufferSize];

    private CancellationTokenSource? _cancellation;
    private string? _directory;

    private string? _file;

    /// <summary>The file and byte offset last read, kept after closing so it is never read twice.</summary>
    private string? _lastFile;

    private long _lastId;
    private long _lastPosition;
    private long _processCheckedAt;

    private bool _processRunning;

    /// <summary>Last state the viewer was told about, so a start or stop is pushed exactly once.</summary>
    private volatile bool _running;

    private bool _started;
    private FileStream? _stream;

    public VrchatLogService() => NativeBridge.MessageReceived += HandleMessageAsync;

    /// <summary>
    ///     Raised for every batch, including state-only ones, so local parsers see the same stream the
    ///     viewer does (including the new-session divider and VRChat shutting down).
    /// </summary>
    public event Action<VrchatLogBatch>? LinesRead;

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

        Log.Information("Watching for VRChat; its newest log is followed while it runs");
        _ = Task.Run(() => PollAsync(token), token);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "log.snapshot" => Task.FromResult<NativeResponse?>(context.Reply("log.snapshot.result", Snapshot())),
        "log.export" => ExportAsync(context),
        "log.openFolder" => Task.FromResult<NativeResponse?>(OpenFolder(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task PollAsync(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            if (await PollOnceAsync(token) is { } batch)
            {
                Try.Run(() => LinesRead?.Invoke(batch))
                    .OnFailure(ex => Log.Warning(ex, "A log line handler failed"));

                Log.Debug("Read {Count} new VRChat log line(s)", batch.Lines.Count);

                // The parsers need every line, but a page that just mounted only needs the tail.
                var visible = batch.Lines.Count > BufferLimit
                    ? batch with
                    {
                        Lines = [.. batch.Lines.Skip(batch.Lines.Count - BufferLimit)]
                    }
                    : batch;

                WindowManager.Instance.NotifyMainWindow("log.lines", visible);
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
    private async Task<VrchatLogBatch?> PollOnceAsync(CancellationToken token)
    {
        var directory = SettingsService.Instance.LogDirectory;
        var directoryChanged = _directory is not null &&
                               !string.Equals(directory, _directory, StringComparison.OrdinalIgnoreCase);

        if (directoryChanged)
        {
            Log.Information("Log folder changed to {Directory}", directory);
            Reset();
        }

        _directory = directory;

        var running = IsVrchatRunning();
        var reset = directoryChanged;
        var stateChanged = directoryChanged;

        if (running != _running)
        {
            Log.Information(running
                ? "VRChat started; following its log"
                : "VRChat stopped; keeping the log on screen");
            _running = running;
            stateChanged = true;
        }

        // Nothing is opened or read while VRChat is not running.
        if (!running)
        {
            if (_file is not null)
                CloseFile();

            return reset || stateChanged ? State(directory, reset, []) : null;
        }

        var newest = FindNewestLog(directory);

        if (newest is null)
        {
            if (_file is not null)
            {
                Reset();
                reset = true;
            }

            return reset || stateChanged ? State(directory, reset, []) : null;
        }

        if (!string.Equals(newest, _file, StringComparison.OrdinalIgnoreCase))
        {
            var switched = new List<VrchatLogLine>();

            // Resuming the same file (VRChat relaunched without a new log) continues where it stopped;
            // a different file is a new session, marked off from what is still on screen.
            var resumed = string.Equals(newest, _lastFile, StringComparison.OrdinalIgnoreCase);
            if (!resumed && !reset && HasBufferedLines())
                switched.Add(CreateDivider());

            if (!Attach(newest, resumed ? _lastPosition : null))
                return null;

            switched.AddRange(await ReadNewLinesAsync(token));

            return State(directory, reset, switched);
        }

        var lines = await ReadNewLinesAsync(token);

        return reset || stateChanged || lines.Count > 0
            ? State(directory, reset, lines)
            : null;
    }

    /// <summary>
    ///     The newest log VRChat has written. Sessions are usually named by their start date, but the
    ///     write time is what really tells a live log from an old one.
    /// </summary>
    private string? FindNewestLog(string directory) =>
        Try.Run(() => Directory.Exists(directory)
                ? Directory.EnumerateFiles(directory, "output_log*.txt")
                    .Select(path => new FileInfo(path))
                    .MaxBy(info => info.LastWriteTimeUtc)?.FullName
                : null)
            .OnFailure(ex => Log.Debug(ex, "Failed to list {Directory}", directory))
            .GetOrNull();

    /// <summary>
    ///     Opens a log for reading without claiming it exclusively. The whole session is read from the
    ///     start, because the player list needs the join lines of people who were already in the instance,
    ///     which can be hours back in the file.
    /// </summary>
    private bool Attach(string path, long? resumeAt = null)
    {
        CloseFile();

        var attempt = Try.Run(() =>
        {
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read,
                FileShare.ReadWrite | FileShare.Delete, 16 * 1024, FileOptions.SequentialScan);
            _stream = stream;

            stream.Seek(resumeAt is { } position && position <= stream.Length ? position : 0, SeekOrigin.Begin);

            _file = path;
            Log.Information("Attached to VRChat log {File}", path);
            return true;
        }).OnFailure(ex => Log.Warning(ex, "Failed to read VRChat log {File}", path));

        if (attempt.IsSuccess)
            return true;

        CloseFile();
        return false;
    }

    /// <summary>Reads every byte appended since the last read, yielding the thread while it waits.</summary>
    private async Task<List<VrchatLogLine>> ReadNewLinesAsync(CancellationToken token)
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
            Log.Information("VRChat log was truncated; reading it again from the start");
        }

        while (!token.IsCancellationRequested)
        {
            var attempt = await Try.Run(() =>
                stream.ReadAsync(_readBuffer, 0, _readBuffer.Length, token));

            if (!attempt.IsSuccess)
            {
                Log.Debug(attempt.Exception, "Failed to read the VRChat log");
                break;
            }

            if (attempt.Value <= 0)
                break;

            var decoded = _decoder.GetChars(_readBuffer, 0, attempt.Value, _charBuffer, 0);
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

            lines.Add(Parse(text));
        }
    }

    private VrchatLogLine Parse(string text)
    {
        var match = LinePattern().Match(text);

        return match.Success
            ? new(++_lastId, match.Groups["time"].Value, match.Groups["level"].Value.ToLowerInvariant(),
                match.Groups["message"].Value)
            {
                Raw = text
            }
            : new(++_lastId, "", "", text)
            {
                Raw = text
            };
    }

    /// <summary>Marks where one session log ends and the next begins; the viewer draws it as a rule.</summary>
    private VrchatLogLine CreateDivider() => new(++_lastId, "", "session", "");

    /// <summary>Closes the log and drops the unfinished line, keeping the lines already read.</summary>
    private void CloseFile()
    {
        if (_stream is { } stream)
        {
            _lastPosition = Try.Run(() => stream.Position).GetOrNull();
            _lastFile = _file;
            Try.Run(stream.Dispose).OnFailure(ex => Log.Debug(ex, "Failed to close the VRChat log"));
        }

        _stream = null;
        _file = null;
        _pending.Clear();
        _decoder.Reset();
    }

    /// <summary>Closes the log and forgets everything read from it, e.g. when the folder changes.</summary>
    private void Reset()
    {
        CloseFile();

        lock (_gate)
            _buffer.Clear();

        _lastFile = null;
        _lastPosition = 0;
    }

    private VrchatLogSnapshot Snapshot()
    {
        var directory = SettingsService.Instance.LogDirectory;

        lock (_gate)
            return new(Directory.Exists(directory), _running, [.. _buffer]);
    }

    private VrchatLogBatch State(string directory, bool reset, List<VrchatLogLine> lines)
    {
        Commit(lines);
        return new(Directory.Exists(directory), _running, reset, lines);
    }

    /// <summary>Adds a finished batch to what a page mounting later receives. Never held during I/O.</summary>
    private void Commit(List<VrchatLogLine> lines)
    {
        if (lines.Count == 0)
            return;

        lock (_gate)
            foreach (var line in lines)
            {
                _buffer.Enqueue(line);
                if (_buffer.Count > BufferLimit)
                    _buffer.Dequeue();
            }
    }

    private bool HasBufferedLines()
    {
        lock (_gate)
            return _buffer.Count > 0;
    }

    private NativeResponse OpenFolder(NativeContext context)
    {
        var directory = SettingsService.Instance.LogDirectory;

        if (!Directory.Exists(directory))
            return context.Fail("log.openFolder.result", Localization.Get("error.logDirectoryMissing"));

        ProcessStartInfo request = OperatingSystem.IsWindows()
            ? new("explorer.exe", directory)
            : new("xdg-open", directory);

        return Try.Run(() => Process.Start(request) is not null)
            .OnFailure(ex => Log.Warning(ex, "Failed to open {Directory}", directory))
            ? context.Reply("log.openFolder.result", new OkPayload())
            : context.Fail("log.openFolder.result", Localization.Get("error.openFolder"));
    }

    /// <summary>Writes every line read so far, in its original form, to a new file in Downloads.</summary>
    private async Task<NativeResponse?> ExportAsync(NativeContext context)
    {
        string[] lines;

        lock (_gate)
            lines = [.. _buffer.Where(line => line.Raw.Length > 0).Select(line => line.Raw)];

        if (lines.Length == 0)
            return context.Fail("log.export.result", Localization.Get("error.noLog"));

        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var downloads = Path.Combine(home, "Downloads");
        var folder = Directory.Exists(downloads) ? downloads : home;
        var path = Path.Combine(folder, $"antibot-vrchat-{DateTime.Now:yyyyMMdd-HHmmss}.log");

        var attempt = await Try.Run(() => File.WriteAllLinesAsync(path, lines));
        if (!attempt.IsSuccess)
        {
            Log.Warning(attempt.Exception, "Failed to export the log to {Path}", path);
            return context.Fail("log.export.result",
                attempt.Exception?.Message ?? Localization.Get("error.export"));
        }

        Log.Information("Exported {Count} log line(s) to {Path}", lines.Length, path);
        return context.Reply("log.export.result", new LogExportPayload(true, lines.Length, path));
    }

    /// <summary>Whether VRChat's process exists. Checked at most once a second.</summary>
    private bool IsVrchatRunning()
    {
        var now = Environment.TickCount64;
        if (now - _processCheckedAt < ProcessCheckInterval.TotalMilliseconds)
            return _processRunning;

        _processCheckedAt = now;
        _processRunning = Try.Run(() => VrchatProcessNames.Any(IsProcessRunning))
            .OnFailure(ex => Log.Debug(ex, "Failed to check whether VRChat is running"))
            .GetOrNull();

        return _processRunning;
    }

    private static bool IsProcessRunning(string name)
    {
        var processes = Process.GetProcessesByName(name);

        foreach (var process in processes)
            process.Dispose();

        return processes.Length > 0;
    }

    [GeneratedRegex(
        @"^\d{4}\.\d{2}\.\d{2} (?<time>\d{2}:\d{2}:\d{2}) (?<level>Trace|Debug|Info|Warning|Error|Fatal)\s+-\s{0,2}(?<message>.*)$")]
    private static partial Regex LinePattern();
}
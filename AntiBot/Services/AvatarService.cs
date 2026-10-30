using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Channels;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Tells which avatar a player is wearing: the default Robot avatar is recognised from its image file
///     id, and any other avatar's name is looked up in an external database by the same id.
/// </summary>
/// <remarks>
///     <para>
///         The Robot check needs no network at all: VRChat serves the default avatar from a fixed file, so
///         comparing the file id in <c>currentAvatarImageUrl</c> is exact.
///     </para>
///     <para>
///         Names come from the same provider VRCX uses. That call is best effort — the provider is behind
///         Cloudflare and can refuse a client — so a failure only leaves the name unknown, and the avatar
///         is still identified as Robot or not.
///     </para>
/// </remarks>
internal sealed partial class AvatarService : Singleton<AvatarService>
{
    /// <summary>The image file VRChat uses for its default Robot avatar.</summary>
    private const string RobotFileId = "file_0e8c4e32-7444-44ea-ade4-313c010d4bae";

    private const string Provider = "https://api.avtrdb.com/v3/avatar/search/vrcx";

    private static readonly TimeSpan RequestInterval = TimeSpan.FromSeconds(1);

    private readonly HttpClient _http = new()
    {
        Timeout = TimeSpan.FromSeconds(5)
    };

    private readonly ConcurrentDictionary<string, string> _names = new();
    private readonly ConcurrentDictionary<string, byte> _pending = new();
    private readonly Channel<string> _queue = Channel.CreateUnbounded<string>();
    private readonly CancellationTokenSource _stop = new();
    private readonly ConcurrentDictionary<string, byte> _unknown = new();

    /// <summary>Raised when an avatar name arrived, so the list can redraw with it.</summary>
    public event Action? Updated;

    /// <summary>Loads the cache and starts the lookup worker. Called once, after the database exists.</summary>
    public void Start()
    {
        foreach (var (fileId, name) in Database.Instance.LoadAvatars())
            _names[fileId] = name;

        _ = Task.Run(() => RunAsync(_stop.Token));
    }

    /// <summary>The <c>file_…</c> id in an avatar image URL, or null when there is none.</summary>
    public static string? FileIdOf(string? url)
    {
        if (string.IsNullOrEmpty(url))
            return null;

        var match = FileIdPattern().Match(url);
        return match.Success ? match.Value : null;
    }

    /// <summary>Whether the avatar is VRChat's default Robot avatar.</summary>
    public static bool IsRobot(string? fileId) =>
        string.Equals(fileId, RobotFileId, StringComparison.OrdinalIgnoreCase);

    /// <summary>The known avatar name, or null while it is unknown.</summary>
    public string? NameFor(string? fileId)
    {
        if (fileId is null)
            return null;

        return IsRobot(fileId) ? "Robot (default)" : _names.GetValueOrDefault(fileId);
    }

    /// <summary>Asks for a name unless it is known, already asked for, or known to be unavailable.</summary>
    public void Request(string? fileId)
    {
        if (fileId is null || IsRobot(fileId))
            return;

        if (_names.ContainsKey(fileId) || _unknown.ContainsKey(fileId) || !_pending.TryAdd(fileId, 0))
            return;

        _queue.Writer.TryWrite(fileId);
    }

    private async Task RunAsync(CancellationToken token)
    {
        try
        {
            while (await _queue.Reader.WaitToReadAsync(token))
                while (_queue.Reader.TryRead(out var fileId))
                {
                    _pending.TryRemove(fileId, out _);
                    await LookupAsync(fileId, token);
                    await Task.Delay(RequestInterval, token);
                }
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Avatar lookups stopped");
        }
    }

    private async Task LookupAsync(string fileId, CancellationToken token)
    {
        var attempt = await Try.Run(async () =>
        {
            using var response = await _http.GetAsync($"{Provider}?fileId={Uri.EscapeDataString(fileId)}", token);
            if (!response.IsSuccessStatusCode)
                return null;

            var body = await response.Content.ReadAsStringAsync(token);
            return JsonSerializer.Deserialize(body, VrchatJsonContext.Default.AvatarLookup);
        });

        var avatar = attempt
            .OnFailure(ex => Log.Debug(ex, "Avatar lookup for {FileId} failed", fileId))
            .GetOrNull();

        if (avatar?.Name is not { Length: > 0 } name)
        {
            // The provider refused or does not know it; do not ask again this session.
            _unknown[fileId] = 0;
            return;
        }

        _names[fileId] = name;
        await Database.Instance.SaveAvatarAsync(fileId, avatar.Id ?? "", name, token);
        Updated?.Invoke();
    }

    [GeneratedRegex(@"file_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        RegexOptions.CultureInvariant)]
    private static partial Regex FileIdPattern();
}

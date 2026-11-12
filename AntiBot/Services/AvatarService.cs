using System.Collections.Concurrent;
using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;
using AntiBot.Models;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Tells which avatar a player is wearing: the default Robot avatar is recognised from its image file
///     id, and any other avatar's name is looked up from VRChat's file name or an external database.
/// </summary>
/// <remarks>
///     Lookups are not queued: a request starts immediately, callers for the same file share one task,
///     and the providers are asked in parallel. That keeps a joining player's row from waiting behind
///     everyone else. A name is only remembered when one was really found.
/// </remarks>
[Singleton]
internal partial class AvatarService
{
    /// <summary>The image file VRChat uses for its default Robot avatar.</summary>
    private const string RobotFileId = "file_0e8c4e32-7444-44ea-ade4-313c010d4bae";

    private readonly HttpClient _http = new()
    {
        Timeout = TimeSpan.FromSeconds(5)
    };

    private readonly ConcurrentDictionary<string, Lazy<Task<string?>>> _inFlight = new();
    private readonly ConcurrentDictionary<string, string> _names = new();
    private readonly ConcurrentDictionary<string, byte> _unknown = new();

    /// <summary>Loads the cache. Called once, after the database exists.</summary>
    public void Start()
    {
        foreach (var (fileId, name) in Database.Instance.LoadAvatars())
            if (name.Length > 0)
                _names[fileId] = name;
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

    /// <summary>Whether the lookup for this file finished, successfully or with "no provider knew it".</summary>
    public bool IsResolved(string? fileId) =>
        fileId is null || IsRobot(fileId) || _names.ContainsKey(fileId) || _unknown.ContainsKey(fileId);

    /// <summary>
    ///     The avatar's name, or null while it is unknown. The first call starts the lookup; later calls
    ///     for the same file wait for it instead of starting another.
    /// </summary>
    public async Task<string?> ResolveAsync(string? fileId, CancellationToken token = default)
    {
        if (fileId is null)
            return null;

        if (IsRobot(fileId))
            return "Robot (default)";

        if (_names.TryGetValue(fileId, out var known))
            return known;

        if (_unknown.ContainsKey(fileId))
            return null;

        var lazy = _inFlight.GetOrAdd(fileId,
            id => new(() => LookupAsync(id, token), LazyThreadSafetyMode.ExecutionAndPublication));

        return await lazy.Value;
    }

    /// <summary>Lets names that no provider knew be asked for again, e.g. after the list changed.</summary>
    public void ResetUnknown() => _unknown.Clear();

    private async Task<string?> LookupAsync(string fileId, CancellationToken token)
    {
        try
        {
            var name = await ResolveCoreAsync(fileId, token);
            if (name is not { Length: > 0 })
            {
                // No source knew it; do not ask again this session, but never cache the empty answer.
                _unknown[fileId] = 0;
                return null;
            }

            _names[fileId] = name;
            await Database.Instance.SaveAvatarAsync(fileId, "", name, token);
            return name;
        }
        catch (OperationCanceledException)
        {
            return null;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Avatar lookup for {FileId} failed", fileId);
            return null;
        }
        finally
        {
            _inFlight.TryRemove(fileId, out _);
        }
    }

    private async Task<string?> ResolveCoreAsync(string fileId, CancellationToken token)
    {
        // The first-party way: an avatar image is named "Avatar - <name> - Image - <date>". A file
        // tagged "icon" is a custom user icon instead, which carries no avatar information.
        var (file, status) = await AuthService.Instance.GetFileAsync(fileId, token);

        if (status == HttpStatusCode.OK)
        {
            if (file?.Tags?.Contains("icon") == true)
                return null;

            if (AvatarNameFrom(file?.Name) is { Length: > 0 } fileName)
                return fileName;
        }
        else if (status is HttpStatusCode.NotFound or HttpStatusCode.Forbidden)
            return null;

        // Then the external databases, all at once.
        var lookups = SettingsService.Instance.Current.AvatarApiProviders
            .Select(provider => LookupFrom(provider, fileId, token));

        foreach (var avatar in await Task.WhenAll(lookups))
            if (avatar?.ResolvedName is { Length: > 0 } name)
                return name;

        return null;
    }

    /// <summary>Pulls the avatar name out of a file name such as <c>Avatar - Robot - Image - 2024.01.01</c>.</summary>
    private static string? AvatarNameFrom(string? fileName)
    {
        if (string.IsNullOrEmpty(fileName))
            return null;

        var match = AvatarFileNamePattern().Match(fileName);
        return match.Success ? match.Groups["name"].Value.Trim() : null;
    }

    private async Task<AvatarLookup?> LookupFrom(string provider, string fileId, CancellationToken token)
    {
        var attempt = await Try.Run(async () =>
        {
            var separator = provider.Contains('?') ? '&' : '?';
            using var response = await _http.GetAsync(
                $"{provider}{separator}fileId={Uri.EscapeDataString(fileId)}", token);

            if (!response.IsSuccessStatusCode)
                return null;

            var body = await response.Content.ReadAsStringAsync(token);
            return JsonSerializer.Deserialize(body, VrchatJsonContext.Default.AvatarLookup);
        });

        return attempt
            .OnFailure(ex => Log.Debug(ex, "Avatar lookup at {Provider} failed", provider))
            .GetOrNull();
    }

    [GeneratedRegex(@"file_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        RegexOptions.CultureInvariant)]
    private static partial Regex FileIdPattern();

    [GeneratedRegex(@"Avatar - (?<name>.*) - Image -", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex AvatarFileNamePattern();
}
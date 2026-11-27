using System.Net.Http.Headers;
using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;

namespace AntiBot.Services;

/// <summary>
///     Downloads the shared bot list on startup and every six hours, keeps the last good copy on
///     disk, and hands the list to the automatic actions. A failed refresh never clears the list.
/// </summary>
[Singleton]
internal partial class CommunityService
{
    private const string ListUrl =
        "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/AntiBot/master/data/community-bots.json";

    private static readonly TimeSpan RefreshInterval = TimeSpan.FromHours(6);

    private static readonly HttpClient Http = CreateClient();

    private readonly SemaphoreSlim _fetchGate = new(1, 1);
    private readonly Lock _gate = new();
    private readonly CancellationTokenSource _stop = new();
    private Dictionary<string, CommunityBot> _byId = new(StringComparer.OrdinalIgnoreCase);
    private CommunitySnapshot _snapshot = new("", []);

    private CommunityService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;

        LoadCache();
        _ = RefreshAsync(_stop.Token);
        _ = LoopAsync(_stop.Token);
    }

    /// <summary>Raised after a refresh changed the list, so the actions can sweep again.</summary>
    public event Action? Changed;

    /// <summary>The entry for a user, or null when the list is off or does not contain them.</summary>
    public CommunityBot? Get(string userId)
    {
        lock (_gate)
            return _byId.GetValueOrDefault(userId);
    }

    /// <summary>The rows the Community page shows.</summary>
    internal CommunitySnapshot DataSnapshot
    {
        get
        {
            lock (_gate)
                return _snapshot;
        }
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type switch
        {
            "community.refresh" => RefreshMessageAsync(context),
            "community.saveSubmission" => SaveSubmissionAsync(context),
            "community.openDownloads" => Task.FromResult<NativeResponse?>(OpenDownloads(context)),
            _ => Task.FromResult<NativeResponse?>(null)
        };

    private async Task<NativeResponse?> RefreshMessageAsync(NativeContext context)
    {
        var refreshed = await RefreshAsync(_stop.Token);

        return refreshed
            ? context.Reply("community.refresh.result", new OkPayload())
            : context.Fail("community.refresh.result", Localization.Get("error.community_list"));
    }

    /// <summary>Writes the submission JSON to Downloads so the user can attach it to the issue.</summary>
    private static async Task<NativeResponse?> SaveSubmissionAsync(NativeContext context)
    {
        var json = context.Payload<CommunitySubmissionRequest>()?.Json;
        if (string.IsNullOrWhiteSpace(json) || json.Length > 1_000_000)
            return context.Fail("community.saveSubmission.result", Localization.Get("error.community_save"));

        var path = Path.Combine(DownloadsFolder(), $"antibot-community-{DateTime.Now:yyyyMMdd-HHmmss}.json");
        var attempt = await Try.Run(() => File.WriteAllTextAsync(path, json));

        return attempt.IsSuccess
            ? context.Reply("community.saveSubmission.result", new CommunitySubmissionPayload(true, path))
            : context.Fail("community.saveSubmission.result", Localization.Get("error.community_save"));
    }

    private static NativeResponse OpenDownloads(NativeContext context)
    {
        var attempt = Try.Run(() => SystemLauncher.Open(DownloadsFolder()));

        return attempt.IsSuccess
            ? context.Reply("community.openDownloads.result", new OkPayload())
            : context.Fail("community.openDownloads.result", Localization.Get("error.open_folder"));
    }

    private static string DownloadsFolder()
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var downloads = Path.Combine(home, "Downloads");
        return Directory.Exists(downloads) ? downloads : home;
    }

    private async Task LoopAsync(CancellationToken token)
    {
        using var timer = new PeriodicTimer(RefreshInterval);

        try
        {
            while (await timer.WaitForNextTickAsync(token))
                await RefreshAsync(token);
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
    }

    private async Task<bool> RefreshAsync(CancellationToken token)
    {
        await _fetchGate.WaitAsync(token);

        try
        {
            using var response = await Http.GetAsync(ListUrl, token);
            if (!response.IsSuccessStatusCode)
            {
                Log.Warning("Community list refresh answered {Status}", response.StatusCode);
                return false;
            }

            var text = await response.Content.ReadAsStringAsync(token);
            var snapshot = Parse(text);
            if (snapshot is null)
            {
                Log.Warning("Community list refresh returned an invalid document");
                return false;
            }

            lock (_gate)
            {
                _snapshot = snapshot;
                _byId = snapshot.Bots.ToDictionary(bot => bot.UserId, StringComparer.OrdinalIgnoreCase);
            }

            await SaveCacheAsync(text, token);
            Log.Information("Community list: {Count} bot(s), updated {UpdatedAt}",
                snapshot.Bots.Count, snapshot.UpdatedAt);

            Changed?.Invoke();
            WindowManager.Instance.NotifyMainWindowSoon("community.changed");
            return true;
        }
        catch (OperationCanceledException)
        {
            return false;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not refresh the community list");
            return false;
        }
        finally
        {
            _fetchGate.Release();
        }
    }

    private void LoadCache()
    {
        try
        {
            if (!File.Exists(CachePath))
                return;

            var snapshot = Parse(File.ReadAllText(CachePath));
            if (snapshot is null)
                return;

            lock (_gate)
            {
                _snapshot = snapshot;
                _byId = snapshot.Bots.ToDictionary(bot => bot.UserId, StringComparer.OrdinalIgnoreCase);
            }

            Log.Information("Community list cache: {Count} bot(s)", snapshot.Bots.Count);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the community list cache");
        }
    }

    private static async Task SaveCacheAsync(string text, CancellationToken token)
    {
        try
        {
            await File.WriteAllTextAsync(CachePath, text, token);
        }
        catch (Exception ex)
        {
            Constants.Logger.Debug(ex, "Could not cache the community list");
        }
    }

    private static CommunitySnapshot? Parse(string text)
    {
        try
        {
            using var document = JsonDocument.Parse(text);
            var root = document.RootElement;

            if (!root.TryGetProperty("bots", out var rows) || rows.ValueKind != JsonValueKind.Array)
                return null;

            var updatedAt = root.TryGetProperty("updatedAt", out var updated) &&
                            updated.ValueKind == JsonValueKind.String
                ? updated.GetString() ?? ""
                : "";

            var byId = new Dictionary<string, CommunityBot>(StringComparer.OrdinalIgnoreCase);

            foreach (var row in rows.EnumerateArray())
            {
                var bot = ParseBot(row);
                if (bot is null)
                    continue;

                if (!byId.TryGetValue(bot.UserId, out var previous) || bot.Threat >= previous.Threat)
                    byId[bot.UserId] = bot;
            }

            var bots = byId.Values
                .OrderByDescending(bot => bot.LastSeen ?? "", StringComparer.Ordinal)
                .ToArray();

            return new CommunitySnapshot(updatedAt, bots);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private static CommunityBot? ParseBot(JsonElement row)
    {
        if (row.ValueKind != JsonValueKind.Object)
            return null;

        var userId = Text(row, "userId");
        if (userId is not { Length: > 0 } || !UserIdPattern().IsMatch(userId))
            return null;

        var threat = Number(row, "threat");
        if (threat < 0)
            return null;

        var reasons = row.TryGetProperty("reasons", out var values) && values.ValueKind == JsonValueKind.Array
            ? values.EnumerateArray()
                .Select(value => value.ValueKind == JsonValueKind.String ? value.GetString() : null)
                .OfType<string>()
                .Where(reason => reason.Length > 0)
                .Distinct(StringComparer.Ordinal)
                .ToArray()
            : [];

        return new CommunityBot(
            userId,
            Text(row, "displayName") is { Length: > 0 } name ? name : userId,
            threat,
            reasons,
            Text(row, "platform"),
            Text(row, "trust"),
            Text(row, "firstSeen"),
            Text(row, "lastSeen"),
            Math.Max(1, Number(row, "sightings")));
    }

    private static string? Text(JsonElement row, string name) =>
        row.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.String
            ? value.GetString()
            : null;

    private static int Number(JsonElement row, string name) =>
        row.TryGetProperty(name, out var value) && value.TryGetInt32(out var number) ? number : 0;

    private static HttpClient CreateClient()
    {
        var client = new HttpClient {Timeout = TimeSpan.FromSeconds(15)};
        client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("AntiBot", "1.0"));
        return client;
    }

    private static string CachePath => Path.Combine(Constants.SettingsDirectory, "community-bots.json");

    [System.Text.RegularExpressions.GeneratedRegex(@"^usr_[A-Za-z0-9-]{8,64}$")]
    private static partial System.Text.RegularExpressions.Regex UserIdPattern();
}

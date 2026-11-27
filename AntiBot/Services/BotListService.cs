using System.Globalization;
using System.Text;
using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;

namespace AntiBot.Services;

/// <summary>
///     Keeps every account the scoring has called a bot, one row per user id. Repeated sightings update
///     that row instead of adding another, and the list survives a restart.
/// </summary>
/// <remarks>
///     Signed out, only the log-based signals exist, so the strongest of them (the generated-name
///     pattern) is enough on its own; signed in, the normal action threshold applies. A row removed in
///     edit mode is remembered as removed and is never added again.
/// </remarks>
[Singleton]
internal partial class BotListService
{
    /// <summary>
    ///     The generated-name pattern alone scores 20, which is the strongest signal the log can give.
    ///     Without a signed-in profile, that is the bar instead of the (much higher) action threshold.
    /// </summary>
    private const int LoginFreeThreshold = 20;

    private readonly Dictionary<string, BotRecord> _bots = new(StringComparer.OrdinalIgnoreCase);
    private readonly Lock _gate = new();
    private readonly HashSet<string> _seen = new(StringComparer.OrdinalIgnoreCase);
    private string _instance = "";

    private BotListService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;

        foreach (var row in Database.Instance.LoadBots())
            _bots[row.Entry.UserId] = new(row.Entry, row.Removed);

        InstanceService.Instance.Published += OnSnapshot;
        InstanceService.Instance.Observed += OnObserved;
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "bots.remove" => RemoveAsync(context),
        "bots.export" => ExportAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>The rows the page and the export show, newest sighting first.</summary>
    internal BotEntry[] DataEntries
    {
        get
        {
            lock (_gate)
                return
                [
                    .. _bots.Values
                        .Where(record => !record.Removed)
                        .Select(record => record.Entry)
                        .OrderByDescending(entry => entry.LastSeen)
                ];
        }
    }

    private void OnSnapshot(InstanceSnapshot snapshot) =>
        // The sweep starts apart from the log reader: parsing the next line matters more than this.
        _ = Task.Run(() => Sweep(snapshot));

    /// <summary>Only a ping; the page fetches the rows from the data plane.</summary>
    private static void Publish() => WindowManager.Instance.NotifyMainWindowSoon("bots.changed");

    /// <summary>A leave line is the only chance to score a bot that never announced a join.</summary>
    private void OnObserved(string userId, string name) =>
        _ = Task.Run(() =>
        {
            try
            {
                Consider(InstanceService.Instance.Describe(userId, name));
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Could not score {UserId} for the bot list", userId);
            }
        });

    private void Sweep(InstanceSnapshot snapshot)
    {
        bool changed;

        lock (_gate)
        {
            if (snapshot.Instance != _instance)
            {
                _instance = snapshot.Instance;
                _seen.Clear();
            }

            var settings = SettingsService.Instance.Current;
            changed = false;

            foreach (var user in snapshot.Users)
                changed |= ConsiderLocked(user, settings);
        }

        if (changed)
            Publish();
    }

    private void Consider(InstanceUser user)
    {
        bool changed;

        lock (_gate)
            changed = ConsiderLocked(user, SettingsService.Instance.Current);

        if (changed)
            Publish();
    }

    /// <summary>
    ///     Adds or refreshes one row and returns whether what the page shows changed. The caller holds
    ///     <see cref="_gate" />.
    /// </summary>
    private bool ConsiderLocked(InstanceUser user, AppSettings settings)
    {
        // Without a profile the only signals are the log's name and avatar, so the strongest of them
        // (the generated-name pattern) has to be enough; with a profile the action threshold applies.
        var bar = user.Trust is null
            ? Math.Min(settings.ThreatThreshold, LoginFreeThreshold)
            : settings.ThreatThreshold;

        if (user.Local || user.IsFriend || user.Whitelisted || user.Threat < bar)
            return false;

        var known = _bots.GetValueOrDefault(user.UserId);
        if (known is { Removed: true })
            return false;

        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var firstInInstance = _seen.Add(user.UserId);

        var next = known is null
            ? new BotEntry(user.UserId, user.Name, user.Threat, user.ThreatReasons ?? [],
                user.IconUrl ?? user.AvatarUrl, user.Trust, user.Platform, user.DateJoined,
                now, now, 1)
            : known.Entry with
            {
                DisplayName = user.Name,
                Threat = user.Threat,
                Reasons = user.ThreatReasons ?? [],
                AvatarUrl = user.IconUrl ?? user.AvatarUrl ?? known.Entry.AvatarUrl,
                Trust = user.Trust ?? known.Entry.Trust,
                Platform = user.Platform ?? known.Entry.Platform,
                DateJoined = user.DateJoined ?? known.Entry.DateJoined,
                LastSeen = firstInInstance ? now : known.Entry.LastSeen,
                Sightings = firstInInstance ? known.Entry.Sightings + 1 : known.Entry.Sightings
            };

        if (known is not null && Same(known.Entry, next))
            return false;

        _bots[user.UserId] = new(next, false);
        _ = Database.Instance.SaveBotAsync(next);
        Log.Information("Bot list: {Name} ({UserId}) scores {Threat}", next.DisplayName, next.UserId, next.Threat);
        return true;
    }

    /// <summary>The action threshold, lowered to the login-free bar while no profile can be read.</summary>
    private static int Threshold(AppSettings settings) =>
        AuthService.Instance.IsLoggedIn
            ? settings.ThreatThreshold
            : Math.Min(settings.ThreatThreshold, LoginFreeThreshold);

    private static bool Same(BotEntry left, BotEntry right) =>
        left.DisplayName == right.DisplayName &&
        left.Threat == right.Threat &&
        left.AvatarUrl == right.AvatarUrl &&
        left.Trust == right.Trust &&
        left.Platform == right.Platform &&
        left.DateJoined == right.DateJoined &&
        left.FirstSeen == right.FirstSeen &&
        left.LastSeen == right.LastSeen &&
        left.Sightings == right.Sightings &&
        left.Reasons.SequenceEqual(right.Reasons);

    private async Task<NativeResponse?> RemoveAsync(NativeContext context)
    {
        var userId = context.Payload<BotActionRequest>()?.UserId ?? "";
        if (userId.Length == 0)
            return context.Reply("bots.remove.result", new OkPayload());

        lock (_gate)
            if (_bots.TryGetValue(userId, out var record))
                _bots[userId] = record with
                {
                    Removed = true
                };

        await Database.Instance.SetBotRemovedAsync(userId, true);
        Log.Information("Bot list: {UserId} was removed", userId);
        Publish();
        return context.Reply("bots.remove.result", new OkPayload());
    }

    private async Task<NativeResponse?> ExportAsync(NativeContext context)
    {
        var json = !string.Equals(context.Payload<BotExportRequest>()?.Format, "csv",
            StringComparison.OrdinalIgnoreCase);
        var entries = DataEntries;

        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var downloads = Path.Combine(home, "Downloads");
        var folder = Directory.Exists(downloads) ? downloads : home;
        var path = Path.Combine(folder,
            $"antibot-bots-{DateTime.Now:yyyyMMdd-HHmmss}.{(json ? "json" : "csv")}");

        var attempt = await Try.Run(() => json ? WriteJsonAsync(path, entries) : WriteCsvAsync(path, entries));
        if (!attempt.IsSuccess)
        {
            Log.Warning(attempt.Exception, "Failed to export the bot list to {Path}", path);
            return context.Fail("bots.export.result", Localization.Get("error.bots_export"));
        }

        Log.Information("Exported {Count} bot(s) to {Path}", entries.Length, path);
        return context.Reply("bots.export.result", new BotExportPayload(true, entries.Length, path));
    }

    private static async Task WriteJsonAsync(string path, BotEntry[] entries)
    {
        await using var stream = File.Create(path);
        await using var writer = new Utf8JsonWriter(stream, new()
        {
            Indented = true
        });

        writer.WriteStartArray();

        foreach (var bot in entries)
        {
            writer.WriteStartObject();
            writer.WriteString("userId", bot.UserId);
            writer.WriteString("displayName", bot.DisplayName);
            writer.WriteNumber("threat", bot.Threat);
            writer.WriteString("trust", bot.Trust);
            writer.WriteString("platform", bot.Platform);
            writer.WriteString("dateJoined", bot.DateJoined);
            writer.WriteString("avatarUrl", bot.AvatarUrl);
            writer.WriteString("firstSeen", Iso(bot.FirstSeen));
            writer.WriteString("lastSeen", Iso(bot.LastSeen));
            writer.WriteNumber("sightings", bot.Sightings);

            writer.WriteStartArray("reasons");

            foreach (var reason in bot.Reasons)
            {
                writer.WriteStartObject();
                writer.WriteString("text", reason.Text);
                writer.WriteNumber("weight", reason.Weight);
                writer.WriteString("detail", reason.Detail);
                writer.WriteEndObject();
            }

            writer.WriteEndArray();
            writer.WriteEndObject();
        }

        writer.WriteEndArray();
        await writer.FlushAsync();
    }

    private static async Task WriteCsvAsync(string path, BotEntry[] entries)
    {
        var builder = new StringBuilder();
        builder.AppendLine(
            "userId,displayName,threat,trust,platform,dateJoined,avatarUrl,reasons,firstSeen,lastSeen,sightings");

        foreach (var bot in entries)
            builder.AppendLine(string.Join(',',
            [
                Csv(bot.UserId), Csv(bot.DisplayName), Csv(bot.Threat.ToString(CultureInfo.InvariantCulture)),
                Csv(bot.Trust), Csv(bot.Platform), Csv(bot.DateJoined), Csv(bot.AvatarUrl),
                Csv(Reasons(bot.Reasons)), Csv(Iso(bot.FirstSeen)), Csv(Iso(bot.LastSeen)),
                Csv(bot.Sightings.ToString(CultureInfo.InvariantCulture))
            ]));

        await File.WriteAllTextAsync(path, builder.ToString(), new UTF8Encoding(true));
    }

    private static string Reasons(ThreatReason[] reasons) =>
        string.Join("; ", reasons.Select(reason =>
            $"{reason.Text}{(reason.Detail is { Length: > 0 } detail ? $"({detail})" : "")} " +
            $"({reason.Weight.ToString("+#;-#;0", CultureInfo.InvariantCulture)})"));

    private static string Csv(string? value) => $"\"{(value ?? "").Replace("\"", "\"\"")}\"";

    private static string Iso(long milliseconds) =>
        DateTimeOffset.FromUnixTimeMilliseconds(milliseconds).ToLocalTime()
            .ToString("O", CultureInfo.InvariantCulture);

    /// <summary>A stored row and whether the user removed it.</summary>
    private sealed record BotRecord(BotEntry Entry, bool Removed);
}

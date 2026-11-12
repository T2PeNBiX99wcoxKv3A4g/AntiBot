using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;

namespace AntiBot.Services;

/// <summary>Loads and stores the settings file. The defaults apply until the user saves something.</summary>
internal sealed class SettingsService : Singleton<SettingsService>
{
    private static readonly string FilePath = Path.Combine(Constants.SettingsDirectory, "settings.json");

    public SettingsService() => NativeBridge.MessageReceived += HandleMessageAsync;

    public AppSettings Current { get; private set; } = AppSettings.Default;

    /// <summary>The log folder in use by the follower.</summary>
    public string LogDirectory => Current.LogDirectory;

    /// <summary>The language both the backend and the interface use.</summary>
    public string Language => Current.Language;

    public void Load()
    {
        MoveFromTheDataFolder();

        if (!File.Exists(FilePath))
            return;

        var stored = Try.Run(() => JsonSerializer.Deserialize(File.ReadAllText(FilePath),
                AppJsonContext.Default.AppSettings))
            .OnFailure(ex => Log.Warning(ex, "Failed to read {File}", FilePath))
            .GetOrNull();

        if (stored is not null)
            Current = stored with
            {
                LogDirectory = stored.LogDirectory is { Length: > 0 } directory
                    ? directory
                    : Current.LogDirectory,
                Language = NormalizeLanguage(stored.Language),

                // An empty list is a real choice: it turns the external lookups off.
                AvatarApiProviders = stored.AvatarApiProviders ?? [],
                OscPort = stored.OscPort is > 0 and <= 65535 ? stored.OscPort : 9000,

                // The fields accept a link as well as an id; keep only the id it points at.
                SafeAvatarId = Ids.Avatar(stored.SafeAvatarId) ?? "",
                Whitelist = (stored.Whitelist ?? []).Select(Ids.User).OfType<string>()
                .Distinct(StringComparer.OrdinalIgnoreCase).ToArray()
            };
    }

    private static string NormalizeLanguage(string? language) =>
        language is "system" or "ja" or "zh-CN" or "zh-TW" ? language : "en";

    private SettingsPayload Payload() =>
        new(Current.LogDirectory, AppSettings.DefaultLogDirectory, Current.AvatarApiProviders,
            Current.AutoBlock, Current.AutoDisableAvatarInteraction, Current.AutoHideChatBox,
            Current.AutoCloseVrchat, Current.AutoSafeMode, Current.AutoSafeAvatar, Current.SafeAvatarId,
            Current.SkipCloseInVr, Current.AutoRejectFriendRequests, Current.ThreatThreshold,
            Current.Whitelist, Current.Language, Current.StartHidden, Current.OscPort);

    /// <summary>
    ///     Older builds wrote the settings into the data folder, next to the session; move them once so
    ///     the settings and the key no longer share a directory.
    /// </summary>
    private void MoveFromTheDataFolder()
    {
        var legacy = Path.Combine(Constants.DataDirectory, "settings.json");
        if (!File.Exists(legacy) || File.Exists(FilePath))
            return;

        Try.Run(() => File.Move(legacy, FilePath, true))
            .OnFailure(ex => Log.Warning(ex, "Could not move the settings next to the other settings files"));
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "settings.get" => Task.FromResult<NativeResponse?>(context.Reply("settings.get.result", Payload())),
        "settings.save" => SaveAsync(context),
        "whitelist.people" => Task.FromResult<NativeResponse?>(WhitelistPeople(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>
    ///     Describes every whitelisted user and starts the profile lookups, so a newly added id turns
    ///     into a name without waiting for the instance list to refresh.
    /// </summary>
    private NativeResponse WhitelistPeople(NativeContext context)
    {
        foreach (var id in Current.Whitelist)
            PlayerService.Instance.Request(id);

        return context.Reply("whitelist.people.result",
            Current.Whitelist.Select(id => InstanceService.Instance.Describe(id, "")).ToArray());
    }

    private async Task<NativeResponse?> SaveAsync(NativeContext context)
    {
        if (context.Payload<AppSettings>() is not { } settings)
            return context.Fail("settings.save.result", Localization.Get("error.invalidSettings"));

        if (settings.LogDirectory.Trim() is not { Length: > 0 } directory)
            return context.Fail("settings.save.result", Localization.Get("error.invalidLogDirectory"));

        // Only absolute http(s) providers are kept; an empty list turns the lookups off.
        var providers = (settings.AvatarApiProviders ?? [])
            .Select(provider => provider.Trim())
            .Where(IsHttpUrl)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        Current = new()
        {
            LogDirectory = directory,
            Language = NormalizeLanguage(settings.Language),
            StartHidden = settings.StartHidden,
            OscPort = settings.OscPort is > 0 and <= 65535 ? settings.OscPort : 9000,
            AvatarApiProviders = providers,
            AutoBlock = settings.AutoBlock,
            AutoDisableAvatarInteraction = settings.AutoDisableAvatarInteraction,
            AutoHideChatBox = settings.AutoHideChatBox,
            AutoCloseVrchat = settings.AutoCloseVrchat,
            AutoSafeMode = settings.AutoSafeMode,
            AutoSafeAvatar = settings.AutoSafeAvatar,
            SafeAvatarId = Ids.Avatar(settings.SafeAvatarId) ?? "",
            SkipCloseInVr = settings.SkipCloseInVr,
            AutoRejectFriendRequests = settings.AutoRejectFriendRequests,
            ThreatThreshold = Math.Clamp(settings.ThreatThreshold, 0, 100),
            Whitelist = (settings.Whitelist ?? [])
                .Select(Ids.User)
                .OfType<string>()
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray()
        };
        Log.Information("Log folder set to {Directory}; {Count} avatar provider(s)", directory,
            Current.AvatarApiProviders.Length);

        var attempt = await Try.Run(() => File.WriteAllTextAsync(FilePath,
            JsonSerializer.Serialize(Current, AppJsonContext.Default.AppSettings)));

        attempt.OnFailure(ex => Log.Warning(ex, "Failed to write {File}", FilePath));

        // A new provider list is a chance to resolve names that failed before.
        AvatarService.Instance.ResetUnknown();

        foreach (var id in Current.Whitelist)
            PlayerService.Instance.Request(id);

        var payload = Payload();
        WindowManager.Instance.NotifyMainWindow("settings.changed", payload);
        return context.Reply("settings.save.result", payload);
    }

    private static bool IsHttpUrl(string value) =>
        Uri.TryCreate(value, UriKind.Absolute, out var uri) &&
        (uri.Scheme == Uri.UriSchemeHttps || uri.Scheme == Uri.UriSchemeHttp);
}
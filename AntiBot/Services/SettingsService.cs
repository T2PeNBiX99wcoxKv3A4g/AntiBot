using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

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
                AvatarApiProviders = stored.AvatarApiProviders is { Length: > 0 } providers
                    ? providers
                    : AppSettings.DefaultAvatarApiProviders
            };
    }

    private static string NormalizeLanguage(string? language) =>
        language is "ja" or "zh-CN" or "zh-TW" ? language : "en";

    private SettingsPayload Payload() =>
        new(Current.LogDirectory, AppSettings.DefaultLogDirectory, Current.AvatarApiProviders,
            Current.AutoBlock, Current.AutoDisableAvatarInteraction, Current.AutoHideChatBox,
            Current.AutoRejectFriendRequests, Current.ThreatThreshold,
            Current.Whitelist, Current.Language, Current.StartHidden);

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
        "whitelist.people" => Task.FromResult<NativeResponse?>(context.Reply("whitelist.people.result",
            Current.Whitelist.Select(id => InstanceService.Instance.Describe(id, "")).ToArray())),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> SaveAsync(NativeContext context)
    {
        if (context.Payload<AppSettings>() is not { } settings)
            return context.Fail("settings.save.result", Localization.Get("error.invalidSettings"));

        if (settings.LogDirectory.Trim() is not { Length: > 0 } directory)
            return context.Fail("settings.save.result", Localization.Get("error.invalidLogDirectory"));

        // Only absolute http(s) providers are kept; an empty list falls back to the built-in ones.
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
            AvatarApiProviders = providers.Length > 0 ? providers : AppSettings.DefaultAvatarApiProviders,
            AutoBlock = settings.AutoBlock,
            AutoDisableAvatarInteraction = settings.AutoDisableAvatarInteraction,
            AutoHideChatBox = settings.AutoHideChatBox,
            AutoRejectFriendRequests = settings.AutoRejectFriendRequests,
            ThreatThreshold = Math.Clamp(settings.ThreatThreshold, 0, 100),
            Whitelist = (settings.Whitelist ?? [])
                .Select(id => id.Trim())
                .Where(id => id.Length > 0)
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
using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Services;
using Serilog;

namespace AntiBot.Services;

/// <summary>Owns the settings model and its file; the shared base handles the standard messages.</summary>
internal sealed class SettingsService() : SettingsServiceBase<SettingsService, AppSettings, SettingsPayload>(
    new TomlSettingsStore<AppSettings>(
        Path.Combine(Constants.SettingsDirectory, "settings.toml"),
        AppSettings.Default,
        AppTomlContext.Default.AppSettings,
        json => JsonSerializer.Deserialize(json, AppJsonContext.Default.AppSettings),
        LegacySettingsPath,
        Header))
{
    private const string Header =
        "# AntiBot settings. Rewritten when settings are saved; comments are not preserved.";

    private static readonly string? LegacySettingsPath = new[]
    {
        Path.Combine(Constants.SettingsDirectory, "settings.json"), Path.Combine(Constants.DataDirectory, "settings.json")
    }.FirstOrDefault(File.Exists);

    /// <summary>The log folder in use by the follower.</summary>
    public string LogDirectory => Current.LogDirectory;

    /// <summary>The language both the backend and the interface use.</summary>
    public string Language => Current.Language;

    protected override SettingsPayload Payload() =>
        new(Current.LogDirectory, AppSettings.DefaultLogDirectory, Current.AvatarApiProviders,
            Current.AutoBlock, Current.AutoDisableAvatarInteraction, Current.AutoHideChatBox,
            Current.AutoCloseVrchat, Current.AutoSafeMode, Current.AutoSafeAvatar, Current.SafeAvatarId,
            Current.SkipCloseInVr, Current.AutoRejectFriendRequests, Current.ThreatThreshold,
            Current.Whitelist, Current.Language, Current.StartHidden, Current.OscPort, Current.Theme);

    protected override string? Validate(AppSettings settings) =>
        string.IsNullOrWhiteSpace(settings.LogDirectory)
            ? Localization.Get("error.invalidLogDirectory")
            : null;

    protected override AppSettings Normalize(AppSettings settings)
    {
        // Only absolute http(s) providers are kept; an empty list turns the lookups off.
        var providers = (settings.AvatarApiProviders ?? [])
            .Select(provider => provider.Trim())
            .Where(provider => provider.IsHttpUrl())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        return settings with
        {
            LogDirectory = settings.LogDirectory.Trim(),
            Language = Localization.Normalize(settings.Language),
            Theme = settings.Theme is "light" or "dark" ? settings.Theme : "system",
            AvatarApiProviders = providers,
            SafeAvatarId = Ids.Avatar(settings.SafeAvatarId) ?? "",
            Whitelist =
            [
                .. (settings.Whitelist ?? []).Select(Ids.User).OfType<string>()
                .Distinct(StringComparer.OrdinalIgnoreCase)
            ]
        };
    }

    protected override void OnSaved(AppSettings settings)
    {
        Log.Information("Log folder set to {Directory}; {Count} avatar provider(s)", settings.LogDirectory,
            settings.AvatarApiProviders.Length);

        // A new provider list is a chance to resolve names that failed before.
        AvatarService.Instance.ResetUnknown();

        foreach (var id in settings.Whitelist)
            PlayerService.Instance.Request(id);
    }

    protected override Task<NativeResponse?> HandleExtraAsync(NativeContext context) =>
        context.Request.Type == "whitelist.people"
            ? Task.FromResult<NativeResponse?>(WhitelistPeople(context))
            : base.HandleExtraAsync(context);

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
}
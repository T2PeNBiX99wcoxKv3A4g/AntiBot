using System.Text.Json;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Loads and stores the settings file. The defaults apply until the user saves something.</summary>
internal sealed class SettingsService : Singleton<SettingsService>
{
    private static readonly string FilePath = Path.Combine(Constants.SettingsDirectory, "settings.json");

    private AppSettings _current = AppSettings.Default;

    public SettingsService() => NativeBridge.MessageReceived += HandleMessageAsync;

    public AppSettings Current => _current;

    /// <summary>The log folder in use by the follower.</summary>
    public string LogDirectory => _current.LogDirectory;

    public void Load()
    {
        if (!File.Exists(FilePath))
            return;

        var stored = Try.Run(() => JsonSerializer.Deserialize(File.ReadAllText(FilePath),
                AppJsonContext.Default.AppSettings))
            .OnFailure(ex => Log.Warning(ex, "Failed to read {File}", FilePath))
            .GetOrNull();

        if (stored?.LogDirectory is { Length: > 0 } directory)
            _current = stored with { LogDirectory = directory };
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "settings.get" => Task.FromResult<NativeResponse?>(context.Reply("settings.get.result",
            new SettingsPayload(_current.LogDirectory, AppSettings.DefaultLogDirectory))),
        "settings.save" => SaveAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> SaveAsync(NativeContext context)
    {
        if (context.Payload<AppSettings>()?.LogDirectory?.Trim() is not { Length: > 0 } directory)
            return context.Fail("settings.save.result", "error.invalidLogDirectory");

        _current = new(directory);
        Log.Information("Log folder set to {Directory}", directory);

        var attempt = await Try.Run(() => File.WriteAllTextAsync(FilePath,
            JsonSerializer.Serialize(_current, AppJsonContext.Default.AppSettings)));

        attempt.OnFailure(ex => Log.Warning(ex, "Failed to write {File}", FilePath));

        return context.Reply("settings.save.result", new OkPayload());
    }
}

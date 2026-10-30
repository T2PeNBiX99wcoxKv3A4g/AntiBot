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

    public SettingsService() => NativeBridge.MessageReceived += HandleMessageAsync;

    public AppSettings Current { get; private set; } = AppSettings.Default;

    /// <summary>The log folder in use by the follower.</summary>
    public string LogDirectory => Current.LogDirectory;

    public void Load()
    {
        MoveFromTheDataFolder();

        if (!File.Exists(FilePath))
            return;

        var stored = Try.Run(() => JsonSerializer.Deserialize(File.ReadAllText(FilePath),
                AppJsonContext.Default.AppSettings))
            .OnFailure(ex => Log.Warning(ex, "Failed to read {File}", FilePath))
            .GetOrNull();

        if (stored?.LogDirectory is { Length: > 0 } directory)
            Current = stored with
            {
                LogDirectory = directory
            };
    }

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
        "settings.get" => Task.FromResult<NativeResponse?>(context.Reply("settings.get.result",
            new SettingsPayload(Current.LogDirectory, AppSettings.DefaultLogDirectory))),
        "settings.save" => SaveAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> SaveAsync(NativeContext context)
    {
        if (context.Payload<AppSettings>()?.LogDirectory?.Trim() is not { Length: > 0 } directory)
            return context.Fail("settings.save.result", "error.invalidLogDirectory");

        Current = new(directory);
        Log.Information("Log folder set to {Directory}", directory);

        var attempt = await Try.Run(() => File.WriteAllTextAsync(FilePath,
            JsonSerializer.Serialize(Current, AppJsonContext.Default.AppSettings)));

        attempt.OnFailure(ex => Log.Warning(ex, "Failed to write {File}", FilePath));

        return context.Reply("settings.save.result", new OkPayload());
    }
}
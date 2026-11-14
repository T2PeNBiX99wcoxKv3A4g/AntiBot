using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Keeps the picture of a player AntiBot acted on, so a notification can still show who it was
///     about after the player has left the instance.
/// </summary>
/// <remarks>
///     The file is named after a hash of the URL, never after the player, and only PNG and JPEG are
///     kept: those are the formats the Windows toast can display.
/// </remarks>
internal static class PlayerImages
{
    private static readonly ILogger Logger = Log.ForContext(typeof(PlayerImages));
    private static readonly HttpClient Http = CreateHttp();
    private static readonly ConcurrentDictionary<string, Lazy<Task<string?>>> Downloads = new();
    private static readonly string[] Extensions = [".png", ".jpg"];

    private static string Root => Path.Combine(Constants.DataDirectory, "images");

    private static HttpClient CreateHttp()
    {
        var client = new HttpClient
        {
            Timeout = TimeSpan.FromSeconds(10)
        };
        client.DefaultRequestHeaders.UserAgent.ParseAdd(
            $"AntiBot/{AppIdentity.Version} ({AppIdentity.Platform})");
        return client;
    }

    /// <summary>The local copy of a player's picture, or null when it cannot be shown.</summary>
    public static async Task<string?> GetAsync(string? url)
    {
        if (url is not { Length: > 0 })
            return null;

        // Two actions on the same player share one download instead of racing for the same file.
        var download = Downloads.GetOrAdd(url,
            key => new(() => FetchAsync(key), LazyThreadSafetyMode.ExecutionAndPublication));

        return await download.Value;
    }

    private static async Task<string?> FetchAsync(string url)
    {
        try
        {
            var name = Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(url)))[..32];

            if (Cached(name) is { } existing)
                return existing;

            using var response = await Http.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return null;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            if (ExtensionOf(bytes) is not { } extension)
                return null;

            Directory.CreateDirectory(Root);

            var path = Path.Combine(Root, name + extension);
            var temporary = path + ".tmp";
            await File.WriteAllBytesAsync(temporary, bytes);
            File.Move(temporary, path, true);
            return path;
        }
        catch (Exception ex)
        {
            Logger.Debug(ex, "Could not cache a player picture");
            return null;
        }
    }

    private static string? Cached(string name) =>
        Extensions.Select(extension => Path.Combine(Root, name + extension)).FirstOrDefault(File.Exists);

    private static string? ExtensionOf(ReadOnlySpan<byte> bytes) => bytes switch
    {
        [0x89, 0x50, 0x4E, 0x47, ..] => ".png",
        [0xFF, 0xD8, 0xFF, ..] => ".jpg",
        _ => null
    };
}

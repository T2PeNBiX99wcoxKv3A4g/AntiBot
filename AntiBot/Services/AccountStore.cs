using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using AntiBot.Messaging;
using Serilog;

namespace AntiBot.Services;

/// <summary>One account as the index remembers it: what the list shows, and nothing secret.</summary>
internal sealed record StoredAccount(string Dir, string Name, DateTimeOffset LastUsed);

/// <summary>The accounts on disk, and the one that was signed in when AntiBot last ran.</summary>
internal sealed record AccountIndex(string? Active, StoredAccount[] Accounts);

/// <summary>
///     Gives every VRChat account its own folder. The folder is named after a hash of the account id,
///     so the index never repeats the id and one account's session can be removed on its own.
/// </summary>
/// <remarks>
///     The index holds only the display name, the cached avatar and when the account was last used.
///     The session, the key and the storage choice stay inside the account's own folder.
/// </remarks>
internal static class AccountStore
{
    private static readonly ILogger Logger = Log.ForContext(typeof(AccountStore));
    private static readonly HttpClient Http = CreateHttp();
    private static readonly ConcurrentDictionary<string, string?> Avatars = new();

    public static string Root => Path.Combine(Constants.DataDirectory, "accounts");

    private static string IndexPath => Path.Combine(Root, "index.json");

    private static HttpClient CreateHttp()
    {
        var client = new HttpClient
        {
            Timeout = TimeSpan.FromSeconds(15)
        };
        client.DefaultRequestHeaders.UserAgent.ParseAdd(
            $"AntiBot/{AppInfoService.Version} ({AppInfoService.Platform})");
        return client;
    }

    /// <summary>A stable folder name for an account id, without writing the id itself.</summary>
    public static string Hash(string userId) =>
        Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(userId)))[..32];

    public static string PathOf(string dir) => Path.Combine(Root, dir);

    public static AccountIndex Load()
    {
        var index = Try.Run(() => File.Exists(IndexPath)
                ? JsonSerializer.Deserialize(File.ReadAllBytes(IndexPath), AppJsonContext.Default.AccountIndex)
                : null)
            .OnFailure(ex => Logger.Warning(ex, "Could not read the account index"))
            .GetOrNull();

        return index ?? new(null, []);
    }

    public static void Save(AccountIndex index) =>
        Try.Run(() =>
        {
            Directory.CreateDirectory(Root);

            var temporary = IndexPath + ".tmp";
            File.WriteAllBytes(temporary,
                JsonSerializer.SerializeToUtf8Bytes(index, AppJsonContext.Default.AccountIndex));
            File.Move(temporary, IndexPath, true);
        }).OnFailure(ex => Logger.Warning(ex, "Could not write the account index"));

    /// <summary>The cached picture as a data URL, so the list renders while the session is locked.</summary>
    public static string? Avatar(string dir)
    {
        if (Avatars.TryGetValue(dir, out var cached))
            return cached;

        var value = Try.Run(() =>
        {
            var path = AvatarPath(dir);
            if (path is null)
                return null;

            var bytes = File.ReadAllBytes(path);
            return $"data:{Sniff(bytes)};base64,{Convert.ToBase64String(bytes)}";
        }).GetOrNull();

        Avatars[dir] = value;
        return value;
    }

    /// <summary>Downloads the account's picture and keeps it beside the session. Returns its data URL.</summary>
    public static async Task<string?> DownloadAvatarAsync(string dir, string? url, CancellationToken token = default)
    {
        if (url is not { Length: > 0 })
            return null;

        try
        {
            var bytes = await Http.GetByteArrayAsync(url, token);
            if (bytes.Length == 0)
                return null;

            var folder = PathOf(dir);
            Directory.CreateDirectory(folder);

            var path = Path.Combine(folder, "avatar." + Extension(bytes));
            var temporary = path + ".tmp";
            await File.WriteAllBytesAsync(temporary, bytes, token);
            File.Move(temporary, path, true);

            // An older picture in another format must not stay beside the new one.
            foreach (var stale in Directory.EnumerateFiles(folder, "avatar.*").Where(file => file != path))
                Try.Run(() => File.Delete(stale));

            Avatars.TryRemove(dir, out _);
            return Avatar(dir);
        }
        catch (Exception ex)
        {
            Logger.Warning(ex, "Could not cache the avatar of {Dir}", dir);
            return null;
        }
    }

    /// <summary>The picture of a "do not remember" account, which must not be written to disk.</summary>
    public static async Task<string?> RemoteAvatarAsync(string? url, CancellationToken token = default)
    {
        if (url is not { Length: > 0 })
            return null;

        try
        {
            var bytes = await Http.GetByteArrayAsync(url, token);
            return bytes.Length == 0 ? null : $"data:{Sniff(bytes)};base64,{Convert.ToBase64String(bytes)}";
        }
        catch (Exception ex)
        {
            Logger.Warning(ex, "Could not read the avatar of {Url}", url);
            return null;
        }
    }

    public static void Delete(string dir)
    {
        Avatars.TryRemove(dir, out _);

        var folder = PathOf(dir);
        if (!Directory.Exists(folder))
            return;

        Try.Run(() => Directory.Delete(folder, true))
            .OnFailure(ex => Logger.Warning(ex, "Could not delete the account folder {Dir}", dir));
    }

    private static string? AvatarPath(string dir)
    {
        var folder = PathOf(dir);
        return Directory.Exists(folder)
            ? Directory.EnumerateFiles(folder, "avatar.*").FirstOrDefault()
            : null;
    }

    private static string Sniff(ReadOnlySpan<byte> bytes) => bytes switch
    {
        [0x89, 0x50, 0x4E, 0x47, ..] => "image/png",
        [0xFF, 0xD8, 0xFF, ..] => "image/jpeg",
        [0x47, 0x49, 0x46, 0x38, ..] => "image/gif",
        [0x52, 0x49, 0x46, 0x46, _, _, _, _, 0x57, 0x45, 0x42, 0x50, ..] => "image/webp",
        _ => "image/png"
    };

    private static string Extension(ReadOnlySpan<byte> bytes) => Sniff(bytes) switch
    {
        "image/jpeg" => "jpg",
        "image/gif" => "gif",
        "image/webp" => "webp",
        _ => "png"
    };
}
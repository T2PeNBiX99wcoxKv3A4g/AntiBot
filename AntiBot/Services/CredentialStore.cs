using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     The VRChat login name, password and the non-session cookies that let a new sign-in skip the
///     2FA prompt when VRChat still remembers this device.
/// </summary>
internal sealed record RememberedLogin(
    string Username,
    string Password,
    CookieRecord[]? Cookies = null,
    string? DisplayName = null,
    string? AvatarUrl = null,
    bool? AutoLogin = null)
{
    /// <summary>A file written before the option existed was saved for exactly this purpose.</summary>
    [JsonIgnore]
    public bool AutoLoginEnabled => AutoLogin ?? true;
}

/// <summary>One saved credential as the account list needs it; the password never leaves the store.</summary>
internal sealed record SavedCredential(
    string Dir,
    string Username,
    string? DisplayName,
    string? AvatarUrl,
    bool AutoLogin,
    DateTimeOffset SavedAt);

/// <summary>
///     Stores the optional remembered VRChat password outside the account's session folder, encrypted
///     with the machine: TPM when one is usable, otherwise DPAPI on Windows and the software key file
///     on Linux.
/// </summary>
/// <remarks>
///     <para>
///         This is deliberately separate from <see cref="AuthStore" />: the session stays the primary
///         way to stay signed in, and the password is only a fallback for when the session expires.
///         VRChat has no refresh token, so this is the only way to sign in again without asking.
///     </para>
///     <para>
///         It is also outside <c>accounts/</c>, so choosing "Do not remember" for the session (which
///         deletes that folder) does not silently take the remembered password with it.
///     </para>
///     <para>
///         The file is protected at rest, not against a program running as the same user: DPAPI, the
///         TPM and the software key can all be used by any process the user starts. Turning the option
///         off deletes every saved credential.
///     </para>
/// </remarks>
internal static class CredentialStore
{
    private const byte Version = 1;
    private const byte DpapiMode = 1;
    private const byte TpmMode = 3;
    private const byte SoftwareMode = 5;

    private const int NonceSize = 12;
    private const int TagSize = 16;
    private const int KeySize = 32;

    private static readonly byte[] Magic = [.. "ABCR"u8];

    private static string Root => Path.Combine(Constants.DataDirectory, "credentials");

    private static string PathOf(string dir) => Path.Combine(Root, $"{dir}.bin");

    private static string KeyPathOf(string dir) => Path.Combine(Root, $"{dir}.key");

    private static string ModePathOf(string dir) => Path.Combine(Root, $"{dir}.mode");

    /// <summary>A separate TPM key scope, so deleting the session must not take the credential key.</summary>
    private static string TpmScope(string dir) => $"credentials-{dir}";

    private static byte[] Entropy(string dir) => [.. "AntiBot/credentials/v1/"u8, .. Encoding.UTF8.GetBytes(dir)];

    public static bool Exists(string dir) => File.Exists(PathOf(dir));

    /// <summary>The account folder hash with the most recently written credential, or null.</summary>
    public static string? Latest()
    {
        if (!Directory.Exists(Root))
            return null;

        return Directory.EnumerateFiles(Root, "*.bin")
            .OrderByDescending(File.GetLastWriteTimeUtc)
            .Select(Path.GetFileNameWithoutExtension)
            .FirstOrDefault();
    }

    /// <summary>Every saved credential, newest first; the password is dropped once the row is built.</summary>
    public static async Task<SavedCredential[]> ListAsync(CancellationToken token = default)
    {
        if (!Directory.Exists(Root))
            return [];

        var saved = new List<SavedCredential>();

        foreach (var file in Directory.EnumerateFiles(Root, "*.bin"))
        {
            var dir = Path.GetFileNameWithoutExtension(file);
            if (await LoadAsync(dir, token) is not { } credential)
                continue;

            saved.Add(new SavedCredential(dir, credential.Username, credential.DisplayName,
                credential.AvatarUrl, credential.AutoLoginEnabled,
                new DateTimeOffset(File.GetLastWriteTimeUtc(file))));
        }

        return [.. saved.OrderByDescending(entry => entry.SavedAt)];
    }

    /// <summary>How the session of this account was kept when the password was saved.</summary>
    public static AuthStorage StorageOf(string dir) =>
        Enum.TryParse<AuthStorage>(Try.Run(() => File.ReadAllText(ModePathOf(dir))).GetOrNull(), true,
            out var mode)
            ? mode
            : AuthStorage.None;

    /// <summary>Writes the credentials, choosing the strongest protection this machine offers.</summary>
    public static async Task<bool> SaveAsync(string dir, RememberedLogin credential, AuthStorage storage,
        CancellationToken token = default)
    {
        var payload = JsonSerializer.SerializeToUtf8Bytes(credential, AppJsonContext.Default.RememberedLogin);

        try
        {
            var (mode, body) = Protect(dir, payload);
            await WriteAsync(PathOf(dir), mode, body, token);
            WriteStorage(dir, storage);
            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not save the remembered VRChat password");
            return false;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(payload);
        }
    }

    /// <summary>Reads the credentials back, or null when there is none or it can no longer be opened.</summary>
    public static async Task<RememberedLogin?> LoadAsync(string dir, CancellationToken token = default)
    {
        var path = PathOf(dir);
        if (!File.Exists(path))
            return null;

        try
        {
            var file = await File.ReadAllBytesAsync(path, token);
            if (file.Length < Magic.Length + 2 ||
                !file.AsSpan(0, Magic.Length).SequenceEqual(Magic) ||
                file[Magic.Length] != Version)
                return null;

            var body = file.AsSpan(Magic.Length + 2);
            var payload = file[Magic.Length + 1] switch
            {
                TpmMode => TpmStore.Unprotect(TpmScope(dir), body),
                DpapiMode when OperatingSystem.IsWindows() => ProtectedData.Unprotect([.. body],
                    Entropy(dir), DataProtectionScope.CurrentUser),
                SoftwareMode => UnprotectWithSoftwareKey(dir, body),
                _ => null
            };

            if (payload is null)
                return null;

            try
            {
                return JsonSerializer.Deserialize(payload, AppJsonContext.Default.RememberedLogin);
            }
            finally
            {
                CryptographicOperations.ZeroMemory(payload);
            }
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the remembered VRChat password");
            return null;
        }
    }

    /// <summary>The session storage can change after the password was saved; keep the note in step.</summary>
    public static void UpdateStorage(string dir, AuthStorage storage)
    {
        if (Exists(dir))
            WriteStorage(dir, storage);
    }

    public static void Delete(string dir)
    {
        Try.Run(() => File.Delete(PathOf(dir)));
        Try.Run(() => File.Delete(KeyPathOf(dir)));
        Try.Run(() => File.Delete(ModePathOf(dir)));
        TpmStore.Delete(TpmScope(dir));
    }

    private static (byte Mode, byte[] Body) Protect(string dir, byte[] payload)
    {
        if (TpmStore.IsAvailable)
        {
            var attempt = Try.Run(() => TpmStore.Protect(TpmScope(dir), payload));
            if (attempt is { IsSuccess: true, Value: { } body })
                return (TpmMode, body);

            Log.Warning(attempt.Exception, "The TPM refused the remembered password; falling back");
        }

        if (OperatingSystem.IsWindows())
            return (DpapiMode, ProtectedData.Protect(payload, Entropy(dir), DataProtectionScope.CurrentUser));

        return (SoftwareMode, ProtectWithSoftwareKey(dir, payload));
    }

    /// <summary>The folder holds only ciphertext, but a private directory keeps the file names private too.</summary>
    private static void EnsureRoot()
    {
        Directory.CreateDirectory(Root);

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(Root,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute);
    }

    private static void WriteStorage(string dir, AuthStorage storage) =>
        Try.Run(() =>
            {
                EnsureRoot();
                File.WriteAllText(ModePathOf(dir), storage.ToString());
            })
            .OnFailure(ex => Log.Debug(ex, "Could not write the remembered-password storage mode"));

    private static async Task WriteAsync(string path, byte mode, byte[] body, CancellationToken token)
    {
        EnsureRoot();

        var file = new byte[Magic.Length + 2 + body.Length];
        Magic.CopyTo(file, 0);
        file[Magic.Length] = Version;
        file[Magic.Length + 1] = mode;
        body.CopyTo(file, Magic.Length + 2);

        var temporary = path + ".tmp";
        await File.WriteAllBytesAsync(temporary, file, token);

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, path, true);
    }

    private static byte[] ProtectWithSoftwareKey(string dir, byte[] payload)
    {
        var key = LoadOrCreateSoftwareKey(dir);
        try
        {
            var nonce = RandomNumberGenerator.GetBytes(NonceSize);
            var tag = new byte[TagSize];
            var cipher = new byte[payload.Length];

            using (var aes = new AesGcm(key, TagSize))
                aes.Encrypt(nonce, payload, cipher, tag);

            var body = new byte[NonceSize + TagSize + cipher.Length];
            nonce.CopyTo(body, 0);
            tag.CopyTo(body, NonceSize);
            cipher.CopyTo(body, NonceSize + TagSize);
            return body;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(key);
        }
    }

    private static byte[]? UnprotectWithSoftwareKey(string dir, ReadOnlySpan<byte> body)
    {
        if (body.Length < NonceSize + TagSize)
            return null;

        var key = TryLoadSoftwareKey(dir);
        if (key is null)
            return null;

        try
        {
            var nonce = body[..NonceSize].ToArray();
            var tag = body.Slice(NonceSize, TagSize).ToArray();
            var cipher = body[(NonceSize + TagSize)..].ToArray();

            var plain = new byte[cipher.Length];
            using var aes = new AesGcm(key, TagSize);
            aes.Decrypt(nonce, cipher, tag, plain);
            return plain;
        }
        catch (CryptographicException)
        {
            return null;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(key);
        }
    }

    private static byte[] LoadOrCreateSoftwareKey(string dir)
    {
        if (TryLoadSoftwareKey(dir) is { } existing)
            return existing;

        EnsureRoot();

        var path = KeyPathOf(dir);
        var key = RandomNumberGenerator.GetBytes(KeySize);
        var temporary = path + ".tmp";
        File.WriteAllBytes(temporary, key);

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, path, true);
        return key;
    }

    private static byte[]? TryLoadSoftwareKey(string dir)
    {
        try
        {
            var path = KeyPathOf(dir);
            return File.Exists(path) ? File.ReadAllBytes(path) : null;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the remembered-password key file");
            return null;
        }
    }
}

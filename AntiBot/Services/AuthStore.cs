using System.Security.Cryptography;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Keeps the VRChat session cookies between launches, in the way the account page offers.
/// </summary>
/// <remarks>
///     <para>
///         The password itself is never written. Password mode derives a key with PBKDF2 over a random
///         per-install salt and encrypts with AES-GCM, so unlocking has to ask for the password again.
///     </para>
///     <para>
///         System mode hands the payload to DPAPI on Windows, which binds it to the Windows account and
///         needs no stored secret; on Linux, where there is no equivalent, the file is written with
///         owner-only permissions instead.
///     </para>
/// </remarks>
internal static class AuthStore
{
    private static readonly byte[] Magic = "ABAT"u8.ToArray();

    /// <summary>Extra DPAPI entropy, so another app's blob cannot be swapped in.</summary>
    private static readonly byte[] Entropy = "AntiBot/auth/v1"u8.ToArray();

    private const byte Version = 1;
    private const byte PlainMode = 0;
    private const byte DpapiMode = 1;
    private const byte PasswordMode = 2;

    // OWASP's floor for PBKDF2-HMAC-SHA256; the cost only shows on unlock, once per launch.
    private const int Iterations = 600_000;
    private const int SaltSize = 16;
    private const int NonceSize = 12;
    private const int TagSize = 16;
    private const int KeySize = 32;

    private static readonly string FilePath = Path.Combine(Constants.DataDirectory, "auth.bin");

    public static bool Exists => File.Exists(FilePath);

    /// <summary>How the file on disk is protected, or <see cref="AuthStorage.None" /> when there is none.</summary>
    public static AuthStorage StoredMode
    {
        get
        {
            if (!File.Exists(FilePath))
                return AuthStorage.None;

            try
            {
                using var stream = File.OpenRead(FilePath);
                var header = new byte[Magic.Length + 2];
                if (stream.ReadAtLeast(header, header.Length, false) < header.Length)
                    return AuthStorage.None;

                return header[Magic.Length + 1] switch
                {
                    PasswordMode => AuthStorage.Password,
                    DpapiMode or PlainMode => AuthStorage.System,
                    _ => AuthStorage.None
                };
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Could not read the stored VRChat session");
                return AuthStorage.None;
            }
        }
    }

    /// <summary>
    ///     Writes the payload in <paramref name="mode" />. Returns false when that mode needs a password
    ///     that was not supplied.
    /// </summary>
    public static async Task<bool> SaveAsync(byte[] payload, AuthStorage mode, string? password,
        CancellationToken token = default)
    {
        byte[] body;
        byte marker;

        switch (mode)
        {
            case AuthStorage.None:
                Delete();
                return true;

            case AuthStorage.Password when password is { Length: > 0 }:
                body = ProtectWithPassword(payload, password);
                marker = PasswordMode;
                break;

            case AuthStorage.Password:
                return false;

            case AuthStorage.System when OperatingSystem.IsWindows():
                body = ProtectedData.Protect(payload, Entropy, DataProtectionScope.CurrentUser);
                marker = DpapiMode;
                break;

            case AuthStorage.System:
                body = payload;
                marker = PlainMode;
                break;

            default:
                return false;
        }

        var file = new byte[Magic.Length + 2 + body.Length];
        Magic.CopyTo(file, 0);
        file[Magic.Length] = Version;
        file[Magic.Length + 1] = marker;
        body.CopyTo(file, Magic.Length + 2);

        await WriteAsync(file, token);
        return true;
    }

    /// <summary>
    ///     Reads the payload back, or null when the file is missing, damaged, or needs another password.
    /// </summary>
    public static async Task<byte[]?> LoadAsync(string? password, CancellationToken token = default)
    {
        if (!File.Exists(FilePath))
            return null;

        try
        {
            var file = await File.ReadAllBytesAsync(FilePath, token);
            if (file.Length < Magic.Length + 2 ||
                !file.AsSpan(0, Magic.Length).SequenceEqual(Magic) ||
                file[Magic.Length] != Version)
                return null;

            var body = file.AsSpan(Magic.Length + 2);

            return file[Magic.Length + 1] switch
            {
                DpapiMode when OperatingSystem.IsWindows() =>
                    ProtectedData.Unprotect(body.ToArray(), Entropy, DataProtectionScope.CurrentUser),
                PlainMode => body.ToArray(),
                PasswordMode when password is { Length: > 0 } => UnprotectWithPassword(body, password),
                _ => null
            };
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the stored VRChat session");
            return null;
        }
    }

    public static void Delete() =>
        Try.Run(() => File.Delete(FilePath)).OnFailure(ex => Log.Warning(ex, "Could not delete the stored session"));

    private static byte[] ProtectWithPassword(byte[] payload, string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var tag = new byte[TagSize];
        var cipher = new byte[payload.Length];

        var key = Rfc2898DeriveBytes.Pbkdf2(password.AsSpan(), salt, Iterations, HashAlgorithmName.SHA256, KeySize);
        try
        {
            using var aes = new AesGcm(key, TagSize);
            aes.Encrypt(nonce, payload, cipher, tag);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(key);
        }

        var body = new byte[SaltSize + NonceSize + TagSize + cipher.Length];
        salt.CopyTo(body, 0);
        nonce.CopyTo(body, SaltSize);
        tag.CopyTo(body, SaltSize + NonceSize);
        cipher.CopyTo(body, SaltSize + NonceSize + TagSize);
        return body;
    }

    private static byte[]? UnprotectWithPassword(ReadOnlySpan<byte> body, string password)
    {
        if (body.Length < SaltSize + NonceSize + TagSize)
            return null;

        var salt = body[..SaltSize].ToArray();
        var nonce = body.Slice(SaltSize, NonceSize).ToArray();
        var tag = body.Slice(SaltSize + NonceSize, TagSize).ToArray();
        var cipher = body[(SaltSize + NonceSize + TagSize)..].ToArray();

        var key = Rfc2898DeriveBytes.Pbkdf2(password.AsSpan(), salt, Iterations, HashAlgorithmName.SHA256, KeySize);
        try
        {
            var plain = new byte[cipher.Length];
            using var aes = new AesGcm(key, TagSize);
            aes.Decrypt(nonce, cipher, tag, plain);
            return plain;
        }
        catch (CryptographicException)
        {
            // A wrong password and a damaged file look the same from here.
            return null;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(key);
            CryptographicOperations.ZeroMemory(cipher);
        }
    }

    private static async Task WriteAsync(byte[] contents, CancellationToken token)
    {
        var temporary = FilePath + ".tmp";
        await File.WriteAllBytesAsync(temporary, contents, token);

        // A file in the data folder is owner-only from the moment it exists, so there is no window
        // where another local account could read it.
        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, FilePath, true);
    }
}

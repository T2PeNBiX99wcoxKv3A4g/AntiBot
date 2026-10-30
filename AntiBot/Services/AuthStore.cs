using System.Diagnostics;
using System.Runtime.Versioning;
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
///         needs no stored secret. Linux has no DPAPI; the Secret Service (GNOME Keyring, KWallet, …) is
///         used through <c>secret-tool</c> when it is installed, and the mode is reported as unavailable
///         otherwise instead of falling back to an unprotected file.
///     </para>
///     <para>
///         TPM mode wraps the AES key with an RSA key held by the machine's TPM, so the file cannot be
///         decrypted anywhere else and no prompt is needed.
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
    private const byte TpmMode = 3;

    // OWASP's floor for PBKDF2-HMAC-SHA256; the cost only shows on unlock, once per launch.
    private const int Iterations = 600_000;
    private const int SaltSize = 16;
    private const int NonceSize = 12;
    private const int TagSize = 16;
    private const int KeySize = 32;

    private const string TpmKeyName = "AntiBot-Session";

    private static readonly string FilePath = Path.Combine(Constants.DataDirectory, "auth.bin");

    private static bool? _tpmAvailable;

    /// <summary>Whether the platform can protect the session without a password.</summary>
    public static bool IsSystemStorageAvailable =>
        OperatingSystem.IsWindows() || (OperatingSystem.IsLinux() && Keyring.Available);

    /// <summary>The name the account page shows for <see cref="AuthStorage.System" />.</summary>
    public static string SystemStorageName =>
        OperatingSystem.IsWindows() ? "Windows DPAPI" :
        OperatingSystem.IsLinux() && Keyring.Available ? "System keyring" :
        "Not available";

    /// <summary>Whether this machine has a TPM that can hold the wrapping key.</summary>
    public static bool IsTpmAvailable => _tpmAvailable ??= OperatingSystem.IsWindows() && ProbeTpm();

    public static bool Exists =>
        File.Exists(FilePath) || (OperatingSystem.IsLinux() && Keyring.HasEntry());

    /// <summary>How the session on disk is protected, or <see cref="AuthStorage.None" /> when there is none.</summary>
    public static AuthStorage StoredMode
    {
        get
        {
            if (File.Exists(FilePath))
                return FileMode();

            if (OperatingSystem.IsLinux() && Keyring.HasEntry())
                return AuthStorage.System;

            return AuthStorage.None;
        }
    }

    /// <summary>
    ///     Writes the payload in <paramref name="mode" />. Returns false when that mode needs a password
    ///     that was not supplied, or is not supported on this platform.
    /// </summary>
    public static async Task<bool> SaveAsync(byte[] payload, AuthStorage mode, string? password,
        CancellationToken token = default)
    {
        switch (mode)
        {
            case AuthStorage.None:
                Delete();
                return true;

            case AuthStorage.Password when password is { Length: > 0 }:
                await WriteAsync(PasswordMode, ProtectWithPassword(payload, password), token);
                return true;

            case AuthStorage.Password:
                return false;

            case AuthStorage.System when OperatingSystem.IsWindows():
                await WriteAsync(DpapiMode, ProtectedData.Protect(payload, Entropy, DataProtectionScope.CurrentUser),
                    token);
                return true;

            case AuthStorage.System when OperatingSystem.IsLinux() && Keyring.Available:
                if (!Keyring.Store(payload))
                    return false;

                // The session no longer lives in a file, so an older one must not linger beside it.
                Try.Run(() => File.Delete(FilePath));
                return true;

            case AuthStorage.Tpm when OperatingSystem.IsWindows() && IsTpmAvailable:
                await WriteAsync(TpmMode, ProtectWithTpm(payload), token);
                return true;

            default:
                return false;
        }
    }

    /// <summary>
    ///     Reads the payload back, or null when the session is missing, damaged, or needs another password.
    /// </summary>
    public static async Task<byte[]?> LoadAsync(string? password, CancellationToken token = default)
    {
        if (File.Exists(FilePath))
            return await LoadFileAsync(password, token);

        return OperatingSystem.IsLinux() ? Keyring.Load() : null;
    }

    public static void Delete()
    {
        Try.Run(() => File.Delete(FilePath)).OnFailure(ex => Log.Warning(ex, "Could not delete the stored session"));

        if (OperatingSystem.IsLinux() && Keyring.Available)
            Keyring.Clear();

        if (OperatingSystem.IsWindows())
            DeleteTpmKey();
    }

    private static AuthStorage FileMode()
    {
        try
        {
            using var stream = File.OpenRead(FilePath);
            var header = new byte[Magic.Length + 2];
            if (stream.ReadAtLeast(header, header.Length, false) < header.Length)
                return AuthStorage.None;

            return header[Magic.Length + 1] switch
            {
                PasswordMode => AuthStorage.Password,
                TpmMode => AuthStorage.Tpm,
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

    private static async Task<byte[]?> LoadFileAsync(string? password, CancellationToken token)
    {
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

                TpmMode when OperatingSystem.IsWindows() => UnprotectWithTpm(body),

                // A plain file is only left over from the old Linux fallback; reading it lets the next
                // save move the session into the keyring.
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

    private static async Task WriteAsync(byte marker, byte[] body, CancellationToken token)
    {
        var file = new byte[Magic.Length + 2 + body.Length];
        Magic.CopyTo(file, 0);
        file[Magic.Length] = Version;
        file[Magic.Length + 1] = marker;
        body.CopyTo(file, Magic.Length + 2);

        var temporary = FilePath + ".tmp";
        await File.WriteAllBytesAsync(temporary, file, token);

        // A file in the data folder is owner-only from the moment it exists, so there is no window
        // where another local account could read it.
        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, FilePath, true);
    }

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

    [SupportedOSPlatform("windows")]
    private static bool ProbeTpm()
    {
        try
        {
            using var key = CngKey.Create(CngAlgorithm.Rsa, TpmKeyName + "-probe", TpmKeyCreation());
            key.Delete();
            return true;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "No usable TPM");
            return false;
        }
    }

    [SupportedOSPlatform("windows")]
    private static byte[] ProtectWithTpm(byte[] payload)
    {
        using var key = OpenOrCreateTpmKey();
        using var rsa = new RSACng(key);

        var sessionKey = RandomNumberGenerator.GetBytes(KeySize);
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var tag = new byte[TagSize];
        var cipher = new byte[payload.Length];

        try
        {
            using (var aes = new AesGcm(sessionKey, TagSize))
                aes.Encrypt(nonce, payload, cipher, tag);

            var wrapped = rsa.Encrypt(sessionKey, RSAEncryptionPadding.OaepSHA256);

            var body = new byte[2 + wrapped.Length + NonceSize + TagSize + cipher.Length];
            body[0] = (byte)(wrapped.Length >> 8);
            body[1] = (byte)wrapped.Length;
            wrapped.CopyTo(body, 2);
            nonce.CopyTo(body, 2 + wrapped.Length);
            tag.CopyTo(body, 2 + wrapped.Length + NonceSize);
            cipher.CopyTo(body, 2 + wrapped.Length + NonceSize + TagSize);
            return body;
        }
        finally
        {
            CryptographicOperations.ZeroMemory(sessionKey);
        }
    }

    [SupportedOSPlatform("windows")]
    private static byte[]? UnprotectWithTpm(ReadOnlySpan<byte> body)
    {
        if (body.Length < 2 + NonceSize + TagSize)
            return null;

        var wrappedLength = (body[0] << 8) | body[1];
        if (body.Length < 2 + wrappedLength + NonceSize + TagSize)
            return null;

        var wrapped = body.Slice(2, wrappedLength).ToArray();
        var nonce = body.Slice(2 + wrappedLength, NonceSize).ToArray();
        var tag = body.Slice(2 + wrappedLength + NonceSize, TagSize).ToArray();
        var cipher = body[(2 + wrappedLength + NonceSize + TagSize)..].ToArray();

        try
        {
            using var key = CngKey.Open(TpmKeyName, new CngProvider("Microsoft Platform Crypto Provider"));
            using var rsa = new RSACng(key);

            var sessionKey = rsa.Decrypt(wrapped, RSAEncryptionPadding.OaepSHA256);
            try
            {
                var plain = new byte[cipher.Length];
                using var aes = new AesGcm(sessionKey, TagSize);
                aes.Decrypt(nonce, cipher, tag, plain);
                return plain;
            }
            finally
            {
                CryptographicOperations.ZeroMemory(sessionKey);
            }
        }
        catch (CryptographicException ex)
        {
            Log.Warning(ex, "Could not unwrap the session with the TPM key");
            return null;
        }
    }

    [SupportedOSPlatform("windows")]
    private static CngKey OpenOrCreateTpmKey()
    {
        try
        {
            return CngKey.Open(TpmKeyName, new CngProvider("Microsoft Platform Crypto Provider"));
        }
        catch (CryptographicException)
        {
            return CngKey.Create(CngAlgorithm.Rsa, TpmKeyName, TpmKeyCreation());
        }
    }

    [SupportedOSPlatform("windows")]
    private static CngKeyCreationParameters TpmKeyCreation() => new()
    {
        Provider = new CngProvider("Microsoft Platform Crypto Provider"),
        KeyUsage = CngKeyUsages.AllUsages,
        ExportPolicy = CngExportPolicies.None,
        Parameters =
        {
            new CngProperty("Length", BitConverter.GetBytes(2048), CngPropertyOptions.None)
        }
    };

    [SupportedOSPlatform("windows")]
    private static void DeleteTpmKey() =>
        Try.Run(() =>
        {
            using var key = CngKey.Open(TpmKeyName, new CngProvider("Microsoft Platform Crypto Provider"));
            key.Delete();
        });

    /// <summary>
    ///     The freedesktop Secret Service, reached through <c>secret-tool</c>. It is only used when the
    ///     command is installed and a keyring answers, because a silent failure would leave the session
    ///     stored nowhere.
    /// </summary>
    private static class Keyring
    {
        private const string Command = "secret-tool";
        private const string Label = "AntiBot VRChat session";
        private static readonly string[] Attributes = ["application", "antibot"];

        private static bool? _available;

        public static bool Available => _available ??= Probe();

        public static bool HasEntry() => Run(["lookup", ..Attributes]).Output is { Length: > 0 };

        public static byte[]? Load()
        {
            var output = Run(["lookup", ..Attributes]).Output;
            return output is { Length: > 0 }
                ? Try.Run(() => Convert.FromBase64String(output)).GetOrNull()
                : null;
        }

        public static bool Store(byte[] payload) =>
            Run(["store", $"--label={Label}", ..Attributes], Convert.ToBase64String(payload)).Ran;

        public static void Clear() => Run(["clear", ..Attributes]);

        private static bool Probe() =>
            OperatingSystem.IsLinux() && Run(["lookup", ..Attributes]).Ran;

        private static (bool Ran, string? Output) Run(string[] arguments, string? input = null)
        {
            try
            {
                using var process = new Process
                {
                    StartInfo = new()
                    {
                        FileName = Command,
                        RedirectStandardInput = true,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                foreach (var argument in arguments)
                    process.StartInfo.ArgumentList.Add(argument);

                process.Start();

                if (input is not null)
                    process.StandardInput.Write(input);

                process.StandardInput.Close();

                var output = process.StandardOutput.ReadToEnd();
                process.WaitForExit(5000);

                return (true, process.ExitCode == 0 ? output : null);
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "The Secret Service is not reachable through {Command}", Command);
                return (false, null);
            }
        }
    }
}

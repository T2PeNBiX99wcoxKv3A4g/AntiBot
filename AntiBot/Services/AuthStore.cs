using System.Diagnostics;
using System.Security.Cryptography;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>How a stored session was read back.</summary>
internal enum SessionLoadStatus
{
    /// <summary>There is no stored session, or it can no longer be opened.</summary>
    None,

    /// <summary>The payload was decrypted.</summary>
    Loaded,

    /// <summary>The user dismissed the Windows Hello prompt; the session is still there.</summary>
    Cancelled
}

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
///         TPM mode wraps the AES key with a key held by the machine's TPM; Hello mode wraps it with a
///         key whose use requires the Windows Hello prompt.
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
    private const byte HelloMode = 4;
    private const byte SoftwareMode = 5;

    // OWASP's floor for PBKDF2-HMAC-SHA256; the cost only shows on unlock, once per launch.
    private const int Iterations = 600_000;
    private const int SaltSize = 16;
    private const int NonceSize = 12;
    private const int TagSize = 16;
    private const int KeySize = 32;

    private static readonly string FilePath = Path.Combine(Constants.DataDirectory, "auth.bin");
    private static readonly string KeyPath = Path.Combine(Constants.DataDirectory, "auth.key");

    /// <summary>Whether the platform can protect the session without a password.</summary>
    public static bool IsSystemStorageAvailable =>
        OperatingSystem.IsWindows() || (OperatingSystem.IsLinux() && Keyring.Available);

    /// <summary>The name the account page shows for <see cref="AuthStorage.System" />.</summary>
    public static string SystemStorageName =>
        OperatingSystem.IsWindows() ? "Windows DPAPI" :
        OperatingSystem.IsLinux() && Keyring.Available ? "System keyring" :
        "Not available";

    /// <summary>Whether this machine has a TPM that can hold the wrapping key.</summary>
    public static bool IsTpmAvailable => TpmStore.IsAvailable;

    /// <summary>Whether Windows Hello can gate a wrapping key on this machine.</summary>
    public static bool IsHelloAvailable => OperatingSystem.IsWindows() && HelloStore.IsAvailable;

    /// <summary>The key-file mode is offered on Linux, where the other options depend on extra packages.</summary>
    public static bool IsSoftwareAvailable => OperatingSystem.IsLinux();

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

            case AuthStorage.Tpm when TpmStore.IsAvailable:
                await WriteAsync(TpmMode, TpmStore.Protect(payload), token);
                return true;

            case AuthStorage.Hello when OperatingSystem.IsWindows() && HelloStore.IsAvailable:
                await WriteAsync(HelloMode, HelloStore.Protect(payload), token);
                return true;

            case AuthStorage.Software when IsSoftwareAvailable:
                await WriteAsync(SoftwareMode, ProtectWithSoftwareKey(payload), token);
                return true;

            default:
                return false;
        }
    }

    /// <summary>
    ///     Reads the payload back. <see cref="SessionLoadStatus.Cancelled" /> means the session exists but
    ///     the user dismissed the Windows Hello prompt.
    /// </summary>
    public static async Task<(SessionLoadStatus Status, byte[]? Payload)> LoadAsync(string? password,
        CancellationToken token = default)
    {
        if (File.Exists(FilePath))
            return await LoadFileAsync(password, token);

        if (OperatingSystem.IsLinux() && Keyring.HasEntry())
        {
            var payload = Keyring.Load();
            return payload is null ? (SessionLoadStatus.None, null) : (SessionLoadStatus.Loaded, payload);
        }

        return (SessionLoadStatus.None, null);
    }

    public static void Delete()
    {
        Try.Run(() => File.Delete(FilePath)).OnFailure(ex => Log.Warning(ex, "Could not delete the stored session"));
        Try.Run(() => File.Delete(KeyPath));

        if (OperatingSystem.IsLinux() && Keyring.Available)
            Keyring.Clear();

        TpmStore.Delete();

        if (OperatingSystem.IsWindows())
            HelloStore.Delete();
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
                HelloMode => AuthStorage.Hello,
                SoftwareMode => AuthStorage.Software,
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

    private static async Task<(SessionLoadStatus Status, byte[]? Payload)> LoadFileAsync(string? password,
        CancellationToken token)
    {
        try
        {
            var file = await File.ReadAllBytesAsync(FilePath, token);
            if (file.Length < Magic.Length + 2 ||
                !file.AsSpan(0, Magic.Length).SequenceEqual(Magic) ||
                file[Magic.Length] != Version)
                return (SessionLoadStatus.None, null);

            var body = file.AsSpan(Magic.Length + 2);

            switch (file[Magic.Length + 1])
            {
                case DpapiMode when OperatingSystem.IsWindows():
                    return (SessionLoadStatus.Loaded,
                        ProtectedData.Unprotect(body.ToArray(), Entropy, DataProtectionScope.CurrentUser));

                case TpmMode when TpmStore.IsAvailable:
                    var tpmPayload = TpmStore.Unprotect(body);
                    return tpmPayload is null ? (SessionLoadStatus.None, null) : (SessionLoadStatus.Loaded, tpmPayload);

                case HelloMode when OperatingSystem.IsWindows() && HelloStore.IsAvailable:
                    var (cancelled, helloPayload) = HelloStore.Unprotect(body);
                    return cancelled ? (SessionLoadStatus.Cancelled, null) :
                        helloPayload is null ? (SessionLoadStatus.None, null) :
                        (SessionLoadStatus.Loaded, helloPayload);

                case SoftwareMode when IsSoftwareAvailable:
                    var softwarePayload = UnprotectWithSoftwareKey(body);
                    return softwarePayload is null ? (SessionLoadStatus.None, null) :
                        (SessionLoadStatus.Loaded, softwarePayload);

                // A plain file is only left over from the old Linux fallback; reading it lets the next
                // save move the session into the keyring.
                case PlainMode:
                    return (SessionLoadStatus.Loaded, body.ToArray());

                case PasswordMode when password is { Length: > 0 }:
                    var passwordPayload = UnprotectWithPassword(body, password);
                    return passwordPayload is null ? (SessionLoadStatus.None, null) :
                        (SessionLoadStatus.Loaded, passwordPayload);

                default:
                    return (SessionLoadStatus.None, null);
            }
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the stored VRChat session");
            return (SessionLoadStatus.None, null);
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

    private static byte[] ProtectWithSoftwareKey(byte[] payload)
    {
        var key = LoadOrCreateSoftwareKey();
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

    private static byte[]? UnprotectWithSoftwareKey(ReadOnlySpan<byte> body)
    {
        if (body.Length < NonceSize + TagSize)
            return null;

        var key = TryLoadSoftwareKey();
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

    /// <summary>The key file is written owner-only; anyone who can read it can decrypt the session.</summary>
    private static byte[] LoadOrCreateSoftwareKey()
    {
        if (TryLoadSoftwareKey() is { } existing)
            return existing;

        var key = RandomNumberGenerator.GetBytes(KeySize);
        var temporary = KeyPath + ".tmp";
        File.WriteAllBytes(temporary, key);

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, KeyPath, true);
        return key;
    }

    private static byte[]? TryLoadSoftwareKey()
    {
        try
        {
            return File.Exists(KeyPath) ? File.ReadAllBytes(KeyPath) : null;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the session key file");
            return null;
        }
    }

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

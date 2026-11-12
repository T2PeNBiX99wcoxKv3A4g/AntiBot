using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using AntiBot.Models;
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
///     Keeps one VRChat session per account folder, in the way the account page offers.
/// </summary>
/// <remarks>
///     <para>
///         Every account has its own folder, so its storage mode, salt and wrapped key are independent
///         of the other accounts. The folder name is a hash of the account id, which is the scope handed
///         to the TPM, Windows Hello and the keyring so their entries cannot be swapped between accounts.
///     </para>
///     <para>
///         The password itself is never written. Password mode derives a key with PBKDF2 over a random
///         per-account salt and encrypts with AES-GCM, so unlocking has to ask for the password again.
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
    private static readonly byte[] Magic = [.. "ABAT"u8];

    /// <summary>The entropy used before accounts had their own folders.</summary>
    private static readonly byte[] LegacyEntropy = [.. "AntiBot/auth/v1"u8];

    /// <summary>Whether the platform can protect the session without a password.</summary>
    public static bool IsSystemStorageAvailable =>
        OperatingSystem.IsWindows() || OperatingSystem.IsLinux() && Keyring.Available;

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

    /// <summary>The single session file written before accounts had their own folders.</summary>
    private static string LegacySessionPath => Path.Combine(Constants.DataDirectory, "auth.bin");

    private static string LegacyKeyPath => Path.Combine(Constants.DataDirectory, "auth.key");
    private static string LegacyChoicePath => Path.Combine(Constants.DataDirectory, "auth.chosen");

    /// <summary>Whether a session from an older version is still waiting to be moved into an account.</summary>
    public static bool LegacyExists =>
        File.Exists(LegacySessionPath) || OperatingSystem.IsLinux() && Keyring.LegacyHasEntry();

    public static bool LegacyChoiceMade => File.Exists(LegacyChoicePath);

    /// <summary>The mode of the pre-account session, if there is one.</summary>
    public static AuthStorage LegacyMode =>
        File.Exists(LegacySessionPath) ? ModeOf(LegacySlot) :
        OperatingSystem.IsLinux() && Keyring.LegacyHasEntry() ? AuthStorage.System :
        AuthStorage.None;

    private static Slot LegacySlot => new(LegacySessionPath, LegacyKeyPath, null);

    /// <summary>The scope the platform stores use for an account, so their entries cannot collide.</summary>
    public static string Scope(string directory) => Path.GetFileName(directory);

    public static string SessionPath(string directory) => Path.Combine(directory, "session.bin");

    private static string KeyPath(string directory) => Path.Combine(directory, "session.key");
    private static string ChoicePath(string directory) => Path.Combine(directory, "chosen");

    public static bool Exists(string directory) =>
        File.Exists(SessionPath(directory)) ||
        OperatingSystem.IsLinux() && Keyring.HasEntry(Scope(directory));

    /// <summary>Whether the user has already chosen how this account's session is kept.</summary>
    public static bool ChoiceMade(string directory) => File.Exists(ChoicePath(directory));

    public static void MarkChoiceMade(string directory) =>
        Try.Run(() =>
        {
            Directory.CreateDirectory(directory);
            File.WriteAllText(ChoicePath(directory), "1");
        });

    /// <summary>How the session on disk is protected, or <see cref="AuthStorage.None" /> when there is none.</summary>
    public static AuthStorage StoredMode(string directory)
    {
        if (File.Exists(SessionPath(directory)))
            return ModeOf(SlotOf(directory));

        if (OperatingSystem.IsLinux() && Keyring.HasEntry(Scope(directory)))
            return AuthStorage.System;

        return AuthStorage.None;
    }

    /// <summary>
    ///     Writes the payload in <paramref name="mode" />. Returns false when that mode needs a password
    ///     that was not supplied, or is not supported on this platform.
    /// </summary>
    public static async Task<bool> SaveAsync(string directory, byte[] payload, AuthStorage mode, string? password,
        CancellationToken token = default)
    {
        var scope = Scope(directory);

        switch (mode)
        {
            case AuthStorage.None:
                // "Do not remember" must leave nothing behind, not even a marker file.
                Delete(directory);
                return true;

            case AuthStorage.Password when password is { Length: > 0 }:
                await WriteAsync(SlotOf(directory), PasswordMode, ProtectWithPassword(payload, password), token);
                return true;

            case AuthStorage.Password:
                return false;

            case AuthStorage.System when OperatingSystem.IsWindows():
                await WriteAsync(SlotOf(directory), DpapiMode,
                    ProtectedData.Protect(payload, Entropy(scope), DataProtectionScope.CurrentUser), token);
                return true;

            case AuthStorage.System when OperatingSystem.IsLinux() && Keyring.Available:
                if (!Keyring.Store(scope, payload))
                    return false;

                // The session no longer lives in a file, so an older one must not linger beside it.
                Try.Run(() => File.Delete(SessionPath(directory)));
                return true;

            case AuthStorage.Tpm when TpmStore.IsAvailable:
                await WriteAsync(SlotOf(directory), TpmMode, TpmStore.Protect(scope, payload), token);
                return true;

            case AuthStorage.Hello when OperatingSystem.IsWindows() && HelloStore.IsAvailable:
                await WriteAsync(SlotOf(directory), HelloMode, HelloStore.Protect(scope, payload), token);
                return true;

            case AuthStorage.Software when IsSoftwareAvailable:
                await WriteAsync(SlotOf(directory), SoftwareMode,
                    ProtectWithSoftwareKey(SlotOf(directory), payload), token);
                return true;

            default:
                return false;
        }
    }

    /// <summary>
    ///     Reads the payload back. <see cref="SessionLoadStatus.Cancelled" /> means the session exists but
    ///     the user dismissed the Windows Hello prompt.
    /// </summary>
    public static Task<(SessionLoadStatus Status, byte[]? Payload)> LoadAsync(string directory, string? password,
        CancellationToken token = default)
    {
        if (File.Exists(SessionPath(directory)))
            return LoadFileAsync(SlotOf(directory), password, token);

        return LoadKeyringAsync(Scope(directory), token);
    }

    /// <summary>Reads the pre-account session file, so it can be moved into an account folder.</summary>
    public static Task<(SessionLoadStatus Status, byte[]? Payload)> LoadLegacyAsync(string? password,
        CancellationToken token = default)
    {
        if (File.Exists(LegacySessionPath))
            return LoadFileAsync(LegacySlot, password, token);

        return LoadKeyringAsync(null, token);
    }

    public static void Delete(string directory)
    {
        var scope = Scope(directory);

        Try.Run(() => File.Delete(SessionPath(directory)))
            .OnFailure(ex => Log.Warning(ex, "Could not delete the stored session"));
        Try.Run(() => File.Delete(KeyPath(directory)));
        Try.Run(() => File.Delete(ChoicePath(directory)));

        if (OperatingSystem.IsLinux() && Keyring.Available)
            Keyring.Clear(scope);

        TpmStore.Delete(scope);

        if (OperatingSystem.IsWindows())
            HelloStore.Delete();
    }

    /// <summary>Removes the pre-account session file once it has been moved into an account folder.</summary>
    public static void DeleteLegacy()
    {
        Try.Run(() => File.Delete(LegacySessionPath));
        Try.Run(() => File.Delete(LegacyKeyPath));
        Try.Run(() => File.Delete(LegacyChoicePath));

        if (OperatingSystem.IsLinux() && Keyring.Available)
            Keyring.LegacyClear();

        TpmStore.Delete(null);

        if (OperatingSystem.IsWindows())
            HelloStore.Delete();
    }

    private static Slot SlotOf(string directory) =>
        new(SessionPath(directory), KeyPath(directory), Scope(directory));

    /// <summary>Extra DPAPI entropy, so another app's blob cannot be swapped in.</summary>
    private static byte[] Entropy(string scope) => [.. "AntiBot/auth/v1/"u8, .. Encoding.UTF8.GetBytes(scope)];

    private static AuthStorage ModeOf(Slot slot)
    {
        try
        {
            using var stream = File.OpenRead(slot.Session);
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

    private static async Task<(SessionLoadStatus Status, byte[]? Payload)> LoadKeyringAsync(string? scope,
        CancellationToken token)
    {
        await Task.CompletedTask;

        if (!OperatingSystem.IsLinux())
            return (SessionLoadStatus.None, null);

        var entry = scope is null ? Keyring.LegacyLoad() : Keyring.Load(scope);
        return entry is null ? (SessionLoadStatus.None, null) : (SessionLoadStatus.Loaded, entry);
    }

    private static async Task<(SessionLoadStatus Status, byte[]? Payload)> LoadFileAsync(Slot slot,
        string? password, CancellationToken token)
    {
        try
        {
            var file = await File.ReadAllBytesAsync(slot.Session, token);
            if (file.Length < Magic.Length + 2 ||
                !file.AsSpan(0, Magic.Length).SequenceEqual(Magic) ||
                file[Magic.Length] != Version)
                return (SessionLoadStatus.None, null);

            var body = file.AsSpan(Magic.Length + 2);
            var scope = slot.Scope;

            switch (file[Magic.Length + 1])
            {
                case DpapiMode when OperatingSystem.IsWindows():
                    return (SessionLoadStatus.Loaded,
                        ProtectedData.Unprotect([.. body], scope is null ? LegacyEntropy : Entropy(scope),
                            DataProtectionScope.CurrentUser));

                case TpmMode when TpmStore.IsAvailable:
                    var tpmPayload = TpmStore.Unprotect(scope, body);
                    return tpmPayload is null ? (SessionLoadStatus.None, null) : (SessionLoadStatus.Loaded, tpmPayload);

                case HelloMode when OperatingSystem.IsWindows() && HelloStore.IsAvailable:
                    var (cancelled, helloPayload) = HelloStore.Unprotect(scope, body);
                    return cancelled ? (SessionLoadStatus.Cancelled, null) :
                        helloPayload is null ? (SessionLoadStatus.None, null) :
                        (SessionLoadStatus.Loaded, helloPayload);

                case SoftwareMode when IsSoftwareAvailable:
                    var softwarePayload = UnprotectWithSoftwareKey(slot, body);
                    return softwarePayload is null
                        ? (SessionLoadStatus.None, null)
                        : (SessionLoadStatus.Loaded, softwarePayload);

                // A plain file is only left over from the old Linux fallback; reading it lets the next
                // save move the session into the keyring.
                case PlainMode:
                    return (SessionLoadStatus.Loaded, [.. body]);

                case PasswordMode when password is { Length: > 0 }:
                    var passwordPayload = UnprotectWithPassword(body, password);
                    return passwordPayload is null
                        ? (SessionLoadStatus.None, null)
                        : (SessionLoadStatus.Loaded, passwordPayload);

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

    private static async Task WriteAsync(Slot slot, byte marker, byte[] body, CancellationToken token)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(slot.Session)!);

        var file = new byte[Magic.Length + 2 + body.Length];
        Magic.CopyTo(file, 0);
        file[Magic.Length] = Version;
        file[Magic.Length + 1] = marker;
        body.CopyTo(file, Magic.Length + 2);

        var temporary = slot.Session + ".tmp";
        await File.WriteAllBytesAsync(temporary, file, token);

        // A file in the data folder is owner-only from the moment it exists, so there is no window
        // where another local account could read it.
        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, slot.Session, true);
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

    private static byte[] ProtectWithSoftwareKey(Slot slot, byte[] payload)
    {
        var key = LoadOrCreateSoftwareKey(slot);
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

    private static byte[]? UnprotectWithSoftwareKey(Slot slot, ReadOnlySpan<byte> body)
    {
        if (body.Length < NonceSize + TagSize)
            return null;

        var key = TryLoadSoftwareKey(slot);
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
    private static byte[] LoadOrCreateSoftwareKey(Slot slot)
    {
        if (TryLoadSoftwareKey(slot) is { } existing)
            return existing;

        Directory.CreateDirectory(Path.GetDirectoryName(slot.Key)!);

        var key = RandomNumberGenerator.GetBytes(KeySize);
        var temporary = slot.Key + ".tmp";
        File.WriteAllBytes(temporary, key);

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(temporary, UnixFileMode.UserRead | UnixFileMode.UserWrite);

        File.Move(temporary, slot.Key, true);
        return key;
    }

    private static byte[]? TryLoadSoftwareKey(Slot slot)
    {
        try
        {
            return File.Exists(slot.Key) ? File.ReadAllBytes(slot.Key) : null;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not read the session key file");
            return null;
        }
    }

    /// <summary>The paths of one stored session: an account folder, or the pre-account file.</summary>
    private readonly record struct Slot(string Session, string Key, string? Scope);

    /// <summary>
    ///     The freedesktop Secret Service, reached through <c>secret-tool</c>. It is only used when the
    ///     command is installed and a keyring answers, because a silent failure would leave the session
    ///     stored nowhere. Each account gets its own entry, keyed by the folder hash.
    /// </summary>
    private static class Keyring
    {
        private const string Command = "secret-tool";
        private static readonly string[] Attributes = ["application", "antibot"];

        private static bool? _available;

        public static bool Available => _available ??= Probe();

        public static bool LegacyHasEntry() => Run(["lookup", .. Attributes]).Output is { Length: > 0 };

        public static byte[]? LegacyLoad()
        {
            var output = Run(["lookup", .. Attributes]).Output;
            return output is { Length: > 0 }
                ? Try.Run(() => Convert.FromBase64String(output)).GetOrNull()
                : null;
        }

        public static void LegacyClear() => Run(["clear", .. Attributes]);

        public static bool HasEntry(string scope) => Run(["lookup", .. AttributesOf(scope)]).Output is { Length: > 0 };

        public static byte[]? Load(string scope)
        {
            var output = Run(["lookup", .. AttributesOf(scope)]).Output;
            return output is { Length: > 0 }
                ? Try.Run(() => Convert.FromBase64String(output)).GetOrNull()
                : null;
        }

        public static bool Store(string scope, byte[] payload) =>
            Run(["store", $"--label=AntiBot VRChat session {scope[..8]}", .. AttributesOf(scope)],
                Convert.ToBase64String(payload)).Ran;

        public static void Clear(string scope) => Run(["clear", .. AttributesOf(scope)]);

        private static string[] AttributesOf(string scope) => [.. Attributes, "account", scope];

        private static bool Probe() =>
            OperatingSystem.IsLinux() && Run(["lookup", .. Attributes]).Ran;

        private static (bool Ran, string? Output) Run(string[] arguments, string? input = null)
        {
            try
            {
                using var process = new Process();
                process.StartInfo = new()
                {
                    FileName = Command,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
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
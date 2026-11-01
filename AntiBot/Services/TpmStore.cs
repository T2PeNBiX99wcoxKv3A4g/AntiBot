using System.Diagnostics;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     Wraps the session's AES key with a key held by the machine's TPM: CNG on Windows, the tpm2-tss
///     command-line tools on Linux.
/// </summary>
/// <remarks>
///     The body layout is the same on both platforms:
///     <c>
///         wrappedLen(2) | wrapped | nonce(12) |
///         tag(16) | ciphertext
///     </c>
///     . On Windows <c>wrapped</c> is the RSA-OAEP encrypted session key; on
///     Linux it is the TPM sealed blob (public and private parts).
/// </remarks>
internal static class TpmStore
{
    private const string WindowsKeyName = "AntiBot-Session";

    private const int KeySize = 32;
    private const int NonceSize = 12;
    private const int TagSize = 16;

    private static bool? _available;

    public static bool IsAvailable => _available ??= OperatingSystem.IsWindows()
        ? ProbeWindows()
        : OperatingSystem.IsLinux() && Tpm2Tools.IsAvailable;

    /// <summary>The CNG key of one account, or the shared key written before accounts had folders.</summary>
    private static string KeyName(string? scope) => scope is null ? WindowsKeyName : $"{WindowsKeyName}-{scope}";

    public static byte[] Protect(string? scope, byte[] payload) => OperatingSystem.IsWindows()
        ? ProtectWindows(scope, payload)
        : ProtectLinux(payload);

    public static byte[]? Unprotect(string? scope, ReadOnlySpan<byte> body) => OperatingSystem.IsWindows()
        ? UnprotectWindows(scope, body)
        : UnprotectLinux(body);

    public static void Delete(string? scope)
    {
        if (OperatingSystem.IsWindows())
            DeleteWindowsKey(scope);
    }

    [SupportedOSPlatform("windows")]
    private static bool ProbeWindows()
    {
        try
        {
            using var key = CngKey.Create(CngAlgorithm.Rsa, WindowsKeyName + "-probe", WindowsKeyCreation());
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
    private static byte[] ProtectWindows(string? scope, byte[] payload)
    {
        using var key = OpenOrCreateWindowsKey(scope);
        using var rsa = new RSACng(key);

        var sessionKey = RandomNumberGenerator.GetBytes(KeySize);
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var tag = new byte[TagSize];
        var cipher = new byte[payload.Length];

        try
        {
            using (var aes = new AesGcm(sessionKey, TagSize))
                aes.Encrypt(nonce, payload, cipher, tag);

            return Wrap(rsa.Encrypt(sessionKey, RSAEncryptionPadding.OaepSHA256), nonce, tag, cipher);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(sessionKey);
        }
    }

    [SupportedOSPlatform("windows")]
    private static byte[]? UnprotectWindows(string? scope, ReadOnlySpan<byte> body)
    {
        if (!TryUnwrap(body, out var wrapped, out var nonce, out var tag, out var cipher))
            return null;

        try
        {
            using var key = CngKey.Open(KeyName(scope), new("Microsoft Platform Crypto Provider"));
            using var rsa = new RSACng(key);

            var sessionKey = rsa.Decrypt(wrapped, RSAEncryptionPadding.OaepSHA256);
            try
            {
                return Decrypt(sessionKey, nonce, tag, cipher);
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
    private static CngKey OpenOrCreateWindowsKey(string? scope)
    {
        var name = KeyName(scope);

        try
        {
            return CngKey.Open(name, new("Microsoft Platform Crypto Provider"));
        }
        catch (CryptographicException)
        {
            return CngKey.Create(CngAlgorithm.Rsa, name, WindowsKeyCreation());
        }
    }

    [SupportedOSPlatform("windows")]
    private static CngKeyCreationParameters WindowsKeyCreation() => new()
    {
        Provider = new("Microsoft Platform Crypto Provider"),
        KeyUsage = CngKeyUsages.AllUsages,
        ExportPolicy = CngExportPolicies.None,
        Parameters =
        {
            new("Length", BitConverter.GetBytes(2048), CngPropertyOptions.None)
        }
    };

    [SupportedOSPlatform("windows")]
    private static void DeleteWindowsKey(string? scope) =>
        Try.Run(() =>
        {
            using var key = CngKey.Open(KeyName(scope), new("Microsoft Platform Crypto Provider"));
            key.Delete();
        });

    private static byte[] ProtectLinux(byte[] payload)
    {
        var sessionKey = RandomNumberGenerator.GetBytes(KeySize);
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var tag = new byte[TagSize];
        var cipher = new byte[payload.Length];

        try
        {
            using (var aes = new AesGcm(sessionKey, TagSize))
                aes.Encrypt(nonce, payload, cipher, tag);

            return Wrap(Seal(sessionKey), nonce, tag, cipher);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(sessionKey);
        }
    }

    private static byte[]? UnprotectLinux(ReadOnlySpan<byte> body)
    {
        if (!TryUnwrap(body, out var wrapped, out var nonce, out var tag, out var cipher))
            return null;

        try
        {
            var sessionKey = Unseal(wrapped);
            if (sessionKey is null)
                return null;

            try
            {
                return Decrypt(sessionKey, nonce, tag, cipher);
            }
            finally
            {
                CryptographicOperations.ZeroMemory(sessionKey);
            }
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Could not unseal the session with the TPM");
            return null;
        }
    }

    /// <summary>Seals the session key into a blob only this TPM can unseal.</summary>
    private static byte[] Seal(byte[] secret)
    {
        var directory = CreatePrivateDirectory();

        try
        {
            var secretPath = Path.Combine(directory, "secret.bin");
            File.WriteAllBytes(secretPath, secret);

            if (!OperatingSystem.IsWindows())
                File.SetUnixFileMode(secretPath, UnixFileMode.UserRead | UnixFileMode.UserWrite);

            var primary = Path.Combine(directory, "primary.ctx");
            var publicPath = Path.Combine(directory, "key.pub");
            var privatePath = Path.Combine(directory, "key.priv");

            Tpm2Tools.Run("tpm2_createprimary", "-C", "n", "-c", primary);
            Tpm2Tools.Run("tpm2_create", "-C", primary, "-i", secretPath, "-u", publicPath, "-r", privatePath);

            var publicPart = File.ReadAllBytes(publicPath);
            var privatePart = File.ReadAllBytes(privatePath);

            var blob = new byte[8 + publicPart.Length + privatePart.Length];
            BitConverter.TryWriteBytes(blob.AsSpan(0), publicPart.Length);
            publicPart.CopyTo(blob, 4);
            BitConverter.TryWriteBytes(blob.AsSpan(4 + publicPart.Length), privatePart.Length);
            privatePart.CopyTo(blob, 8 + publicPart.Length);
            return blob;
        }
        finally
        {
            Try.Run(() => Directory.Delete(directory, true));
        }
    }

    private static byte[]? Unseal(ReadOnlySpan<byte> blob)
    {
        if (blob.Length < 8)
            return null;

        var publicLength = BitConverter.ToInt32(blob[..4]);
        if (publicLength < 0 || blob.Length < 8 + publicLength)
            return null;

        var privateLength = BitConverter.ToInt32(blob.Slice(4 + publicLength, 4));
        if (privateLength < 0 || blob.Length < 8 + publicLength + privateLength)
            return null;

        var publicPart = blob.Slice(4, publicLength).ToArray();
        var privatePart = blob.Slice(8 + publicLength, privateLength).ToArray();

        var directory = CreatePrivateDirectory();

        try
        {
            var primary = Path.Combine(directory, "primary.ctx");
            var publicPath = Path.Combine(directory, "key.pub");
            var privatePath = Path.Combine(directory, "key.priv");
            var keyContext = Path.Combine(directory, "key.ctx");

            File.WriteAllBytes(publicPath, publicPart);
            File.WriteAllBytes(privatePath, privatePart);

            Tpm2Tools.Run("tpm2_createprimary", "-C", "n", "-c", primary);
            Tpm2Tools.Run("tpm2_load", "-C", primary, "-u", publicPath, "-r", privatePath, "-c", keyContext);
            return Tpm2Tools.Run("tpm2_unseal", "-c", keyContext);
        }
        finally
        {
            Try.Run(() => Directory.Delete(directory, true));
        }
    }

    private static string CreatePrivateDirectory()
    {
        var directory = Directory.CreateTempSubdirectory("antibot-tpm-").FullName;

        if (!OperatingSystem.IsWindows())
            File.SetUnixFileMode(directory,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute);

        return directory;
    }

    private static byte[] Wrap(byte[] wrapped, byte[] nonce, byte[] tag, byte[] cipher)
    {
        var body = new byte[2 + wrapped.Length + NonceSize + TagSize + cipher.Length];
        body[0] = (byte)(wrapped.Length >> 8);
        body[1] = (byte)wrapped.Length;
        wrapped.CopyTo(body, 2);
        nonce.CopyTo(body, 2 + wrapped.Length);
        tag.CopyTo(body, 2 + wrapped.Length + NonceSize);
        cipher.CopyTo(body, 2 + wrapped.Length + NonceSize + TagSize);
        return body;
    }

    private static bool TryUnwrap(ReadOnlySpan<byte> body, out byte[] wrapped, out byte[] nonce, out byte[] tag,
        out byte[] cipher)
    {
        wrapped = nonce = tag = cipher = [];

        if (body.Length < 2 + NonceSize + TagSize)
            return false;

        var wrappedLength = body[0] << 8 | body[1];
        if (body.Length < 2 + wrappedLength + NonceSize + TagSize)
            return false;

        wrapped = [.. body.Slice(2, wrappedLength)];
        nonce = [.. body.Slice(2 + wrappedLength, NonceSize)];
        tag = [.. body.Slice(2 + wrappedLength + NonceSize, TagSize)];
        cipher = [.. body[(2 + wrappedLength + NonceSize + TagSize)..]];
        return true;
    }

    private static byte[]? Decrypt(byte[] sessionKey, byte[] nonce, byte[] tag, byte[] cipher)
    {
        try
        {
            var plain = new byte[cipher.Length];
            using var aes = new AesGcm(sessionKey, TagSize);
            aes.Decrypt(nonce, cipher, tag, plain);
            return plain;
        }
        catch (CryptographicException)
        {
            return null;
        }
    }

    /// <summary>The tpm2-tss command-line tools, which need the user to be able to open <c>/dev/tpmrm0</c>.</summary>
    private static class Tpm2Tools
    {
        private static bool? _available;

        public static bool IsAvailable => _available ??= Probe();

        public static byte[] Run(string command, params string[] arguments)
        {
            using var process = new Process
            {
                StartInfo = new()
                {
                    FileName = command,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            foreach (var argument in arguments)
                process.StartInfo.ArgumentList.Add(argument);

            process.Start();

            using var output = new MemoryStream();
            process.StandardOutput.BaseStream.CopyTo(output);
            var error = process.StandardError.ReadToEnd();
            process.WaitForExit();

            if (process.ExitCode != 0)
                throw new InvalidOperationException($"{command} failed: {error.Trim()}");

            return output.ToArray();
        }

        private static bool Probe()
        {
            try
            {
                Run("tpm2_getcap", "properties-fixed");
                return true;
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "tpm2-tools or the TPM is not usable");
                return false;
            }
        }
    }
}
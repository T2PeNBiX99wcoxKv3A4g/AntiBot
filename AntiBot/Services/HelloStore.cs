#if WINDOWS_DESKTOP
// The WinRT projection reports a minimum Windows build; the mode is only offered after a runtime
// availability check, so the analyzer's version warning is not useful here.
#pragma warning disable CA1416
using System.Runtime.Versioning;
using System.Security.Cryptography;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;
using Windows.Security.Credentials.UI;

namespace AntiBot.Services;

/// <summary>
///     Windows Hello mode: the session is DPAPI-encrypted, and unlocking it first asks Windows Hello to
///     confirm the user is there (PIN, fingerprint or face).
/// </summary>
/// <remarks>
///     The Windows SDK projection is referenced directly rather than through a Windows target framework,
///     so the same assembly still builds and runs on Linux; this file is only compiled on Windows.
/// </remarks>
[SupportedOSPlatform("windows")]
internal static class HelloStore
{
    private static readonly byte[] Entropy = "AntiBot/auth/hello/v1"u8.ToArray();

    private static bool? _available;

    public static bool IsAvailable => _available ??= Probe();

    public static byte[] Protect(byte[] payload) =>
        ProtectedData.Protect(payload, Entropy, DataProtectionScope.CurrentUser);

    /// <summary>Asks Windows Hello, then decrypts; a declined prompt is reported separately.</summary>
    public static (bool Cancelled, byte[]? Payload) Unprotect(ReadOnlySpan<byte> body)
    {
        if (!Verify())
            return (true, null);

        try
        {
            return (false, ProtectedData.Unprotect(body.ToArray(), Entropy, DataProtectionScope.CurrentUser));
        }
        catch (CryptographicException ex)
        {
            Log.Warning(ex, "Could not decrypt the session after Windows Hello confirmed the user");
            return (false, null);
        }
    }

    public static void Delete()
    {
        // The session lives in the file, so there is no key to remove.
    }

    private static bool Probe()
    {
        if (!OperatingSystem.IsWindows())
            return false;

        try
        {
            return UserConsentVerifier.CheckAvailabilityAsync().AsTask().GetAwaiter().GetResult() ==
                   UserConsentVerifierAvailability.Available;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Windows Hello is not available");
            return false;
        }
    }

    private static bool Verify()
    {
        try
        {
            return UserConsentVerifier.RequestVerificationAsync("Unlock the saved VRChat session")
                       .AsTask().GetAwaiter().GetResult() ==
                   UserConsentVerificationResult.Verified;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Windows Hello verification failed");
            return false;
        }
    }
}
#pragma warning restore CA1416
#else
using Serilog;

namespace AntiBot.Services;

/// <summary>Windows Hello is only compiled into Windows builds; elsewhere the mode is unavailable.</summary>
internal static class HelloStore
{
    public static bool IsAvailable => false;

    public static byte[] Protect(byte[] payload) => throw new PlatformNotSupportedException();

    public static (bool Cancelled, byte[]? Payload) Unprotect(ReadOnlySpan<byte> body) => (false, null);

    public static void Delete()
    {
    }
}
#endif

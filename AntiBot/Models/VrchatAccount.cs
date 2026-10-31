using JetBrains.Annotations;

namespace AntiBot.Models;

/// <summary>The signed-in VRChat account, as the interface shows it.</summary>
[PublicAPI]
public sealed record VrchatAccount(
    string Id,
    string DisplayName,
    string? AvatarUrl,
    string? Status,
    string? StatusDescription);

/// <summary>How the session cookie is kept between launches.</summary>
public enum AuthStorage
{
    /// <summary>Nothing is written; the next launch signs in again.</summary>
    None,

    /// <summary>Encrypted with a key derived from the password, which unlocking asks for again.</summary>
    Password,

    /// <summary>DPAPI on Windows, an owner-only file on Linux; unlocks without asking.</summary>
    System,

    /// <summary>The AES key is wrapped by a key held in the machine's TPM; no prompt.</summary>
    Tpm,

    /// <summary>The AES key is wrapped by a key that needs the Windows Hello prompt to be used.</summary>
    Hello,

    /// <summary>A key file stored beside the session; obfuscation only, not real protection.</summary>
    Software
}

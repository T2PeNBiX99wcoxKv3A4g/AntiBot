using JetBrains.Annotations;

namespace AntiBot.Models;

/// <summary>The signed-in VRChat account, as the interface shows it.</summary>
[PublicAPI]
public sealed record VrchatAccount(
    string Id,
    string DisplayName,
    string? AvatarUrl,
    string? StatusDescription);

/// <summary>How the session cookie is kept between launches.</summary>
public enum AuthStorage
{
    /// <summary>Nothing is written; the next launch signs in again.</summary>
    None,

    /// <summary>Encrypted with a key derived from the password, which unlocking asks for again.</summary>
    Password,

    /// <summary>DPAPI on Windows, an owner-only file on Linux; unlocks without asking.</summary>
    System
}

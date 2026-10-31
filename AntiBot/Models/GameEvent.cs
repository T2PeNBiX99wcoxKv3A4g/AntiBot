namespace AntiBot.Models;

/// <summary>
///     One thing the local log said that the instance state is built from, in the order it happened.
/// </summary>
/// <remarks>
///     Only these are written to the database. Storing every raw line would put megabytes of noise on
///     disk for nothing: the viewer keeps the recent lines in memory, and the state is rebuilt from
///     this small, ordered stream.
/// </remarks>
public sealed record GameEvent(
    string At,
    string Kind,
    string World = "",
    string Instance = "",
    string UserId = "",
    string DisplayName = "");

/// <summary>A VRChat user as last fetched from the API, kept so a joining player is not looked up twice.</summary>
public sealed record PlayerProfile(
    string Id,
    string DisplayName,
    string? AvatarUrl,
    string? IconUrl,
    string? AvatarImageUrl,
    string? Status,
    string? StatusDescription,
    string? Pronouns,
    string? Bio,
    string? DateJoined,
    string[] Tags,
    string? Platform,
    string? LastPlatform,
    string? LastActivity,
    bool IsFriend = false);
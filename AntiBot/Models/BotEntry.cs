namespace AntiBot.Models;

/// <summary>
///     One account the scoring called a bot. A user id appears once: every later sighting updates the
///     same row instead of adding another.
/// </summary>
public sealed record BotEntry(
    string UserId,
    string DisplayName,
    int Threat,
    ThreatReason[] Reasons,
    string? AvatarUrl,
    string? Trust,
    string? Platform,
    string? DateJoined,
    long FirstSeen,
    long LastSeen,
    int Sightings);

/// <summary>A stored bot row. <see cref="Removed" /> hides a row the user called a false positive.</summary>
internal sealed record BotRow(BotEntry Entry, bool Removed);

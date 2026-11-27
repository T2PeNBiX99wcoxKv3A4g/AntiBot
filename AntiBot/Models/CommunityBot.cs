namespace AntiBot.Models;

/// <summary>One row of the shared list, as stored in the repository.</summary>
public sealed record CommunityBot(
    string UserId,
    string DisplayName,
    int Threat,
    string[] Reasons,
    string? Platform,
    string? Trust,
    string? FirstSeen,
    string? LastSeen,
    int Sightings);

/// <summary>The shared list and when it was last updated.</summary>
public sealed record CommunitySnapshot(string UpdatedAt, IReadOnlyList<CommunityBot> Bots);

using JetBrains.Annotations;

namespace AntiBot.Models;

/// <summary>
///     An incoming friend request, with the sender described the same way the instance list describes
///     a player. Bots send these to get onto the friend list, which exposes the avatar and user id.
/// </summary>
[PublicAPI]
public sealed record FriendRequest(
    string Id,
    string UserId,
    string CreatedAt,
    bool Active,
    bool Rejected,
    long FirstSeen,
    InstanceUser User);

/// <summary>One stored request, without the profile that is looked up separately.</summary>
internal sealed record FriendRequestRow(
    string Id,
    string UserId,
    string DisplayName,
    string CreatedAt,
    bool Seen,
    bool Active,
    bool Rejected,
    long FirstSeen,
    long LastSeen);
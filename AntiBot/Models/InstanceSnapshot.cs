namespace AntiBot.Models;

/// <summary>One player the local log says is in the current instance.</summary>
public sealed record InstanceUser(
    string UserId,
    string Name,
    bool Local,
    string JoinedAt);

/// <summary>Who the local log currently places in the instance, and which instance that is.</summary>
public sealed record InstanceSnapshot(
    bool Running,
    string World,
    string Instance,
    IReadOnlyList<InstanceUser> Users);

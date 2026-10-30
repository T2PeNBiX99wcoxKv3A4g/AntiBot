namespace AntiBot.Models;

/// <summary>One player in the current instance.</summary>
public sealed record InstanceUser(
    string UserId,
    string Name,
    bool Local,
    string JoinedAt);

/// <summary>
///     Who is in the instance, and which instance that is. <see cref="Source" /> says whether the list
///     came from the VRChat API (<c>api</c>) or was rebuilt from the local log (<c>log</c>).
/// </summary>
public sealed record InstanceSnapshot(
    bool Running,
    string World,
    string Instance,
    IReadOnlyList<InstanceUser> Users,
    string Source = "log",
    string WorldName = "",
    int UserCount = 0,
    int Capacity = 0);

using JetBrains.Annotations;

namespace AntiBot.Models;

/// <summary>One automatic action AntiBot took, kept so it can be reviewed later.</summary>
[PublicAPI]
public sealed record OperationEntry(
    long Id,
    long At,
    string Kind,
    string UserId,
    string DisplayName,
    string Detail,
    string? AvatarUrl,
    bool Undone);

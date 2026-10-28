namespace AntiBot.Models;

/// <summary>Everything the viewer needs the first time it mounts.</summary>
public sealed record VrchatLogSnapshot(
    string Directory,
    bool Exists,
    string? File,
    string? ModifiedAt,
    IReadOnlyList<VrchatLogLine> Lines);

/// <summary>
///     Body of the <c>log.lines</c> push. <see cref="Reset" /> is set when the follower switched to a
///     different file, which tells the viewer to drop what it already had.
/// </summary>
public sealed record VrchatLogBatch(
    string? File,
    string? ModifiedAt,
    bool Reset,
    IReadOnlyList<VrchatLogLine> Lines);

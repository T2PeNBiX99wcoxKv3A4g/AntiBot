namespace AntiBot.Models;

/// <summary>Everything the viewer needs the first time it mounts.</summary>
public sealed record VrchatLogSnapshot(
    bool Exists,
    bool Running,
    IReadOnlyList<VrchatLogLine> Lines);

/// <summary>
///     Body of the <c>log.lines</c> push. <see cref="Reset" /> is set when the viewer should drop what
///     it already had: VRChat started or stopped, or the log folder changed.
/// </summary>
public sealed record VrchatLogBatch(
    bool Exists,
    bool Running,
    bool Reset,
    IReadOnlyList<VrchatLogLine> Lines);
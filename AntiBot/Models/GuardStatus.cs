namespace AntiBot.Models;

/// <summary>
///     Snapshot of the future detection pipeline. The scaffold only ever reports
///     <see cref="Idle" />; no VRChat data is observed yet.
/// </summary>
public sealed record GuardStatus(string State, bool Monitoring, int Observed, int Flagged)
{
    /// <summary>No monitoring session is running.</summary>
    public static GuardStatus Idle { get; } = new("idle", false, 0, 0);
}
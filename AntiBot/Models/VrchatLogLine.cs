namespace AntiBot.Models;

/// <summary>
///     One line of a VRChat output log, split into the parts the viewer renders. Continuation lines
///     (multi-line output that carries no timestamp of its own) have an empty <see cref="Time" />.
/// </summary>
public sealed record VrchatLogLine(long Id, string Time, string Level, string Message);

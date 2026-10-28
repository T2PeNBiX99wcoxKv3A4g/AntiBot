using System.Text.Json.Serialization;

namespace AntiBot.Models;

/// <summary>
///     One line of a VRChat output log, split into the parts the viewer renders. Continuation lines
///     (multi-line output that carries no timestamp of its own) have an empty <see cref="Time" />.
/// </summary>
public sealed record VrchatLogLine(long Id, string Time, string Level, string Message)
{
    /// <summary>The line exactly as it was read, so an export is not a reconstruction.</summary>
    [JsonIgnore]
    public string Raw { get; init; } = "";
}

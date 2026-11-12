namespace AntiBot.Services;

/// <summary>
///     Pulls a VRChat id out of whatever was pasted: the id itself, a profile or avatar link, or a
///     longer string that happens to contain one.
/// </summary>
internal static class Ids
{
    /// <summary>The <c>usr_…</c> id in the text, or null when there is no valid one.</summary>
    public static string? User(string? input) => Extract(input, "usr_");

    /// <summary>The <c>avtr_…</c> id in the text, or null when there is no valid one.</summary>
    public static string? Avatar(string? input) => Extract(input, "avtr_");

    /// <summary>An id is the prefix plus a 36-character GUID body.</summary>
    private static string? Extract(string? input, string prefix)
    {
        const int bodyLength = 36;

        if (input is not { Length: > 0 })
            return null;

        var start = input.IndexOf(prefix, StringComparison.OrdinalIgnoreCase);
        if (start < 0 || input.Length - start < prefix.Length + bodyLength)
            return null;

        var id = input.Substring(start, prefix.Length + bodyLength);
        return id[prefix.Length..].All(c => char.IsAsciiHexDigit(c) || c == '-') ? id : null;
    }
}
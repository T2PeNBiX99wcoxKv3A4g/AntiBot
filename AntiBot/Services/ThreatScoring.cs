using System.Text.RegularExpressions;
using AntiBot.Models;

namespace AntiBot.Services;

/// <summary>
///     Turns the signals a bot leaves behind into a 0-100 threat score: random-looking names, known
///     advertisement sites in the pronouns/status/bio, a bot-named avatar, and the Nuisance trust tag.
/// </summary>
internal static partial class ThreatScoring
{
    public static (int Score, string[] Reasons) Assess(PlayerProfile? profile, string? displayName,
        string? avatarName)
    {
        var score = 0;
        var reasons = new List<string>();

        void Add(int weight, string reason)
        {
            if (weight <= 0)
                return;

            score += weight;
            reasons.Add(reason);
        }

        Add(NameScore(profile?.DisplayName ?? displayName ?? ""), "generated-looking name");
        var text = string.Join('\n',
            new[] { profile?.Pronouns, profile?.StatusDescription, profile?.Bio }
                .Where(value => !string.IsNullOrWhiteSpace(value))).ToLowerInvariant();

        if (text.Contains("hexed"))
            Add(45, "known bot site (hexed.cc)");
        if (text.Contains("check bio"))
            Add(15, "status says \"check bio\"");
        if (text.Contains("reuploader") || text.Contains("bypass"))
            Add(20, "avatar-stealing wording");
        if (text.Contains("avatar database") || text.Contains("voice data"))
            Add(20, "data-collection wording");
        if (UrlPattern().IsMatch(text) && !text.Contains("hexed"))
            Add(10, "link in the profile");

        var tags = profile?.Tags ?? [];
        if (tags.Contains("system_troll"))
            Add(25, "Nuisance");
        else if (tags.Contains("system_probable_troll"))
            Add(15, "likely Nuisance");

        var avatar = avatarName ?? "";
        if (SexBotPattern().IsMatch(avatar))
            Add(25, "avatar named \"Sex Bot\"");
        else if (avatar == "Robot (default)")
            Add(5, "default avatar");

        return (Math.Min(score, 100), [.. reasons]);
    }

    /// <summary>
    ///     The sample bots end in a four-character hex tag and mix digits into the name. A plain year
    ///     such as "Alice 2024" also ends in four hex characters, so the part before the tag must carry
    ///     a digit too.
    /// </summary>
    private static int NameScore(string name)
    {
        if (name.Length == 0)
            return 0;

        var score = 0;
        var hexSuffix = HexSuffixPattern().IsMatch(name);
        var body = hexSuffix ? name[..^5] : name;

        // A plain number in a name ("20年はやる", "Alice 2024") is normal; only the generated
        // pattern (a hex tag plus digits in the name itself) counts.
        if (hexSuffix && DigitPattern().IsMatch(body))
            score += 50;

        if (MixedPattern().IsMatch(name))
            score += 10;

        return Math.Min(score, 60);
    }

    [GeneratedRegex(@"\s[0-9a-fA-F]{4}$", RegexOptions.CultureInvariant)]
    private static partial Regex HexSuffixPattern();

    [GeneratedRegex(@"[A-Za-z]{4,}\d{2,}[A-Za-z]{2,}", RegexOptions.CultureInvariant)]
    private static partial Regex MixedPattern();

    [GeneratedRegex(@"\d", RegexOptions.CultureInvariant)]
    private static partial Regex DigitPattern();

    [GeneratedRegex(@"https?://|www\.|\.(com|cc|net|gg|io)\b",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex UrlPattern();

    [GeneratedRegex(@"sex\s*bot", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex SexBotPattern();
}

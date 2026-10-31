using System.Text;
using System.Text.RegularExpressions;
using AntiBot.Models;

namespace AntiBot.Services;

/// <summary>
///     Scores how likely a user is a bot. Each signal adds to the total; the name is capped at 40 and
///     the total is deliberately not capped, so a profile matching several strong signals can exceed
///     100. The threshold in the settings decides when the automatic actions run.
/// </summary>
internal static partial class ThreatScoring
{
    /// <summary>Wording that only adds the small "something is off" weight.</summary>
    private static readonly string[] FuzzyTerms =
    [
        "hexed", "check bio", "hexed.cc", "reuploader", "bypass", "avatar database",
        "voice data", "banned", "collect avatars", "player locations", "buy now"
    ];

    public static (int Score, string[] Reasons) Assess(PlayerProfile? profile, string? displayName,
        string? avatarName, bool isRobot, string? platform)
    {
        var reasons = new List<string>();
        var score = 0;

        var (nameScore, nameReasons) = NameScore(profile?.DisplayName ?? displayName ?? "");
        score += nameScore;
        reasons.AddRange(nameReasons);

        // An unknown profile has no trust tags yet; do not treat that as Visitor.
        if (profile is not null)
        {
            var (trustScore, trustReason) = TrustScore(profile.Tags);
            if (trustScore > 0)
            {
                score += trustScore;
                reasons.Add(trustReason);
            }
        }

        score += TextScore(profile, reasons);

        // Only the two exact avatars are scored; a name that merely looks similar is not enough.
        if (string.Equals(avatarName?.Trim(), "Sex Bot", StringComparison.OrdinalIgnoreCase))
        {
            score += 10;
            reasons.Add("avatar named \"Sex Bot\"");
        }
        else if (isRobot)
        {
            score += 5;
            reasons.Add("default Robot avatar");
        }

        // Quest and iOS are very unlikely to host a bot; halve whatever the other signals added.
        if (score > 0 &&
            (string.Equals(platform, "android", StringComparison.OrdinalIgnoreCase) ||
             string.Equals(platform, "ios", StringComparison.OrdinalIgnoreCase)))
        {
            score /= 2;
            reasons.Add("Quest/iOS platform (score halved)");
        }

        return (score, [.. reasons]);
    }

    /// <summary>
    ///     VRChat's account rank. A Nuisance tag is the strongest signal; a Visitor with no rank is
    ///     the weakest account still worth looking at.
    /// </summary>
    private static (int Score, string Reason) TrustScore(string[] tags)
    {
        if (tags.Contains("system_troll"))
            return (60, "Nuisance");

        if (tags.Contains("system_probable_troll"))
            return (30, "probably Nuisance");

        if (tags.Contains("system_trust_veteran"))
            return (0, "");

        if (tags.Contains("system_trust_trusted"))
            return (5, "Known account");

        if (tags.Contains("system_trust_known"))
            return (10, "User account");

        if (tags.Contains("system_trust_basic"))
            return (20, "New User account");

        return (30, "Visitor account");
    }

    /// <summary>
    ///     The generated-name signals. Each feature adds its own weight, capped at 40 so a name alone
    ///     can never reach the default threshold.
    /// </summary>
    private static (int Score, string[] Reasons) NameScore(string name)
    {
        if (name.Length == 0)
            return (0, []);

        var score = 0;
        var reasons = new List<string>();
        var hexSuffix = HexSuffixPattern().IsMatch(name);
        var body = hexSuffix ? name[..^5] : name;

        if (hexSuffix)
        {
            score += 10;
            reasons.Add("four-character hex suffix");
        }

        if (LetterDigitPattern().IsMatch(body))
        {
            score += 10;
            reasons.Add("digits mixed into the name");
        }

        if (MixedPattern().IsMatch(name))
        {
            score += 20;
            reasons.Add("long letter-digit-letter pattern");
        }

        return (Math.Min(score, 40), [.. reasons]);
    }

    /// <summary>The custom status, pronouns and bio, matched after punctuation is normalised.</summary>
    private static int TextScore(PlayerProfile? profile, List<string> reasons)
    {
        var text = Normalize(string.Join('\n',
            new[] { profile?.StatusDescription, profile?.Pronouns, profile?.Bio }
                .Where(value => !string.IsNullOrWhiteSpace(value))));

        if (text.Length == 0)
            return 0;

        var score = 0;

        if (FuzzyTerms.Any(term => text.Contains(term, StringComparison.Ordinal)))
        {
            score += 5;
            reasons.Add("suspicious wording in the profile");
        }

        if (text.Contains("hexed", StringComparison.Ordinal))
        {
            score += 10;
            reasons.Add("known bot site (hexed)");
        }

        if (text.Contains("check bio", StringComparison.Ordinal))
        {
            score += 5;
            reasons.Add("status says \"check bio\"");
        }

        if (text.Contains("hexed.cc", StringComparison.Ordinal))
        {
            score += 100;
            reasons.Add("known bot site (hexed.cc)");
        }

        return score;
    }

    /// <summary>
    ///     Lower-cases the text and turns the punctuation lookalikes used to dodge plain matching
    ///     (notably the one-dot leader in <c>hexed․cc</c>) into their ASCII equivalents.
    /// </summary>
    private static string Normalize(string text)
    {
        var normalized = text.Normalize(NormalizationForm.FormKC).ToLowerInvariant();

        normalized = normalized
            .Replace('\u2024', '.') // one dot leader
            .Replace('\u2027', '.') // hyphenation point
            .Replace('\uFE52', '.') // small full stop
            .Replace('\uFF0E', '.') // fullwidth full stop
            .Replace('\u3002', '.') // ideographic full stop
            .Replace('\uFF0C', ',')
            .Replace('\u201A', ',')
            .Replace('\uFF01', '!')
            .Replace('\u01C3', '!')
            .Replace('\u2018', '\'')
            .Replace('\u2019', '\'')
            .Replace("\u200B", "")
            .Replace("\u200C", "")
            .Replace("\u200D", "")
            .Replace("\uFEFF", "");

        return DotSpacePattern().Replace(SpacePattern().Replace(normalized, " "), ".");
    }

    [GeneratedRegex(@"\s[0-9a-fA-F]{4}$", RegexOptions.CultureInvariant)]
    private static partial Regex HexSuffixPattern();

    [GeneratedRegex(@"[A-Za-z]{4,}\d{2,}[A-Za-z]{2,}", RegexOptions.CultureInvariant)]
    private static partial Regex MixedPattern();

    [GeneratedRegex(@"[A-Za-z]\d|\d[A-Za-z]", RegexOptions.CultureInvariant)]
    private static partial Regex LetterDigitPattern();

    [GeneratedRegex(@"\s+", RegexOptions.CultureInvariant)]
    private static partial Regex SpacePattern();

    [GeneratedRegex(@"\s*\.\s*", RegexOptions.CultureInvariant)]
    private static partial Regex DotSpacePattern();
}

using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using AntiBot.Models;

namespace AntiBot.Services;

/// <summary>
///     Scores how likely a user is a bot. Each signal adds to the total, except the ranks above
///     <c>User</c> and accounts older than a year, which subtract. The name is capped at 20 and the age
///     at 40 on the positive side, and the total is only clamped at 0: a profile matching several strong
///     signals can pass any threshold, because the number is a score, not a percentage. The threshold in
///     the settings decides when the automatic actions run.
/// </summary>
internal static partial class ThreatScoring
{
    /// <summary>
    ///     Age weights: the accounts that actually join an instance are usually created within a day,
    ///     so that is the strongest age signal; a three-day and a one-week step follow. An old account
    ///     counts against the suspicion instead: from one year it adds nothing, and every further year
    ///     subtracts, down to a floor at five years.
    /// </summary>
    private const int AgeOneDay = 1;

    private const int AgeThreeDays = 3;
    private const int AgeMaxDays = 7;

    private const int AgeMonthDays = 30;
    private const int AgeQuarterDays = 90;
    private const int AgeHalfYearDays = 180;
    private const int AgeYearDays = 365;
    private const int AgeTwoYearsDays = 730;
    private const int AgeThreeYearsDays = 1095;
    private const int AgeFourYearsDays = 1460;
    private const int AgeFiveYearsDays = 1825;

    /// <summary>Wording that only adds the small "something is off" weight.</summary>
    private static readonly string[] FuzzyTerms =
    [
        "hexed", "check bio", "hexed.cc", "reuploader", "bypass", "avatar database",
        "voice data", "banned", "collect avatars", "player locations", "buy now",
        "oversee", "quality cheats", "user stalking", "stalking and tracking", "tracking",
        "all avatars", "4 free", "for free"
    ];

    public static (int Score, ThreatReason[] Reasons) Assess(PlayerProfile? profile, string? displayName,
        string? avatarName, bool isRobot, string? platform)
    {
        var reasons = new List<ThreatReason>();
        var score = 0;

        var (nameScore, nameReasons) = NameScore(profile?.DisplayName ?? displayName ?? "");
        score += nameScore;
        reasons.AddRange(nameReasons);

        // An unknown profile has no trust tags yet; do not treat that as Visitor.
        if (profile is not null)
        {
            var (trustScore, trustReason) = TrustScore(profile.Tags);
            if (trustScore != 0)
            {
                score += trustScore;
                reasons.Add(new(trustReason, trustScore));
            }

            var (ageScore, ageText, ageDetail) = AgeScore(profile.DateJoined);
            if (ageScore != 0)
            {
                score += ageScore;
                reasons.Add(new(ageText, ageScore, ageDetail));
            }
        }

        var (textScore, textReasons) = TextScore(profile);
        score += textScore;
        reasons.AddRange(textReasons);

        // Only the two exact avatars are scored; a name that merely looks similar is not enough.
        if (string.Equals(avatarName?.Trim(), "Sex Bot", StringComparison.OrdinalIgnoreCase))
        {
            score += 10;
            reasons.Add(new("avatar_named_sex_bot", 10));
        }
        else if (isRobot)
        {
            score += 5;
            reasons.Add(new("default_robot_avatar", 5));
        }

        // Quest and iOS are very unlikely to host a bot; halve whatever the other signals added.
        if (score > 0 &&
            (string.Equals(platform, "android", StringComparison.OrdinalIgnoreCase) ||
             string.Equals(platform, "ios", StringComparison.OrdinalIgnoreCase)))
        {
            var halved = score / 2;
            reasons.Add(new("quest_i_os_platform_score_halved", halved - score));
            score = halved;
        }

        return (Math.Max(score, 0), [.. reasons]);
    }

    /// <summary>
    ///     VRChat's account rank, with <c>User</c> as the neutral middle. A Nuisance tag is the strongest
    ///     signal; the ranks above <c>User</c> count against the suspicion instead of for it.
    /// </summary>
    private static (int Score, string Reason) TrustScore(string[] tags)
    {
        if (tags.Contains("system_troll"))
            return (50, "nuisance");

        if (tags.Contains("system_probable_troll"))
            return (25, "probably_nuisance");

        if (tags.Contains("system_trust_veteran"))
            return (-15, "trusted_user_account");

        if (tags.Contains("system_trust_trusted"))
            return (-10, "known_user_account");

        if (tags.Contains("system_trust_known"))
            return (0, "");

        if (tags.Contains("system_trust_basic"))
            return (5, "new_user_account");

        return (15, "visitor_account");
    }

    /// <summary>
    ///     How new the account is. A fresh account is a strong signal; from a year old the age adds
    ///     nothing, and each further year subtracts, down to a floor of -20 at five years. The positive
    ///     side is capped at 40, reached within the first day.
    /// </summary>
    private static (int Score, string Text, string? Detail) AgeScore(string? dateJoined)
    {
        if (!DateTimeOffset.TryParse(dateJoined, CultureInfo.InvariantCulture,
                DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out var joined))
            return (0, "", null);

        var days = (DateTimeOffset.UtcNow - joined).TotalDays;
        if (days < 0)
            days = 0;

        var score = days switch
        {
            <= AgeOneDay => 40,
            <= AgeThreeDays => 32,
            <= AgeMaxDays => 25,
            <= AgeMonthDays => 18,
            <= AgeQuarterDays => 12,
            <= AgeHalfYearDays => 6,
            < AgeYearDays => 3,
            < AgeTwoYearsDays => 0,
            < AgeThreeYearsDays => -5,
            < AgeFourYearsDays => -10,
            < AgeFiveYearsDays => -15,
            _ => -20
        };

        if (score == 0)
            return (0, "", null);

        var whole = (int)days;

        if (whole <= 0)
            return (score, "account_created_today", null);

        if (whole == 1)
            return (score, "account_created_yesterday", null);

        if (whole < AgeYearDays)
            return (score, "account_created_days_days_ago", whole.ToString(CultureInfo.InvariantCulture));

        return whole / 365 == 1
            ? (score, "account_created_1_year_ago", null)
            : (score, "account_created_years_years_ago", whole.ToString(CultureInfo.InvariantCulture));
    }

    /// <summary>
    ///     The generated-name signals. A name scores at most 20, so it can never reach the default
    ///     threshold on its own. The two digit shapes are alternatives: a name gets one +5 shape bonus,
    ///     not both.
    /// </summary>
    private static (int Score, ThreatReason[] Reasons) NameScore(string name)
    {
        if (name.Length == 0)
            return (0, []);

        var score = 0;
        var reasons = new List<ThreatReason>();
        var hexSuffix = HexSuffixPattern().IsMatch(name);
        var body = hexSuffix ? name[..^5] : name;

        // The real bot names are a pronounceable word with a digit plus a four-character hex suffix,
        // for example "Nisarth0alraisth b991" or "Blackfir3 ed36". Those should reach 20.
        if (hexSuffix)
        {
            score += 15;
            reasons.Add(new("four_character_hex_suffix", 15));
        }

        // A long run is the stronger clue of the two; do not also add the generic digit mix for it.
        if (MixedPattern().IsMatch(body))
        {
            score += 5;
            reasons.Add(new("long_letter_digit_letter_pattern", 5));
        }
        else if (LetterDigitPattern().IsMatch(body))
        {
            score += 5;
            reasons.Add(new("digits_mixed_into_the_name", 5));
        }

        return (Math.Min(score, 20), [.. reasons]);
    }

    /// <summary>The custom status, pronouns and bio, matched after punctuation is normalised.</summary>
    private static (int Score, ThreatReason[] Reasons) TextScore(PlayerProfile? profile)
    {
        var text = Normalize(string.Join('\n',
            new[]
                {
                    profile?.StatusDescription, profile?.Pronouns, profile?.Bio
                }
                .Where(value => !string.IsNullOrWhiteSpace(value))));

        if (text.Length == 0)
            return (0, []);

        var score = 0;
        var reasons = new List<ThreatReason>();

        if (FuzzyTerms.Any(term => text.Contains(term, StringComparison.Ordinal)))
        {
            score += 5;
            reasons.Add(new("suspicious_wording_in_the_profile", 5));
        }

        if (HexedPattern().IsMatch(text))
        {
            score += 10;
            reasons.Add(new("known_bot_site_hexed", 10));
        }

        if (text.Contains("check bio", StringComparison.Ordinal))
        {
            score += 5;
            reasons.Add(new("status_says_check_bio", 5));
        }

        if (HexedSitePattern().IsMatch(text))
        {
            score += 110;
            reasons.Add(new("known_bot_site_hexed_cc", 110));
        }

        if (OverseePattern().IsMatch(text))
        {
            score += 10;
            reasons.Add(new("known_bot_site_oversee", 10));
        }

        if (OverseeSitePattern().IsMatch(text))
        {
            score += 110;
            reasons.Add(new("known_bot_site_oversee_lol", 110));
        }

        return (score, [.. reasons]);
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
            .Replace("\u200B", " ")
            .Replace("\u200C", " ")
            .Replace("\u200D", " ")
            .Replace("\uFEFF", " ");

        // Bots spell the dot out to dodge a plain "hexed.cc" match: hexed (dot) cc, hexed [dot] cc,
        // hexed dot cc, and the bracket-only forms. The existing dot/space cleanup runs after this.
        normalized = SpelledDotPattern().Replace(normalized, ".");

        return DotSpacePattern().Replace(SpacePattern().Replace(normalized, " "), ".");
    }

    /// <summary>The site name on its own, as a whole word.</summary>
    [GeneratedRegex(@"\bhexed\b", RegexOptions.CultureInvariant)]
    private static partial Regex HexedPattern();

    /// <summary>The other site name on its own, as a whole word.</summary>
    [GeneratedRegex(@"\boversee\b", RegexOptions.CultureInvariant)]
    private static partial Regex OverseePattern();

    /// <summary>
    ///     The site with any separator at all: <c>hexed … cc</c>. The two words must be whole words,
    ///     but whatever sits between them is ignored, so a dot, a bracket, an emoji or a word works.
    /// </summary>
    [GeneratedRegex(@"\bhexed\b.*\bcc\b", RegexOptions.CultureInvariant | RegexOptions.Singleline)]
    private static partial Regex HexedSitePattern();

    /// <summary>The same for <c>oversee … lol</c>.</summary>
    [GeneratedRegex(@"\boversee\b.*\blol\b", RegexOptions.CultureInvariant | RegexOptions.Singleline)]
    private static partial Regex OverseeSitePattern();

    /// <summary>
    ///     A dot written as a word or inside brackets, which is how bot profiles hide a site address.
    /// </summary>
    [GeneratedRegex(
        @"\(\s*(?:dot|d0t|\.)\s*\)|\[\s*(?:dot|d0t|\.)\s*\]|\{\s*(?:dot|d0t|\.)\s*\}|<\s*(?:dot|d0t|\.)\s*>|\bdot\b|\bd0t\b",
        RegexOptions.CultureInvariant)]
    private static partial Regex SpelledDotPattern();

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
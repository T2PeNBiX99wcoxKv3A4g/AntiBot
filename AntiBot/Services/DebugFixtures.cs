#if DEBUG
using System.Globalization;
using System.Text;
using AntiBot.Messaging;
using AntiBot.Models;

namespace AntiBot.Services;

/// <summary>
///     A debug build only thing: placeholder players and actions, so the interface can be photographed
///     without waiting for a real instance. Nothing here is compiled into a release build, and nothing
///     is written to the database.
/// </summary>
internal static class DebugFixtures
{
    private const string WorldId = "wrld_6f2a8c14-3d51-4b7e-9a02-5c8d1e7f4b30";

    private static readonly (string Name, string Trust, string Platform, string Avatar, bool Robot,
        string Status, string? StatusText, string? Pronouns, int JoinedMinutesAgo, int AccountAgeDays,
        string? Bio, bool Local)[] Players =
    [
        ("yukiyo", "Trusted User", "standalonewindows", "Robot", true, "active", "のんびりしています", "she/her",
            42, 3200, null, true),
        ("ねむ", "User", "standalonewindows", "Sleepy Cat", false, "join me", null, "any", 12, 300, null, false),
        ("kirito_9f3a", "Visitor", "standalonewindows", "Robot", true, "active", null, null, 1, 0,
            "プロフィール見てください", false),
        ("あおい", "Known User", "standalonewindows", "Aoi", false, "active", "音楽を聴いています", "she/her",
            8, 800, null, false),
        ("Luna_Night", "User", "android", "Robot", true, "active", null, null, 20, 120, null, false),
        ("VRChat_User_2841", "Visitor", "standalonewindows", "Robot", true, "active", null, null, 0, 2, null, false),
        ("しずく", "Trusted User", "standalonewindows", "Shizuku", false, "busy", "配信中", "she/her", 33, 1200, null,
            false),
        ("xX_Dark_Xx", "Nuisance", "standalonewindows", "Robot", true, "active", null, null, 2, 0, null, false),
        ("Haru", "User", "ios", "Robot", true, "active", null, null, 15, 400, null, false),
        ("みかん", "Known User", "standalonewindows", "Mikan", false, "active", null, "any", 5, 600, null, false),
        ("abc1234", "Visitor", "standalonewindows", "Robot", true, "active", null, null, 3, 2, null, false),
        ("Nova", "Trusted User", "standalonewindows", "Nova", false, "active", null, null, 7, 900, null, false),
        ("りん", "User", "standalonewindows", "Rin", false, "ask me", null, "she/her", 25, 250, null, false),
        ("Echo_9", "New User", "standalonewindows", "Robot", true, "active", null, null, 4, 1, null, false),
        ("Sora", "Known User", "android", "Sora", false, "active", null, null, 10, 700, null, false),
        ("Tomo", "User", "standalonewindows", "Tomo", false, "active", null, null, 18, 200, null, false),
        ("かえで", "Trusted User", "standalonewindows", "Kaede", false, "join me", null, "they/them", 28, 1800, null,
            false),
        ("John_Doe", "Visitor", "standalonewindows", "Robot", true, "active", null, null, 6, 3, null, false),
        ("ゆめ", "New User", "standalonewindows", "Robot", true, "active", null, null, 0, 0, null, false)
    ];

    /// <summary>The whole instance card: world, banner picture and the players above.</summary>
    public static InstanceSnapshot Instance()
    {
        var now = DateTime.Now;
        var users = Players.Select(Player).ToArray();

        return new InstanceSnapshot(
            true,
            $"{WorldId}:26582~public",
            $"{WorldId}:26582~public",
            users,
            "api",
            "雪あかりラウンジ",
            users.Length,
            50,
            WorldId,
            WorldThumbnail(),
            "public",
            "jp",
            "",
            "",
            "26582",
            "",
            false,
            false);
    }

    /// <summary>A short history of automatic actions against the same players.</summary>
    public static OperationEntry[] Operations()
    {
        var now = DateTimeOffset.UtcNow;

        return
        [
            Entry(107, now.AddMinutes(-6), "chatBoxHidden", 7),
            Entry(106, now.AddMinutes(-6), "block", 7),
            Entry(105, now.AddMinutes(-9), "avatarInteractionOff", 2),
            Entry(104, now.AddMinutes(-9), "block", 2),
            Entry(103, now.AddMinutes(-21), "rejectRequest", 5),
            Entry(102, now.AddMinutes(-34), "safeMode", 7),
            Entry(101, now.AddMinutes(-48), "block", 10)
        ];
    }

    private static OperationEntry Entry(long id, DateTimeOffset at, string kind, int index)
    {
        var (profile, score, reasons) = Assess(index);
        var detail = reasons.Length == 0
            ? score.ToString(CultureInfo.InvariantCulture)
            : $"{score} · {string.Join(", ", reasons.Select(Describe))}";

        return new OperationEntry(id, at.ToUnixTimeMilliseconds(), kind, profile.Id, profile.DisplayName, detail,
            RobotAvatar(index), false);
    }

    /// <summary>The player as the scoring sees it, so the list and the history agree on every number.</summary>
    private static (PlayerProfile Profile, int Score, ThreatReason[] Reasons) Assess(int index)
    {
        var spec = Players[index];
        var joined = DateTime.UtcNow.AddDays(-spec.AccountAgeDays);
        var profile = new PlayerProfile($"usr_fixture_{index + 1:00}", spec.Name, null, null, null, spec.Status,
            spec.StatusText, spec.Pronouns, spec.Bio,
            joined.ToString("yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture),
            TagsOf(spec.Trust), spec.Platform, spec.Platform, null);

        if (spec.Local)
            return (profile, 0, []);

        var (score, reasons) = ThreatScoring.Assess(profile, spec.Name, spec.Avatar, spec.Robot, spec.Platform);
        return (profile, score, reasons);
    }

    /// <summary>A reason as the history stores it: the translation key, with its value in parentheses.</summary>
    private static string Describe(ThreatReason reason) =>
        reason.Detail is { Length: > 0 } detail ? $"{reason.Text}({detail})" : reason.Text;

    private static InstanceUser Player((string Name, string Trust, string Platform, string Avatar, bool Robot,
        string Status, string? StatusText, string? Pronouns, int JoinedMinutesAgo, int AccountAgeDays,
        string? Bio, bool Local) spec, int index)
    {
        var (profile, score, reasons) = Assess(index);
        var icon = RobotAvatar(index);

        return new InstanceUser(
            profile.Id,
            spec.Name,
            spec.Local,
            DateTime.Now.AddMinutes(-spec.JoinedMinutesAgo).ToString("HH:mm:ss", CultureInfo.InvariantCulture),
            icon,
            null,
            icon,
            spec.Trust,
            spec.Status,
            spec.StatusText,
            spec.Pronouns,
            spec.Bio,
            profile.DateJoined,
            spec.Platform,
            spec.Avatar,
            spec.Robot,
            false,
            score,
            reasons,
            false,
            true,
            true);
    }

    private static string[] TagsOf(string trust) => trust switch
    {
        "Trusted User" => ["system_trust_veteran", "system_trust_trusted", "system_trust_known", "system_trust_basic"],
        "Known User" => ["system_trust_trusted", "system_trust_known", "system_trust_basic"],
        "User" => ["system_trust_known", "system_trust_basic"],
        "New User" => ["system_trust_basic"],
        "Nuisance" => ["system_troll"],
        _ => []
    };

    /// <summary>A small robot picture, so the avatar column is not a row of empty circles.</summary>
    private static string RobotAvatar(int index)
    {
        var hue = index * 47 % 360;
        var second = (hue + 38) % 360;

        var svg = $"""
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                     <defs>
                       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                         <stop offset="0" stop-color="hsl({hue}, 42%, 30%)"/>
                         <stop offset="1" stop-color="hsl({second}, 48%, 16%)"/>
                       </linearGradient>
                     </defs>
                     <rect width="96" height="96" fill="url(#g)"/>
                     <g fill="hsl({hue}, 20%, 76%)">
                       <rect x="29" y="24" width="38" height="32" rx="11"/>
                       <rect x="41" y="15" width="14" height="8" rx="3"/>
                       <rect x="35" y="60" width="26" height="15" rx="7"/>
                     </g>
                     <g fill="hsl({hue}, 70%, 58%)">
                       <circle cx="40" cy="40" r="4.5"/>
                       <circle cx="56" cy="40" r="4.5"/>
                     </g>
                     <rect x="45" y="49" width="6" height="3" rx="1.5" fill="hsl({hue}, 30%, 30%)"/>
                   </svg>
                   """;

        return DataUri(svg);
    }

    /// <summary>A night scene for the world banner, drawn rather than downloaded.</summary>
    private static string WorldThumbnail()
    {
        const string svg = """
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420">
                             <defs>
                               <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="0" stop-color="#170f28"/>
                                 <stop offset="0.5" stop-color="#2c1a4e"/>
                                 <stop offset="1" stop-color="#0e0b16"/>
                               </linearGradient>
                               <radialGradient id="moon" cx="50%" cy="50%" r="50%">
                                 <stop offset="0" stop-color="#f6f2ff" stop-opacity="0.9"/>
                                 <stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
                               </radialGradient>
                             </defs>
                             <rect width="800" height="420" fill="url(#sky)"/>
                             <circle cx="626" cy="118" r="86" fill="url(#moon)"/>
                             <circle cx="626" cy="118" r="26" fill="#efeaff"/>
                             <path d="M0 300 L120 236 L214 288 L318 226 L420 292 L520 244 L640 300 L800 254 L800 420 L0 420 Z"
                                   fill="#12101d"/>
                             <path d="M0 344 L96 300 L200 344 L300 306 L404 350 L520 310 L640 352 L800 316 L800 420 L0 420 Z"
                                   fill="#0b0912"/>
                             <g fill="#151022">
                               <path d="M120 344 L138 292 L156 344 Z"/>
                               <path d="M150 350 L166 304 L182 350 Z"/>
                               <path d="M560 352 L578 300 L596 352 Z"/>
                               <path d="M594 358 L608 316 L622 358 Z"/>
                             </g>
                           </svg>
                           """;

        return DataUri(svg);
    }

    private static string DataUri(string svg) =>
        "data:image/svg+xml;base64," + Convert.ToBase64String(Encoding.UTF8.GetBytes(svg));
}

/// <summary>Reply for the two debug toggles: whether the placeholder data is now on.</summary>
internal sealed record FakeDataPayload(bool On);
#endif

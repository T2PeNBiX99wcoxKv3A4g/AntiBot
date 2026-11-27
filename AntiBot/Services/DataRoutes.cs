using System.Globalization;
using AntiBot.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using PhotinoNetUtils.Hosting;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     The data plane: every list the window draws is fetched from the local server as a binary
///     <see cref="DataBlock" />, instead of being pushed through the message bridge as JSON. The
///     bridge still carries the commands, because they are requests and answers, not data.
/// </summary>
/// <remarks>
///     The routes live under <c>/data/&lt;token&gt;/</c>, the prefix <see cref="PhotinoNetUtils.Hosting.StaticServer" />
///     hands to its route map, so another process cannot reach them by guessing a path.
/// </remarks>
internal static class DataRoutes
{
    /// <summary>Kinds, so the decoder can tell the blocks apart.</summary>
    public const ushort InstanceKind = 1;
    public const ushort OperationsKind = 2;
    public const ushort LogKind = 3;
    public const ushort RequestsKind = 4;
    public const ushort BatchPreviewKind = 5;
    public const ushort BatchStateKind = 6;
    public const ushort BotsKind = 7;

    private const int DefaultLogLines = 5000;
    private const int MaxLogLines = 20_000;

    private const int LocalFlag = 1;
    private const int FriendFlag = 2;
    private const int RobotFlag = 4;
    private const int WhitelistFlag = 8;
    private const int ProfileLoadedFlag = 16;
    private const int AvatarLoadedFlag = 32;

    public static void Map(WebApplication app, string token)
    {
        app.MapGet($"/data/{token}/instance", (Delegate)((HttpContext _) => Block(Instance())));
        app.MapGet($"/data/{token}/operations", (Delegate)((HttpContext _) => Block(Operations())));
        app.MapGet($"/data/{token}/requests", (Delegate)((HttpContext _) => Block(Requests())));
        app.MapGet($"/data/{token}/bots", (Delegate)((HttpContext _) => Block(Bots())));
        app.MapGet($"/data/{token}/log", (Delegate)Log);

        app.MapPost($"/data/{token}/batch-preview", (Delegate)(async (HttpContext context) =>
        {
            using var reader = new StreamReader(context.Request.Body);
            var text = await reader.ReadToEndAsync(context.RequestAborted);
            var preview = await BatchService.Instance.ParseDataAsync(text, context.RequestAborted);

            var block = new DataBlock(BatchPreviewKind)
                .Meta("invalid", string.Join('\u001f', preview.Invalid))
                .Meta("error", preview.Error ?? "");

            AddUsers(block, preview.Users);
            return DataBlockResults.Block(block);
        }));

        app.MapGet($"/data/{token}/batch-state", (Delegate)((HttpContext _) =>
        {
            var state = BatchService.Instance.StateData();

            var block = new DataBlock(BatchStateKind)
                .Meta("running", state.Running ? "1" : "0")
                .Meta("done", state.Done.ToString(CultureInfo.InvariantCulture))
                .Meta("total", state.Total.ToString(CultureInfo.InvariantCulture))
                .Meta("failed", state.Failed.ToString(CultureInfo.InvariantCulture))
                .Meta("cancelled", state.Cancelled ? "1" : "0")
                .Meta("error", state.Error ?? "")
                .Meta("actions", string.Join('\u001f', state.Actions))
                .Text("userId")
                .Text("error")
                .Number("ok");

            foreach (var outcome in state.Outcomes)
                block.Row([outcome.UserId, outcome.Error ?? ""], outcome.Ok ? 1 : 0);

            return DataBlockResults.Block(block);
        }));
    }

    private static IResult Block(byte[] bytes) => BinaryContent.Bytes(bytes, DataBlock.ContentType);

    /// <summary>Who is in the instance, and which instance that is.</summary>
    private static byte[] Instance()
    {
        var snapshot = InstanceService.Instance.DataSnapshot;

        var block = new DataBlock(InstanceKind)
            .Meta("running", snapshot.Running ? "1" : "0")
            .Meta("world", snapshot.World)
            .Meta("instance", snapshot.Instance)
            .Meta("source", snapshot.Source)
            .Meta("worldName", snapshot.WorldName)
            .Meta("userCount", snapshot.UserCount.ToString(CultureInfo.InvariantCulture))
            .Meta("capacity", snapshot.Capacity.ToString(CultureInfo.InvariantCulture))
            .Meta("worldId", snapshot.WorldId)
            .Meta("worldThumbnail", snapshot.WorldThumbnail)
            .Meta("instanceType", snapshot.InstanceType)
            .Meta("instanceRegion", snapshot.InstanceRegion)
            .Meta("instanceOwnerId", snapshot.InstanceOwnerId)
            .Meta("instanceShortName", snapshot.InstanceShortName)
            .Meta("instanceNumber", snapshot.InstanceNumber)
            .Meta("instanceDisplayName", snapshot.InstanceDisplayName)
            .Meta("instanceRestricted", snapshot.InstanceRestricted ? "1" : "0")
            .Meta("instanceAgeGated", snapshot.InstanceAgeGated ? "1" : "0");

        UserColumns(block);

        foreach (var user in snapshot.Users)
            block.Row(Text(user), Numbers(user));

        return block.Build();
    }

    /// <summary>A friend request, with its sender described exactly like an instance player.</summary>
    private static byte[] Requests()
    {
        var requests = FriendRequestService.Instance.DataRequests;

        var block = new DataBlock(RequestsKind)
            .Text("id")
            .Text("userId")
            .Text("createdAt")
            .Number("active")
            .Number("rejected")
            .Number("firstSeen");

        UserColumns(block, "user.");

        foreach (var request in requests)
        {
            var text = new List<string> { request.Id, request.UserId, request.CreatedAt };
            text.AddRange(Text(request.User));

            var numbers = new List<double> { request.Active ? 1 : 0, request.Rejected ? 1 : 0, request.FirstSeen };
            numbers.AddRange(Numbers(request.User));

            block.Row([.. text], [.. numbers]);
        }

        return block.Build();
    }

    /// <summary>Every account the scoring has called a bot, newest sighting first.</summary>
    private static byte[] Bots()
    {
        var bots = BotListService.Instance.DataEntries;

        var block = new DataBlock(BotsKind)
            .Meta("count", bots.Length.ToString(CultureInfo.InvariantCulture))
            .Text("userId")
            .Text("name")
            .Text("trust")
            .Text("platform")
            .Text("dateJoined")
            .Text("avatar")
            .Text("reasons")
            .Number("threat")
            .Number("firstSeen")
            .Number("lastSeen")
            .Number("sightings");

        foreach (var bot in bots)
            block.Row(
            [
                bot.UserId, bot.DisplayName, bot.Trust ?? "", bot.Platform ?? "", bot.DateJoined ?? "",
                bot.AvatarUrl ?? "", Reasons(bot.Reasons)
            ],
                bot.Threat, bot.FirstSeen, bot.LastSeen, bot.Sightings);

        return block.Build();
    }

    /// <summary>The player columns, shared by the instance list and the friend requests.</summary>
    private static void UserColumns(DataBlock block, string prefix = "") =>
        block.Text($"{prefix}userId")
            .Text($"{prefix}name")
            .Text($"{prefix}trust")
            .Text($"{prefix}status")
            .Text($"{prefix}statusText")
            .Text($"{prefix}pronouns")
            .Text($"{prefix}platform")
            .Text($"{prefix}joined")
            .Text($"{prefix}icon")
            .Text($"{prefix}avatarName")
            .Text($"{prefix}dateJoined")
            .Text($"{prefix}bio")
            .Text($"{prefix}reasons")
            .Number($"{prefix}threat")
            .Number($"{prefix}flags");

    private static string[] Text(InstanceUser user) =>
    [
        user.UserId,
        user.Name,
        user.Trust ?? "",
        user.Status ?? "",
        user.StatusDescription ?? "",
        user.Pronouns ?? "",
        user.Platform ?? "",
        user.JoinedAt,
        user.IconUrl ?? user.AvatarUrl ?? "",
        user.AvatarName ?? "",
        user.DateJoined ?? "",
        user.Bio ?? "",
        Reasons(user.ThreatReasons)
    ];

    private static double[] Numbers(InstanceUser user) => [user.Threat, Flags(user)];

    /// <summary>Adds the standard player columns and one row per user, for lists outside the instance.</summary>
    internal static void AddUsers(DataBlock block, IEnumerable<InstanceUser> users)
    {
        UserColumns(block);

        foreach (var user in users)
            block.Row(Text(user), Numbers(user));
    }

    /// <summary>Every automatic action, newest first.</summary>
    private static byte[] Operations()
    {
        var entries = OperationService.Instance.DataEntries;

        var block = new DataBlock(OperationsKind)
            .Text("kind")
            .Text("userId")
            .Text("displayName")
            .Text("detail")
            .Text("avatar")
            .Number("id")
            .Number("at")
            .Number("undone");

        foreach (var entry in entries)
            block.Row(
                [entry.Kind, entry.UserId, entry.DisplayName, entry.Detail, entry.AvatarUrl ?? ""],
                entry.Id,
                entry.At,
                entry.Undone ? 1 : 0);

        return block.Build();
    }

    /// <summary>The log lines the viewer is missing, plus whether VRChat is running.</summary>
    private static IResult Log(HttpContext context)
    {
        var after = ReadNumber(context, "after", 0);
        var limit = (int)Math.Clamp(ReadNumber(context, "limit", DefaultLogLines), 1, MaxLogLines);
        var page = VrchatLogService.Instance.DataPage(after, limit);

        var block = new DataBlock(LogKind)
            .Meta("exists", page.Exists ? "1" : "0")
            .Meta("running", page.Running ? "1" : "0")
            .Meta("generation", page.Generation.ToString(CultureInfo.InvariantCulture))
            .Text("time")
            .Text("level")
            .Text("message")
            .Number("id");

        foreach (var line in page.Lines)
            block.Row([line.Time, line.Level, line.Message], line.Id);

        return DataBlockResults.Block(block);
    }

    /// <summary>The reasons as one string: key, weight and detail, separated by unit separators.</summary>
    private static string Reasons(ThreatReason[]? reasons) =>
        reasons is { Length: > 0 }
            ? string.Join('\u001f', reasons.Select(reason => $"{reason.Text}|{reason.Weight}|{reason.Detail}"))
            : "";

    private static double Flags(InstanceUser user) =>
        (double)((user.Local ? LocalFlag : 0) |
                 (user.IsFriend ? FriendFlag : 0) |
                 (user.IsRobot ? RobotFlag : 0) |
                 (user.Whitelisted ? WhitelistFlag : 0) |
                 (user.ProfileLoaded ? ProfileLoadedFlag : 0) |
                 (user.AvatarLoaded ? AvatarLoadedFlag : 0));

    private static long ReadNumber(HttpContext context, string name, long fallback) =>
        long.TryParse(context.Request.Query[name], NumberStyles.Integer, CultureInfo.InvariantCulture, out var value)
            ? value
            : fallback;
}

/// <summary>Answers <c>data.base</c>: where the window finds the routes above.</summary>
[Singleton]
internal partial class DataPlaneService
{
    private DataPlaneService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "data.base"
            ? Task.FromResult<NativeResponse?>(context.Reply("data.base.result", new DataBasePayload(AppServer.DataUrl)))
            : Task.FromResult<NativeResponse?>(null);
}

/// <summary>Body for <c>data.base</c>.</summary>
internal sealed record DataBasePayload(string Base);

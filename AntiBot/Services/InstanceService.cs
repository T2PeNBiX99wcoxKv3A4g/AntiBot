using System.Text.RegularExpressions;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Builds the in-instance player list. The local log is always read: joins add a player, leaves
///     remove one, and entering a new room starts over. Once an account is signed in, the VRChat API
///     is asked instead, because the log cannot tell two running clients apart.
/// </summary>
/// <remarks>
///     What the log says is also written to the database as a small stream of events, so the list is
///     rebuilt on the next launch instead of starting empty.
/// </remarks>
internal sealed partial class InstanceService : Singleton<InstanceService>
{
    private static readonly TimeSpan ApiInterval = TimeSpan.FromSeconds(10);

    private readonly Lock _gate = new();
    private readonly CancellationTokenSource _stop = new();
    private readonly List<InstanceUser> _users = [];

    private ApiInstance? _apiInstance;
    private string _apiLocation = "";
    private string _instance = "";
    private string _localName = "";
    private string _pushed = "";
    private bool _running;
    private string _world = "";

    public InstanceService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;
        VrchatLogService.Instance.LinesRead += OnLinesRead;
        AuthService.Instance.Changed += OnAuthChanged;
        PlayerService.Instance.Updated += Publish;
        AvatarService.Instance.Updated += Publish;
        PresenceService.Instance.Updated += Publish;

        _ = RestoreAsync();
        _ = RunApiLoopAsync(_stop.Token);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "instance.snapshot"
            ? Task.FromResult<NativeResponse?>(context.Reply("instance.snapshot.result", Snapshot()))
            : Task.FromResult<NativeResponse?>(null);

    private void OnLinesRead(VrchatLogBatch batch)
    {
        var events = new List<GameEvent>();
        bool changed;

        lock (_gate)
            if (!batch.Running)
            {
                changed = ResetSession();
                _running = false;
            }
            else
            {
                changed = !_running;
                _running = true;

                if (batch.Reset)
                    changed |= Record(new("", "reset"), events);

                foreach (var line in batch.Lines)
                    changed |= Apply(line, events);
            }

        Persist(events);

        if (changed)
            Publish();
    }

    private void OnAuthChanged()
    {
        lock (_gate)
        {
            _apiInstance = null;
            _apiLocation = "";

            // Signing in makes profiles available for everyone already in the instance.
            if (AuthService.Instance.IsLoggedIn)
            {
                AvatarService.Instance.ResetUnknown();

                foreach (var user in _users)
                {
                    PlayerService.Instance.Request(user.UserId);
                    AvatarService.Instance.Request(AvatarService.FileIdOf(PlayerService.Instance.Get(user.UserId)?.AvatarUrl));
                }
            }
        }

        Publish();
    }

    /// <summary>Rebuilds the list from the events the previous launch stored.</summary>
    private async Task RestoreAsync()
    {
        var events = await Database.Instance.LoadSessionAsync();
        if (events.Count == 0)
            return;

        lock (_gate)
        {
            _users.Clear();
            _world = "";
            _instance = "";
            _localName = "";

            foreach (var gameEvent in events)
                ApplyEvent(gameEvent);

            Log.Information("Restored {Count} stored instance event(s) for {Users} player(s)",
                events.Count, _users.Count);
        }

        Publish();
    }

    /// <summary>Polls the API for the instance the signed-in account is in, and publishes changes.</summary>
    private async Task RunApiLoopAsync(CancellationToken token)
    {
        using var timer = new PeriodicTimer(ApiInterval);

        try
        {
            while (await timer.WaitForNextTickAsync(token))
                await RefreshFromApiAsync(token);
        }
        catch (OperationCanceledException)
        {
            // Shutting down.
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "The VRChat API refresh stopped");
        }
    }

    private async Task RefreshFromApiAsync(CancellationToken token)
    {
        if (!AuthService.Instance.IsLoggedIn)
        {
            if (ClearApi())
                Publish();

            return;
        }

        // The account's own location is authoritative; the log's is the fallback when VRChat has not
        // reported one yet (for instance right after signing in).
        var location = await AuthService.Instance.GetLocationAsync(token);

        if (!LooksLikeInstance(location))
            location = InstanceLocation();

        if (!LooksLikeInstance(location))
        {
            if (ClearApi())
                Publish();

            return;
        }

        var target = location!;
        var (instance, error) = await AuthService.Instance.GetInstanceAsync(target, token);
        if (instance is null)
        {
            if (error is not null)
                Log.Debug("Instance lookup failed: {Error}", error);

            if (ClearApi())
                Publish();

            return;
        }

        bool changed;
        lock (_gate)
        {
            changed = _apiLocation != target || !SameInstance(_apiInstance, instance);
            _apiInstance = instance;
            _apiLocation = target;
        }

        // The roster is a live source of everyone's presence, so it feeds the same store as the pipeline.
        if (instance.Users is { Length: > 0 } roster)
            PresenceService.Instance.Set(roster.Select(user =>
                (user.Id ?? "", user.Status, user.StatusDescription)));

        if (changed)
            Publish();
    }

    private static bool LooksLikeInstance(string? location) =>
        location is { Length: > 0 } && location.StartsWith("wrld_", StringComparison.Ordinal);

    private static bool SameInstance(ApiInstance? previous, ApiInstance current)
    {
        if (previous is null)
            return false;

        return previous.Id == current.Id &&
               previous.UserCount == current.UserCount &&
               previous.Capacity == current.Capacity &&
               previous.World?.Name == current.World?.Name &&
               UserSignature(previous.Users) == UserSignature(current.Users);
    }

    private static string UserSignature(ApiInstanceUser[]? users) =>
        users is null ? "" : string.Join(',', users.Select(user => $"{user.Id}:{user.DisplayName}"));

    private bool ClearApi()
    {
        lock (_gate)
        {
            if (_apiInstance is null && _apiLocation.Length == 0)
                return false;

            _apiInstance = null;
            _apiLocation = "";
            return true;
        }
    }

    /// <summary>Turns one log line into an event, records it and applies it.</summary>
    private bool Apply(VrchatLogLine line, List<GameEvent> events)
    {
        if (ToEvent(line) is not { } gameEvent)
            return false;

        return Record(gameEvent, events);
    }

    private bool Record(GameEvent gameEvent, List<GameEvent> events)
    {
        events.Add(gameEvent);
        return ApplyEvent(gameEvent);
    }

    private GameEvent? ToEvent(VrchatLogLine line)
    {
        // A new log file means a new VRChat session; nothing from the old one carries over.
        if (line.Level == "session")
            return new(line.Time, "reset");

        var message = line.Message;

        if (message == "[Behaviour] OnPlayerLeftRoom")
            return new(line.Time, "clear");

        var joined = PlayerJoinedPattern().Match(message);
        if (joined.Success)
            return new(line.Time, "join",
                UserId: joined.Groups["id"].Value,
                DisplayName: joined.Groups["name"].Value.Trim());

        var left = PlayerLeftPattern().Match(message);
        if (left.Success)
            return new(line.Time, "leave",
                UserId: left.Groups["id"].Value,
                DisplayName: left.Groups["name"].Value.Trim());

        var entering = EnteringRoomPattern().Match(message);
        if (entering.Success)
            // Both halves are stored on each transition, so replaying from the last one rebuilds the
            // whole location even when the two log lines arrive in the other order.
            return new(line.Time, "location",
                World: entering.Groups["world"].Value.Trim(),
                Instance: _instance);

        var joining = JoiningPattern().Match(message);
        if (joining.Success)
            return new(line.Time, "instance",
                World: _world,
                Instance: joining.Groups["instance"].Value);

        var local = LocalPlayerPattern().Match(message);
        if (local.Success)
            return new(line.Time, "local", DisplayName: local.Groups["name"].Value);

        return null;
    }

    /// <summary>Applies one event to the state; returns whether anything the UI shows changed.</summary>
    private bool ApplyEvent(GameEvent gameEvent)
    {
        switch (gameEvent.Kind)
        {
            case "reset":
                return ResetSession();

            case "clear":
                return ClearUsers();

            case "location":
                var located = SetWorld(gameEvent.World);
                located |= SetInstance(gameEvent.Instance);
                return located;

            case "instance":
                // The world name may only be known from the transition before this one.
                var restoredWorld = _world.Length == 0 && gameEvent.World.Length > 0 && SetWorld(gameEvent.World);
                restoredWorld |= SetInstance(gameEvent.Instance);
                return restoredWorld;

            case "join":
                PlayerService.Instance.Request(gameEvent.UserId);
                return Upsert(gameEvent.UserId, gameEvent.DisplayName, gameEvent.At);

            case "leave":
                return Remove(gameEvent.UserId);

            case "local":
                return SetLocal(gameEvent.DisplayName);

            default:
                return false;
        }
    }

    private bool SetWorld(string world)
    {
        var changed = _users.Count > 0 || world != _world;

        _users.Clear();
        _world = world;
        return changed;
    }

    private bool SetInstance(string instance)
    {
        if (instance == _instance)
            return false;

        _instance = instance;
        return true;
    }

    private bool SetLocal(string name)
    {
        _localName = name;

        var index = _users.FindIndex(user => user.Name == _localName);
        if (index < 0 || _users[index].Local)
            return false;

        _users[index] = _users[index] with
        {
            Local = true
        };
        return true;
    }

    private bool Remove(string userId)
    {
        var index = _users.FindIndex(user => user.UserId == userId);
        if (index < 0)
            return false;

        _users.RemoveAt(index);
        return true;
    }

    private bool Upsert(string userId, string name, string joinedAt)
    {
        var user = new InstanceUser(userId, name, name == _localName, joinedAt);
        var index = _users.FindIndex(existing => existing.UserId == userId);

        if (index < 0)
        {
            _users.Add(user);
            return true;
        }

        if (_users[index] == user)
            return false;

        _users[index] = user;
        return true;
    }

    private bool ClearUsers()
    {
        if (_users.Count == 0)
            return false;

        _users.Clear();
        return true;
    }

    private bool ResetSession()
    {
        var changed = _users.Count > 0 || _world.Length > 0 || _instance.Length > 0 || _localName.Length > 0;

        _users.Clear();
        _world = "";
        _instance = "";
        _localName = "";
        return changed;
    }

    private string InstanceLocation()
    {
        lock (_gate)
            return _instance;
    }

    /// <summary>Writes the batch to the database without holding up the log loop.</summary>
    private void Persist(List<GameEvent> events)
    {
        if (events.Count == 0)
            return;

        _ = Task.Run(async () =>
        {
            var attempt = await Try.Run(() => Database.Instance.AddEventsAsync(events));
            attempt.OnFailure(ex => Log.Warning(ex, "Failed to store {Count} instance event(s)", events.Count));
        });
    }

    /// <summary>Pushes the snapshot when it really changed, so a poll does not redraw the page.</summary>
    private void Publish()
    {
        var snapshot = Snapshot();
        var signature = Signature(snapshot);

        lock (_gate)
        {
            if (signature == _pushed)
                return;

            _pushed = signature;
        }

        WindowManager.Instance.NotifyMainWindow("instance.changed", snapshot);
    }

    private static string Signature(InstanceSnapshot snapshot) => string.Join('|',
        snapshot.Source,
        snapshot.World,
        snapshot.Instance,
        snapshot.WorldName,
        snapshot.UserCount,
        snapshot.Capacity,
        snapshot.InstanceType,
        snapshot.InstanceShortName,
        snapshot.InstanceNumber,
        snapshot.InstanceDisplayName,
        snapshot.InstanceRestricted,
        string.Join(',', snapshot.Users.Select(user =>
            $"{user.UserId}:{user.Name}:{user.Local}:{user.Trust}:{user.AvatarUrl}:{user.AvatarImageUrl}:" +
            $"{user.IconUrl}:{user.AvatarName}:{user.IsRobot}:{user.Status}:{user.StatusDescription}")));

    private InstanceSnapshot Snapshot()
    {
        lock (_gate)
        {
            if (_apiInstance is { } api && AuthService.Instance.IsLoggedIn && LooksLikeInstance(_apiLocation))
            {
                // The API lists who is really there; the log still supplies join times and who is local.
                // For instances the account did not create the API sends an empty roster, so fall back.
                var apiUsers = api.Users is { Length: > 0 } list ? list : null;

                var users = apiUsers is not null
                    ? apiUsers.Select(user =>
                        Enrich(user.Id ?? "", user.DisplayName ?? "", user.CurrentAvatarThumbnailImageUrl)).ToArray()
                    : _users.Select(user => Enrich(user.UserId, user.Name)).ToArray();

                var count = api.UserCount ?? apiUsers?.Length ?? 0;

                return new InstanceSnapshot(
                    _running || count > 0,
                    api.World?.Name ?? _world,
                    api.Location ?? _apiLocation,
                    users,
                    "api",
                    api.World?.Name ?? "",
                    count,
                    api.Capacity ?? 0,
                    api.WorldId ?? api.World?.Id ?? "",
                    api.World?.ThumbnailImageUrl ?? api.World?.ImageUrl ?? "",
                    api.Type ?? "",
                    api.Region ?? "",
                    api.OwnerId ?? "",
                    api.ShortName ?? "",
                    api.InstanceId?.Split('~')[0] ?? "",
                    api.DisplayName ?? "",
                    api.RoleRestricted ?? false,
                    api.AgeGate ?? false);
            }

            var parsed = ParseLocation(_instance);

            return new InstanceSnapshot(_running, _world, _instance,
                _users.Select(user => Enrich(user.UserId, user.Name)).ToArray(),
                "log", "", 0, 0, WorldIdOf(_instance), "", parsed.Type, parsed.Region, parsed.OwnerId, "",
                parsed.Number, "", false, parsed.AgeGated);
        }
    }

    /// <summary>Reads the instance type, region and owner out of a location string.</summary>
    private static (string Type, string Region, string OwnerId, string Number, bool AgeGated) ParseLocation(
        string location)
    {
        var colon = location.IndexOf(':');
        if (colon < 0)
            return ("", "", "", "", false);

        var parts = location[(colon + 1)..].Split('~');
        var type = "public";
        var owner = "";
        var region = "";
        var groupAccess = "";
        var canRequestInvite = false;
        var ageGated = false;

        foreach (var part in parts.Skip(1))
        {
            var open = part.IndexOf('(');
            var close = part.LastIndexOf(')');
            var key = open >= 0 ? part[..open] : part;
            var value = open >= 0 && close > open ? part[(open + 1)..close] : "";

            switch (key)
            {
                case "private":
                    type = "invite";
                    owner = value;
                    break;
                case "friends":
                    type = "friends";
                    owner = value;
                    break;
                case "hidden":
                    type = "friends+";
                    owner = value;
                    break;
                case "group":
                    type = "group";
                    owner = value;
                    break;
                case "groupAccessType":
                    groupAccess = value;
                    break;
                case "region":
                    region = value;
                    break;
                case "canRequestInvite":
                    canRequestInvite = true;
                    break;
                case "ageGate":
                    ageGated = true;
                    break;
            }
        }

        if (type == "invite" && canRequestInvite)
            type = "invite+";

        if (type == "group" && groupAccess.Length > 0)
            type = $"group:{groupAccess}";

        return (type, region, owner, parts[0], ageGated);
    }

    /// <summary>The world id at the front of an instance location (<c>wrld_…:123</c>).</summary>
    private static string WorldIdOf(string instance)
    {
        var colon = instance.IndexOf(':');
        return colon > 0 ? instance[..colon] : "";
    }

    /// <summary>One player, with the cached profile and the log's join time and local flag.</summary>
    private InstanceUser Enrich(string userId, string name, string? avatarUrl = null)
    {
        var known = _users.Find(user => user.UserId == userId);
        var profile = PlayerService.Instance.Get(userId);
        var presence = PresenceService.Instance.Get(userId);
        var avatar = profile?.AvatarUrl ?? avatarUrl;
        var fileId = AvatarService.FileIdOf(avatar);
        var platform = profile?.Platform is { Length: > 0 } value && value != "offline"
            ? value
            : profile?.LastPlatform;

        AvatarService.Instance.Request(fileId);

        return new InstanceUser(
            userId,
            profile?.DisplayName ?? name,
            known?.Local ?? false,
            known?.JoinedAt ?? "",
            avatar,
            profile?.AvatarImageUrl,
            profile?.IconUrl,
            TrustLevel(profile?.Tags),
            presence?.Status ?? profile?.Status,
            presence?.StatusDescription ?? profile?.StatusDescription,
            profile?.DateJoined,
            platform,
            AvatarService.Instance.NameFor(fileId),
            AvatarService.IsRobot(fileId));
    }

    /// <summary>VRChat's trust tags, highest first.</summary>
    private static string? TrustLevel(string[]? tags)
    {
        if (tags is null)
            return null;

        if (tags.Contains("system_trust_veteran"))
            return "Trusted";
        if (tags.Contains("system_trust_trusted"))
            return "Known";
        if (tags.Contains("system_trust_known"))
            return "User";
        if (tags.Contains("system_trust_basic"))
            return "New";

        return "Visitor";
    }

    [GeneratedRegex(@"^\[Behaviour\] OnPlayerJoined (?<name>.+) \((?<id>usr_[^)]+)\)$",
        RegexOptions.CultureInvariant)]
    private static partial Regex PlayerJoinedPattern();

    [GeneratedRegex(@"^\[Behaviour\] OnPlayerLeft (?<name>.+) \((?<id>usr_[^)]+)\)$",
        RegexOptions.CultureInvariant)]
    private static partial Regex PlayerLeftPattern();

    [GeneratedRegex(@"^\[Behaviour\] Entering Room: (?<world>.+)$", RegexOptions.CultureInvariant)]
    private static partial Regex EnteringRoomPattern();

    [GeneratedRegex(@"^\[Behaviour\] Joining (?<instance>wrld_\S+)$", RegexOptions.CultureInvariant)]
    private static partial Regex JoiningPattern();

    [GeneratedRegex(@"^\[Behaviour\] Initialized PlayerAPI ""(?<name>.+)"" is local$",
        RegexOptions.CultureInvariant)]
    private static partial Regex LocalPlayerPattern();
}

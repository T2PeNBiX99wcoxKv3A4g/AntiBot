using System.Text.RegularExpressions;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Builds the in-instance player list. The local log is always read: joins add a player, leaves
///     remove one, and entering a new room starts over. Once an account is signed in, the VRChat API
///     is asked instead, because the log cannot tell two running clients apart.
/// </summary>
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
        _ = RunApiLoopAsync(_stop.Token);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "instance.snapshot"
            ? Task.FromResult<NativeResponse?>(context.Reply("instance.snapshot.result", Snapshot()))
            : Task.FromResult<NativeResponse?>(null);

    private void OnLinesRead(VrchatLogBatch batch)
    {
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
                    changed |= ResetSession();

                foreach (var line in batch.Lines)
                    changed |= Apply(line);
            }

        if (changed)
            Publish();
    }

    private void OnAuthChanged()
    {
        lock (_gate)
        {
            _apiInstance = null;
            _apiLocation = "";
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

    /// <summary>Updates the list from one log line; returns whether anything the UI shows changed.</summary>
    private bool Apply(VrchatLogLine line)
    {
        // A new log file means a new VRChat session; nothing from the old one carries over.
        if (line.Level == "session")
            return ResetSession();

        var message = line.Message;

        var joined = PlayerJoinedPattern().Match(message);
        if (joined.Success)
            return Upsert(
                joined.Groups["id"].Value,
                joined.Groups["name"].Value.Trim(),
                line.Time);

        var left = PlayerLeftPattern().Match(message);
        if (left.Success)
        {
            var index = _users.FindIndex(user => user.UserId == left.Groups["id"].Value);
            if (index < 0)
                return false;

            _users.RemoveAt(index);
            return true;
        }

        if (message == "[Behaviour] OnPlayerLeftRoom")
        {
            if (_users.Count == 0)
                return false;

            _users.Clear();
            return true;
        }

        var entering = EnteringRoomPattern().Match(message);
        if (entering.Success)
        {
            var world = entering.Groups["world"].Value.Trim();
            var changed = _users.Count > 0 || world != _world;

            _users.Clear();
            _world = world;
            return changed;
        }

        var joining = JoiningPattern().Match(message);
        if (joining.Success)
        {
            var instance = joining.Groups["instance"].Value;
            if (instance == _instance)
                return false;

            _instance = instance;
            return true;
        }

        var local = LocalPlayerPattern().Match(message);
        if (local.Success)
        {
            _localName = local.Groups["name"].Value;
            var index = _users.FindIndex(user => user.Name == _localName);
            if (index < 0 || _users[index].Local)
                return false;

            _users[index] = _users[index] with
            {
                Local = true
            };
            return true;
        }

        return false;
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

    private bool ResetSession()
    {
        var changed = _users.Count > 0 || _world.Length > 0 || _instance.Length > 0;

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
        string.Join(',', snapshot.Users.Select(user => $"{user.UserId}:{user.Name}:{user.Local}")));

    private InstanceSnapshot Snapshot()
    {
        lock (_gate)
        {
            if (_apiInstance is { } api && AuthService.Instance.IsLoggedIn && LooksLikeInstance(_apiLocation))
            {
                // The API lists who is really there; the log still supplies join times and who is local.
                var users = api.Users is { } apiUsers
                    ? apiUsers.Select(user => Enrich(user.Id ?? "", user.DisplayName ?? "")).ToArray()
                    : _users.ToArray();

                var count = api.UserCount ?? api.Users?.Length ?? 0;

                return new InstanceSnapshot(
                    _running || count > 0,
                    api.World?.Name ?? _world,
                    api.Location ?? _apiLocation,
                    users,
                    "api",
                    api.World?.Name ?? "",
                    count,
                    api.Capacity ?? 0);
            }

            return new InstanceSnapshot(_running, _world, _instance, _users.ToArray());
        }
    }

    /// <summary>One API user, with the log's join time and local flag when it knows them.</summary>
    private InstanceUser Enrich(string userId, string name)
    {
        var known = _users.Find(user => user.UserId == userId);
        return new InstanceUser(userId, name, known?.Local ?? false, known?.JoinedAt ?? "");
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

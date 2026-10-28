using System.Text.RegularExpressions;
using AntiBot.Messaging;
using AntiBot.Models;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     Builds the in-instance player list purely from VRChat's log. Joins add a player, leaves remove
///     one, and entering a new room starts over. Nothing is sent anywhere.
/// </summary>
internal sealed partial class InstanceService : Singleton<InstanceService>
{
    private readonly Lock _gate = new();
    private readonly List<InstanceUser> _users = [];

    private string _instance = "";
    private string _localName = "";
    private bool _running;
    private string _world = "";

    public InstanceService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;
        VrchatLogService.Instance.LinesRead += OnLinesRead;
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "instance.snapshot"
            ? Task.FromResult<NativeResponse?>(context.Reply("instance.snapshot.result", Snapshot()))
            : Task.FromResult<NativeResponse?>(null);

    private void OnLinesRead(VrchatLogBatch batch)
    {
        bool changed;

        lock (_gate)
        {
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
        }

        if (changed)
            WindowManager.Instance.NotifyMainWindow("instance.changed", Snapshot());
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

            _users[index] = _users[index] with { Local = true };
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

    private InstanceSnapshot Snapshot()
    {
        lock (_gate)
            return new(_running, _world, _instance, _users.ToArray());
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

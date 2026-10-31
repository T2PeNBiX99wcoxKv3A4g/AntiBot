using System.Collections.Concurrent;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>Where a presence value came from, strongest first.</summary>
internal enum PresenceSource
{
    /// <summary>A cached profile lookup; the slowest and least reliable.</summary>
    Profile,

    /// <summary>The instance roster: its status is fresh, but it carries no custom status text.</summary>
    Instance,

    /// <summary>The pipeline websocket or the account's own record; live and authoritative.</summary>
    Pipeline
}

/// <summary>A user's presence as the most recent source reported it.</summary>
internal sealed record Presence(string? Status, string? StatusDescription, PresenceSource Source, DateTimeOffset At);

/// <summary>
///     The one place the interface reads a user's status from: the account page and the instance list
///     both go through here, so they can never disagree.
/// </summary>
/// <remarks>
///     It is fed by the pipeline websocket (seconds, the signed-in account and its friends), by the
///     instance roster (the status of everyone in the instance), and by profile lookups as a fallback.
///     A missing field never overwrites a known one, and a weaker source cannot undo a stronger one
///     while that one is fresh, because VRChat's instance roster reports an empty custom status text
///     even when the user has one set.
/// </remarks>
internal sealed class PresenceService : Singleton<PresenceService>
{
    /// <summary>How long a stronger source keeps its value against a weaker one.</summary>
    private static readonly TimeSpan Hold = TimeSpan.FromSeconds(30);

    private readonly ConcurrentDictionary<string, Presence> _presence = new();

    /// <summary>Raised when a status changed, so the account page and the list can redraw.</summary>
    public event Action? Updated;

    public Presence? Get(string userId) => _presence.GetValueOrDefault(userId);

    public void Set(string userId, string? status, string? description, PresenceSource source)
    {
        if (Apply(userId, status, description, source))
            Updated?.Invoke();
    }

    /// <summary>Applies a whole roster at once, so the interface redraws once instead of per user.</summary>
    public void Set(IEnumerable<(string UserId, string? Status, string? StatusDescription)> values,
        PresenceSource source)
    {
        var changed = false;

        foreach (var (userId, status, description) in values)
            changed |= Apply(userId, status, description, source);

        if (changed)
            Updated?.Invoke();
    }

    public void Clear() => _presence.Clear();

    private bool Apply(string userId, string? status, string? description, PresenceSource source)
    {
        if (userId.Length == 0)
            return false;

        var now = DateTimeOffset.UtcNow;
        var current = _presence.GetValueOrDefault(userId);

        // A weaker source cannot undo a stronger one while that one is still fresh.
        if (current is not null && source < current.Source && now - current.At < Hold)
            return false;

        var nextStatus = status ?? current?.Status;
        var nextDescription = description ?? current?.StatusDescription;
        var changed = current is null ||
                      current.Status != nextStatus ||
                      current.StatusDescription != nextDescription;

        _presence[userId] = new(nextStatus, nextDescription, source, now);
        return changed;
    }
}
using System.Collections.Concurrent;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>A user's presence as the most recent source reported it.</summary>
internal sealed record Presence(string? Status, string? StatusDescription);

/// <summary>
///     The one place the interface reads a user's status from: the account page and the instance list
///     both go through here, so they can never disagree.
/// </summary>
/// <remarks>
///     It is fed by the pipeline websocket (seconds, the signed-in account and its friends), by the
///     instance poll (the instance roster carries the status of everyone in it), and by the profile
///     refresh as a fallback. A missing field never overwrites a known one, because a pipeline message
///     that leaves a field out is not the same as the user clearing it.
/// </remarks>
internal sealed class PresenceService : Singleton<PresenceService>
{
    private readonly ConcurrentDictionary<string, Presence> _presence = new();

    /// <summary>Raised when a status changed, so the account page and the list can redraw.</summary>
    public event Action? Updated;

    public Presence? Get(string userId) => _presence.GetValueOrDefault(userId);

    public void Set(string userId, string? status, string? description)
    {
        if (Apply(userId, status, description))
            Updated?.Invoke();
    }

    /// <summary>Applies a whole roster at once, so the interface redraws once instead of per user.</summary>
    public void Set(IEnumerable<(string UserId, string? Status, string? StatusDescription)> values)
    {
        var changed = false;

        foreach (var (userId, status, description) in values)
            changed |= Apply(userId, status, description);

        if (changed)
            Updated?.Invoke();
    }

    public void Clear() => _presence.Clear();

    private bool Apply(string userId, string? status, string? description)
    {
        if (userId.Length == 0)
            return false;

        var current = _presence.GetValueOrDefault(userId);
        var next = new Presence(status ?? current?.Status, description ?? current?.StatusDescription);

        if (current == next)
            return false;

        _presence[userId] = next;
        return true;
    }
}

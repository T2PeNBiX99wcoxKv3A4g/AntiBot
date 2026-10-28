namespace AntiBot.Messaging;

// Response bodies. These are named records rather than anonymous types because the
// source-generated JSON context has to know every shape the app can serialize.

/// <summary>Body for a bare <c>{ "ok": true }</c> acknowledgement.</summary>
internal sealed record OkPayload(bool Ok = true);

/// <summary>Body for <c>app.info</c>.</summary>
internal sealed record AppInfoPayload(string Version, string Platform);

/// <summary>Body for <c>settings.get</c>.</summary>
internal sealed record SettingsPayload(string LogDirectory, string DefaultLogDirectory);

/// <summary>Body for <c>log.export</c>.</summary>
internal sealed record LogExportPayload(bool Saved, int Lines, string? Path);

/// <summary>Body for the <c>window.state</c> event.</summary>
internal sealed record WindowStatePayload(bool Maximized);

/// <summary>Payload for <c>window.resize</c>: the edge being dragged.</summary>
internal sealed record WindowResizeRequest(string Direction);
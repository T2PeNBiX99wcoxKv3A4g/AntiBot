using AntiBot.Models;

namespace AntiBot.Messaging;

// Response bodies. These are named records rather than anonymous types because the
// source-generated JSON context has to know every shape the app can serialize.

/// <summary>Body for a bare <c>{ "ok": true }</c> acknowledgement.</summary>
internal sealed record OkPayload(bool Ok = true);

/// <summary>Body for <c>app.info</c>.</summary>
internal sealed record AppInfoPayload(string Version, string Platform, bool Rounded);

/// <summary>Body for <c>settings.get</c>.</summary>
internal sealed record SettingsPayload(string LogDirectory, string DefaultLogDirectory);

/// <summary>Body for <c>log.export</c>.</summary>
internal sealed record LogExportPayload(bool Saved, int Lines, string? Path);

/// <summary>Body for the <c>window.state</c> event.</summary>
internal sealed record WindowStatePayload(bool Maximized);

/// <summary>Payload for <c>window.resize</c>: the edge being dragged.</summary>
internal sealed record WindowResizeRequest(string Direction);

/// <summary>Body for <c>auth.state</c> and for the <c>auth.changed</c> event.</summary>
internal sealed record AuthPayload(string State, VrchatAccount? User, string Storage, string[] TwoFactorMethods);

/// <summary>Payload for <c>auth.login</c>.</summary>
internal sealed record AuthLoginRequest(string Username, string Password);

/// <summary>Payload for <c>auth.verify</c>; <c>method</c> is <c>totp</c>, <c>emailOtp</c> or <c>otp</c>.</summary>
internal sealed record AuthVerifyRequest(string Method, string Code);

/// <summary>Payload for <c>auth.unlock</c>, which opens a session stored with a password.</summary>
internal sealed record AuthUnlockRequest(string Password);

/// <summary>Payload for <c>auth.storage.save</c>; <c>mode</c> is <c>none</c>, <c>password</c> or <c>system</c>.</summary>
internal sealed record AuthStorageRequest(string Mode, string? Password);

/// <summary>Body for <c>auth.device.start</c>: the link to approve and its QR image.</summary>
internal sealed record DeviceCodePayload(string DeviceCode, string Url, string QrDataUrl, int Interval, int ExpiresIn);

/// <summary>Payload for <c>auth.device.poll</c>.</summary>
internal sealed record DevicePollRequest(string DeviceCode);

/// <summary>Body for <c>auth.device.poll</c>: pending with a reason, or the signed-in session.</summary>
internal sealed record DevicePollPayload(bool Approved, string? Reason, AuthPayload? Auth);
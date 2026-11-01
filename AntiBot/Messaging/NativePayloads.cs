using AntiBot.Models;

namespace AntiBot.Messaging;

// Response bodies. These are named records rather than anonymous types because the
// source-generated JSON context has to know every shape the app can serialize.

/// <summary>Body for a bare <c>{ "ok": true }</c> acknowledgement.</summary>
internal sealed record OkPayload(bool Ok = true);

/// <summary>Body for <c>app.info</c>.</summary>
internal sealed record AppInfoPayload(string Version, string Platform, bool Rounded, bool Debug);

/// <summary>Body for <c>settings.get</c>.</summary>
internal sealed record SettingsPayload(
    string LogDirectory,
    string DefaultLogDirectory,
    string[] AvatarApiProviders,
    bool AutoBlock,
    bool AutoDisableAvatarInteraction,
    bool AutoHideChatBox,
    bool AutoCloseVrchat,
    bool AutoSafeMode,
    bool AutoSafeAvatar,
    string SafeAvatarId,
    bool SkipCloseInVr,
    bool AutoRejectFriendRequests,
    int ThreatThreshold,
    string[] Whitelist,
    string Language,
    bool StartHidden,
    int OscPort);

/// <summary>Payload for <c>app.setStartup</c>: whether the startup entry should exist.</summary>
internal sealed record StartupRequest(bool Enabled);

/// <summary>Body for the <c>app.startup</c> messages; the entry's presence is the state.</summary>
internal sealed record StartupPayload(bool Supported, bool Enabled);

/// <summary>Body for <c>log.export</c>.</summary>
internal sealed record LogExportPayload(bool Saved, int Lines, string? Path);

/// <summary>Body for the <c>window.state</c> event.</summary>
internal sealed record WindowStatePayload(bool Maximized);

/// <summary>Payload for <c>window.resize</c>: the edge being dragged.</summary>
internal sealed record WindowResizeRequest(string Direction);

/// <summary>One row of the account list; the avatar is a data URL so it shows while locked.</summary>
internal sealed record AccountSummaryPayload(
    string Dir,
    string Name,
    string? Avatar,
    string Storage,
    bool Active,
    bool Stored);

/// <summary>Body for <c>auth.state</c> and for the <c>auth.changed</c> event.</summary>
internal sealed record AuthPayload(
    string State,
    VrchatAccount? User,
    string Storage,
    string[] TwoFactorMethods,
    bool SystemStorage,
    string SystemStorageName,
    bool TpmStorage,
    bool HelloStorage,
    bool SoftwareStorage,
    string? ExpiresAt,
    bool StorageChosen,
    AccountSummaryPayload[] Accounts);

/// <summary>Payload for <c>auth.login</c>.</summary>
internal sealed record AuthLoginRequest(string Username, string Password);

/// <summary>Payload for <c>auth.verify</c>; <c>method</c> is <c>totp</c>, <c>emailOtp</c> or <c>otp</c>.</summary>
internal sealed record AuthVerifyRequest(string Method, string Code);

/// <summary>Payload for <c>auth.unlock</c>, which opens a session stored with a password.</summary>
internal sealed record AuthUnlockRequest(string Password, string? Dir);

/// <summary>Payload for <c>auth.switch</c>: the account folder to become active.</summary>
internal sealed record AuthSwitchRequest(string Dir);

/// <summary>Payload for <c>auth.remove</c>: the account folder to forget.</summary>
internal sealed record AuthAccountRequest(string Dir);

/// <summary>
///     Body for <c>auth.switch</c>. A password-protected session is not opened here; the interface asks
///     for the password first, so a cancelled switch leaves the current account untouched.
/// </summary>
internal sealed record SwitchPayload(bool Ok, bool NeedsPassword, string? Error, AuthPayload? Auth);

/// <summary>Payload for <c>auth.storage.save</c>; <c>mode</c> is <c>none</c>, <c>password</c> or <c>system</c>.</summary>
internal sealed record AuthStorageRequest(string Mode, string? Password);

/// <summary>Body for <c>auth.device.start</c>: the link to approve and its QR image.</summary>
internal sealed record DeviceCodePayload(string DeviceCode, string Url, string QrDataUrl, int Interval, int ExpiresIn);

/// <summary>Payload for <c>auth.device.poll</c>.</summary>
internal sealed record DevicePollRequest(string DeviceCode);

/// <summary>Body for <c>auth.device.poll</c>: pending with a reason, or the signed-in session.</summary>
internal sealed record DevicePollPayload(bool Approved, string? Reason, AuthPayload? Auth);

/// <summary>Payload for <c>debug.user</c>: a user id or a link that contains one.</summary>
internal sealed record DebugUserRequest(string UserId);

/// <summary>Body for <c>debug.user</c>: everything the scoring looks at, and its result.</summary>
internal sealed record DebugUserPayload(
    string Id,
    string DisplayName,
    string? DateJoined,
    string? Trust,
    string? Platform,
    string? AvatarName,
    bool IsRobot,
    int Threat,
    ThreatReason[] Reasons);

/// <summary>Body for <c>debug.safeMode</c>: whether it was sent, and what the OSC state looked like.</summary>
internal sealed record DebugSafeModePayload(bool Ok, bool Listening, bool SafeMode);

/// <summary>Body for <c>debug.avatar</c>: whether the switch was sent, and why it may not have been.</summary>
internal sealed record DebugAvatarPayload(bool Ok, bool Listening, bool Already, bool Configured);

/// <summary>Body for <c>osc.status</c>: what the host knows about VRChat's OSC.</summary>
internal sealed record OscStatusPayload(bool Listening, int Port, bool Receiving, int Detected);

/// <summary>Payload for <c>osc.test</c>: the port to try, so an unsaved field still works.</summary>
internal sealed record OscTestRequest(int Port);

/// <summary>Body for <c>osc.test</c>: whether the test message was sent, plus the same state.</summary>
internal sealed record OscTestPayload(bool Sent, bool Listening, int Port, bool Receiving, int Detected);

/// <summary>Payload for <c>app.navigate</c>: the page the tray asked the interface to open.</summary>
internal sealed record AppNavigatePayload(string Page);

/// <summary>Payload for <c>system.openUrl</c>: a VRChat link to hand to the default browser.</summary>
internal sealed record OpenUrlRequest(string Url);

/// <summary>Payload for <c>friendRequests.undo</c>: the request to take back.</summary>
internal sealed record FriendRequestActionRequest(string Id);

/// <summary>Payload for <c>operations.undo</c>: the operation to take back.</summary>
internal sealed record OperationActionRequest(long Id);

/// <summary>Body for <c>operations.undo</c>: whether it worked, and what to tell the user.</summary>
internal sealed record OperationUndoPayload(bool Ok, string Message);

/// <summary>Payload for <c>user.describe</c>: the user to open in the details panel.</summary>
internal sealed record UserDescribeRequest(string UserId, string DisplayName);

/// <summary>Payload for <c>user.bio</c>: the user whose public profile should be read.</summary>
internal sealed record UserBioRequest(string UserId);

/// <summary>Body for <c>user.bio</c>.</summary>
internal sealed record UserBioPayload(string? Bio);
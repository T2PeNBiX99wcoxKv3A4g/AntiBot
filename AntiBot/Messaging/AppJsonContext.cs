using System.Text.Json;
using System.Text.Json.Serialization;
using AntiBot.Models;
using AntiBot.Services;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Updates;

namespace AntiBot.Messaging;

/// <summary>
///     Source-generated serializer context. The Release build is trimmed, which turns off
///     reflection-based serialization, so every shape that crosses the native bridge must be
///     registered here.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    NumberHandling = JsonNumberHandling.AllowReadingFromString,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    ReadCommentHandling = JsonCommentHandling.Skip,
    AllowTrailingCommas = true)]
[JsonSerializable(typeof(NativeRequest))]
[JsonSerializable(typeof(NativeResponse))]
[JsonSerializable(typeof(NativeEvent))]
[JsonSerializable(typeof(LocaleRequest))]
[JsonSerializable(typeof(LocalePayload))]
[JsonSerializable(typeof(Dictionary<string, string>))]
[JsonSerializable(typeof(OkPayload))]
[JsonSerializable(typeof(AppInfoPayload))]
[JsonSerializable(typeof(UpdateCheckPayload))]
[JsonSerializable(typeof(UpdateAckPayload))]
[JsonSerializable(typeof(UpdateProgressPayload))]
[JsonSerializable(typeof(UpdateChangelogPayload))]
[JsonSerializable(typeof(SettingsPayload))]
[JsonSerializable(typeof(StartupRequest))]
[JsonSerializable(typeof(StartupPayload))]
[JsonSerializable(typeof(LogExportPayload))]
[JsonSerializable(typeof(WindowStatePayload))]
[JsonSerializable(typeof(WindowResizeRequest))]
[JsonSerializable(typeof(AuthPayload))]
[JsonSerializable(typeof(AuthExpiredPayload))]
[JsonSerializable(typeof(AccountSummaryPayload))]
[JsonSerializable(typeof(AccountSummaryPayload[]))]
[JsonSerializable(typeof(SavedAccountPayload))]
[JsonSerializable(typeof(SavedAccountPayload[]))]
[JsonSerializable(typeof(AccountIndex))]
[JsonSerializable(typeof(StoredAccount[]))]
[JsonSerializable(typeof(VrchatAccount))]
[JsonSerializable(typeof(AuthLoginRequest))]
[JsonSerializable(typeof(SavedLoginRequest))]
[JsonSerializable(typeof(AuthVerifyRequest))]
[JsonSerializable(typeof(AuthUnlockRequest))]
[JsonSerializable(typeof(AuthSwitchRequest))]
[JsonSerializable(typeof(AuthAccountRequest))]
[JsonSerializable(typeof(SwitchPayload))]
[JsonSerializable(typeof(AuthStorageRequest))]
[JsonSerializable(typeof(DeviceCodePayload))]
[JsonSerializable(typeof(DevicePollRequest))]
[JsonSerializable(typeof(DevicePollPayload))]
[JsonSerializable(typeof(AppNavigatePayload))]
[JsonSerializable(typeof(DebugUserRequest))]
[JsonSerializable(typeof(DebugUserPayload))]
[JsonSerializable(typeof(DebugSafeModePayload))]
[JsonSerializable(typeof(DebugAvatarPayload))]
[JsonSerializable(typeof(OscStatusPayload))]
[JsonSerializable(typeof(OscTestRequest))]
[JsonSerializable(typeof(OscTestPayload))]
[JsonSerializable(typeof(OpenUrlRequest))]
[JsonSerializable(typeof(FriendRequestActionRequest))]
[JsonSerializable(typeof(OperationActionRequest))]
[JsonSerializable(typeof(OperationUndoPayload))]
[JsonSerializable(typeof(UserDescribeRequest))]
[JsonSerializable(typeof(UserBioRequest))]
[JsonSerializable(typeof(UserBioPayload))]
[JsonSerializable(typeof(OperationEntry[]))]
[JsonSerializable(typeof(InstanceSnapshot))]
[JsonSerializable(typeof(InstanceUser))]
[JsonSerializable(typeof(InstanceUser[]))]
[JsonSerializable(typeof(ThreatReason))]
[JsonSerializable(typeof(ThreatReason[]))]
[JsonSerializable(typeof(FriendRequest[]))]
[JsonSerializable(typeof(VrchatLogLine))]
[JsonSerializable(typeof(VrchatLogSnapshot))]
[JsonSerializable(typeof(VrchatLogBatch))]
[JsonSerializable(typeof(AppSettings))]
[JsonSerializable(typeof(RememberedLogin))]
[JsonSerializable(typeof(CookieRecord))]
[JsonSerializable(typeof(BatchParseRequest))]
[JsonSerializable(typeof(BatchPreviewPayload))]
[JsonSerializable(typeof(BatchRunRequest))]
[JsonSerializable(typeof(BatchStartPayload))]
[JsonSerializable(typeof(BatchProgressPayload))]
[JsonSerializable(typeof(BatchOutcomePayload))]
[JsonSerializable(typeof(BatchFinishedPayload))]
[JsonSerializable(typeof(BatchStatePayload))]
internal sealed partial class AppJsonContext : JsonSerializerContext;
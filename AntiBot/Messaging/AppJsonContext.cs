using System.Text.Json;
using System.Text.Json.Serialization;
using AntiBot.Models;
using PhotinoNetUtils.Messaging;

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
[JsonSerializable(typeof(OkPayload))]
[JsonSerializable(typeof(AppInfoPayload))]
[JsonSerializable(typeof(SettingsPayload))]
[JsonSerializable(typeof(LogExportPayload))]
[JsonSerializable(typeof(WindowStatePayload))]
[JsonSerializable(typeof(WindowResizeRequest))]
[JsonSerializable(typeof(AuthPayload))]
[JsonSerializable(typeof(AuthLoginRequest))]
[JsonSerializable(typeof(AuthVerifyRequest))]
[JsonSerializable(typeof(AuthUnlockRequest))]
[JsonSerializable(typeof(AuthStorageRequest))]
[JsonSerializable(typeof(DeviceCodePayload))]
[JsonSerializable(typeof(DevicePollRequest))]
[JsonSerializable(typeof(DevicePollPayload))]
[JsonSerializable(typeof(OpenUrlRequest))]
[JsonSerializable(typeof(InstanceSnapshot))]
[JsonSerializable(typeof(InstanceUser))]
[JsonSerializable(typeof(FriendRequest[]))]
[JsonSerializable(typeof(VrchatLogLine))]
[JsonSerializable(typeof(VrchatLogSnapshot))]
[JsonSerializable(typeof(VrchatLogBatch))]
[JsonSerializable(typeof(AppSettings))]
internal sealed partial class AppJsonContext : JsonSerializerContext;
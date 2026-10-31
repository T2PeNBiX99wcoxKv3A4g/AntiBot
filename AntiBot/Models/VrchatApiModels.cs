using System.Text.Json.Serialization;

namespace AntiBot.Models;

// VRChat's own response shapes. Only the fields AntiBot reads are declared; the rest of the payload is
// ignored. They are internal because nothing outside the API client should depend on them.

internal sealed record ApiAuthUser(
    string? Id,
    string? DisplayName,
    string? CurrentAvatarImageUrl,
    string? CurrentAvatarThumbnailImageUrl,
    string? IconUrl,
    string? UserIcon,
    string? ProfilePicOverride,
    string? ProfilePicOverrideThumbnail,
    string? Status,
    string? StatusDescription,
    string? Location,
    string[]? RequiresTwoFactorAuth);

internal sealed record ApiWorld(string? Id, string? Name, string? ThumbnailImageUrl, string? ImageUrl);

internal sealed record ApiInstanceUser(
    string? Id,
    string? DisplayName,
    string? CurrentAvatarThumbnailImageUrl,
    string? Status,
    string? StatusDescription);

internal sealed record ApiUser(
    string? Id,
    string? DisplayName,
    string? CurrentAvatarImageUrl,
    string? CurrentAvatarThumbnailImageUrl,
    string? IconUrl,
    string? ProfilePicOverride,
    string? ProfilePicOverrideThumbnail,
    string? Status,
    string? StatusDescription,
    string? Bio,
    [property: JsonPropertyName("date_joined")]
    string? DateJoined,
    string[]? Tags,
    string? Platform,
    [property: JsonPropertyName("last_platform")]
    string? LastPlatform,
    [property: JsonPropertyName("last_activity")]
    string? LastActivity,
    bool? IsFriend);

/// <summary>One uploaded file; an avatar image's name carries the avatar name.</summary>
internal sealed record ApiFile(
    string? Id,
    string? Name,
    string? OwnerId,
    string[]? Tags);

internal sealed record ApiInstance(
    string? Id,
    string? Location,
    string? WorldId,
    string? InstanceId,
    string? Name,
    string? DisplayName,
    int? UserCount,
    int? Capacity,
    string? Type,
    string? Region,
    string? OwnerId,
    string? ShortName,
    bool? RoleRestricted,
    bool? AgeGate,
    ApiWorld? World,
    ApiInstanceUser[]? Users);

internal sealed record ApiErrorBody(ApiError? Error);

internal sealed record ApiError(string? Message, int? StatusCode);

internal sealed record ApiVerifyResult(bool? Verified);

internal sealed record ApiCodeRequest(string Code);

internal sealed record ApiDeviceCode(
    string? DeviceCode,
    string? VerificationUrlComplete,
    int? Interval,
    int? ExpiresIn);

internal sealed record ApiDeviceStatus(ApiAuthUser? User);

internal sealed record ApiDeviceStatusRequest(string DeviceCode);

/// <summary>One avatar from an external avatar database, looked up by its image file id.</summary>
internal sealed record AvatarLookup(string? Id, string? Name, string? AvatarName, string? ImageUrl)
{
    /// <summary>Providers disagree on the field: avtrdb uses <c>name</c>, vrcdb <c>avatarName</c>.</summary>
    public string? ResolvedName => !string.IsNullOrEmpty(Name) ? Name : AvatarName;
}

/// <summary>One entry of the session cookie jar, as it is written to disk.</summary>
internal sealed record CookieRecord(
    string Name,
    string Value,
    string? Domain,
    string? Path,
    DateTimeOffset Expires,
    bool Secure,
    bool HttpOnly);

[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(ApiAuthUser))]
[JsonSerializable(typeof(ApiInstance))]
[JsonSerializable(typeof(ApiUser))]
[JsonSerializable(typeof(ApiFile))]
[JsonSerializable(typeof(ApiErrorBody))]
[JsonSerializable(typeof(ApiVerifyResult))]
[JsonSerializable(typeof(ApiCodeRequest))]
[JsonSerializable(typeof(ApiDeviceCode))]
[JsonSerializable(typeof(ApiDeviceStatus))]
[JsonSerializable(typeof(ApiDeviceStatusRequest))]
[JsonSerializable(typeof(AvatarLookup))]
[JsonSerializable(typeof(CookieRecord[]))]
internal sealed partial class VrchatJsonContext : JsonSerializerContext;

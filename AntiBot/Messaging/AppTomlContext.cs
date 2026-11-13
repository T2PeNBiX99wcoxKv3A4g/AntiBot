using System.Text.Json.Serialization;
using AntiBot.Models;
using Tomlyn.Serialization;

namespace AntiBot.Messaging;

/// <summary>The settings file's TOML serializer, generated so a trimmed build keeps every property.</summary>
[TomlSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    WriteIndented = true,
    IndentSize = 2)]
[TomlSerializable(typeof(AppSettings))]
internal partial class AppTomlContext : TomlSerializerContext;
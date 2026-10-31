using AntiBot.Models;
using Microsoft.Data.Sqlite;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace AntiBot.Services;

/// <summary>
///     The app's local database: the ordered stream of instance events, and the player profiles fetched
///     from the API.
/// </summary>
/// <remarks>
///     SQLite in WAL mode, so a write never blocks the reader. Both tables stay small on purpose: events
///     are only joins, leaves and location changes, and a profile is one row per user. Events older than
///     <see cref="RetentionDays" /> are pruned on startup.
/// </remarks>
internal sealed class Database : Singleton<Database>
{
    private const int RetentionDays = 30;

    private static readonly string DatabasePath = Path.Combine(Constants.SettingsDirectory, "antibot.db");

    private static readonly string ConnectionString = new SqliteConnectionStringBuilder
    {
        DataSource = DatabasePath,
        Mode = SqliteOpenMode.ReadWriteCreate,
        Pooling = true
    }.ToString();

    /// <summary>Creates the schema and drops expired events. Called once, before the services start.</summary>
    public void Initialize()
    {
        MoveFromTheDataFolder();

        Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText = """
                                  PRAGMA journal_mode=WAL;
                                  PRAGMA busy_timeout=5000;

                                  CREATE TABLE IF NOT EXISTS game_events (
                                      id           INTEGER PRIMARY KEY AUTOINCREMENT,
                                      created_at   INTEGER NOT NULL,
                                      at           TEXT NOT NULL,
                                      kind         TEXT NOT NULL,
                                      world        TEXT NOT NULL DEFAULT '',
                                      instance     TEXT NOT NULL DEFAULT '',
                                      user_id      TEXT NOT NULL DEFAULT '',
                                      display_name TEXT NOT NULL DEFAULT ''
                                  );

                                  CREATE TABLE IF NOT EXISTS players (
                                      id            TEXT PRIMARY KEY,
                                      display_name  TEXT NOT NULL,
                                      avatar_url    TEXT,
                                      icon_url      TEXT,
                                      avatar_image_url TEXT,
                                      status        TEXT,
                                      status_description TEXT,
                                      pronouns      TEXT,
                                      bio           TEXT,
                                      date_joined   TEXT,
                                      tags          TEXT,
                                      platform      TEXT,
                                      last_platform TEXT,
                                      last_activity TEXT,
                                      fetched_at    INTEGER NOT NULL
                                  );

                                  CREATE TABLE IF NOT EXISTS avatars (
                                      file_id    TEXT PRIMARY KEY,
                                      avatar_id  TEXT,
                                      name       TEXT NOT NULL,
                                      fetched_at INTEGER NOT NULL
                                  );

                                  CREATE TABLE IF NOT EXISTS friend_requests (
                                      id           TEXT PRIMARY KEY,
                                      user_id      TEXT NOT NULL,
                                      display_name TEXT NOT NULL DEFAULT '',
                                      created_at   TEXT NOT NULL DEFAULT '',
                                      seen         INTEGER NOT NULL DEFAULT 0,
                                      active       INTEGER NOT NULL DEFAULT 1,
                                      first_seen   INTEGER NOT NULL,
                                      last_seen    INTEGER NOT NULL
                                  );

                                  CREATE INDEX IF NOT EXISTS ix_game_events_kind ON game_events (kind, id);
                                  """;
            command.ExecuteNonQuery();

            // The table predates the full-size avatar and the profile icon, so add them where missing.
            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN avatar_image_url TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN icon_url TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN status TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN status_description TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN bio TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN pronouns TEXT";
                migration.ExecuteNonQuery();
            });

            Try.Run(() =>
            {
                using var migration = connection.CreateCommand();
                migration.CommandText = "ALTER TABLE players ADD COLUMN last_platform TEXT";
                migration.ExecuteNonQuery();
            });
        }).OnFailure(ex => Log.Error(ex, "Could not open the local database"));

        Prune();

        // Older builds cleared the whole list on "OnPlayerLeftRoom", which fires when any player
        // leaves; those events would rebuild a wrong list, so drop them.
        Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText = "DELETE FROM game_events WHERE kind = 'clear'";
            command.ExecuteNonQuery();
        }).OnFailure(ex => Log.Warning(ex, "Could not drop the old clear events"));
    }

    /// <summary>Appends events to the stream; one transaction per batch.</summary>
    public async Task AddEventsAsync(IReadOnlyList<GameEvent> events, CancellationToken token = default)
    {
        if (events.Count == 0)
            return;

        await using var connection = await OpenAsync(token);
        await using var transaction = (SqliteTransaction)await connection.BeginTransactionAsync(token);

        await using var command = connection.CreateCommand();
        command.Transaction = transaction;
        command.CommandText = """
                              INSERT INTO game_events (created_at, at, kind, world, instance, user_id, display_name)
                              VALUES ($createdAt, $at, $kind, $world, $instance, $userId, $displayName)
                              """;

        var createdAt = command.CreateParameter();
        createdAt.ParameterName = "$createdAt";
        createdAt.Value = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        command.Parameters.Add(createdAt);

        var at = command.CreateParameter();
        at.ParameterName = "$at";
        command.Parameters.Add(at);

        var kind = command.CreateParameter();
        kind.ParameterName = "$kind";
        command.Parameters.Add(kind);

        var world = command.CreateParameter();
        world.ParameterName = "$world";
        command.Parameters.Add(world);

        var instance = command.CreateParameter();
        instance.ParameterName = "$instance";
        command.Parameters.Add(instance);

        var userId = command.CreateParameter();
        userId.ParameterName = "$userId";
        command.Parameters.Add(userId);

        var displayName = command.CreateParameter();
        displayName.ParameterName = "$displayName";
        command.Parameters.Add(displayName);

        foreach (var item in events)
        {
            at.Value = item.At;
            kind.Value = item.Kind;
            world.Value = item.World;
            instance.Value = item.Instance;
            userId.Value = item.UserId;
            displayName.Value = item.DisplayName;
            await command.ExecuteNonQueryAsync(token);
        }

        await transaction.CommitAsync(token);
    }

    /// <summary>
    ///     The events of the last session: everything from its last location change onwards, so replaying
    ///     them rebuilds the player list the app had before it was closed.
    /// </summary>
    public async Task<IReadOnlyList<GameEvent>> LoadSessionAsync(CancellationToken token = default)
    {
        var attempt = await Try.Run(async () =>
        {
            await using var connection = await OpenAsync(token);
            await using var command = connection.CreateCommand();
            command.CommandText = """
                                  SELECT at, kind, world, instance, user_id, display_name
                                  FROM game_events
                                  WHERE id >= COALESCE(
                                      (SELECT MAX(id) FROM game_events WHERE kind IN ('reset', 'location', 'instance')),
                                      0)
                                  ORDER BY id
                                  """;

            var events = new List<GameEvent>();
            await using var reader = await command.ExecuteReaderAsync(token);
            while (await reader.ReadAsync(token))
                events.Add(new(reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                    reader.GetString(4), reader.GetString(5)));

            return events;
        });

        return attempt
            .OnFailure(ex => Log.Warning(ex, "Could not read the stored instance events"))
            .GetOrElse(_ => []);
    }

    /// <summary>Every cached profile, so the list is complete before the API is asked anything.</summary>
    public IReadOnlyDictionary<string, PlayerProfile> LoadPlayers()
    {
        var attempt = Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText =
                "SELECT id, display_name, avatar_url, icon_url, avatar_image_url, status, status_description, pronouns, bio, date_joined, tags, platform, last_platform, last_activity FROM players";

            var players = new Dictionary<string, PlayerProfile>();
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var id = reader.GetString(0);
                players[id] = new(id, reader.GetString(1), reader.GetStringOrNull(2), reader.GetStringOrNull(3),
                    reader.GetStringOrNull(4), reader.GetStringOrNull(5), reader.GetStringOrNull(6),
                    reader.GetStringOrNull(7), reader.GetStringOrNull(8), reader.GetStringOrNull(9),
                    ParseTags(reader.GetStringOrNull(10)), reader.GetStringOrNull(11), reader.GetStringOrNull(12),
                    reader.GetStringOrNull(13));
            }

            return players;
        });

        return attempt
            .OnFailure(ex => Log.Warning(ex, "Could not read the stored player profiles"))
            .GetOrElse(_ => new());
    }

    public async Task SavePlayerAsync(PlayerProfile player, CancellationToken token = default)
    {
        var attempt = await Try.Run(async () =>
        {
            await using var connection = await OpenAsync(token);
            await using var command = connection.CreateCommand();
            command.CommandText = """
                                  INSERT INTO players (id, display_name, avatar_url, icon_url, avatar_image_url,
                                                       status, status_description, pronouns, bio, date_joined, tags,
                                                       platform, last_platform, last_activity, fetched_at)
                                  VALUES ($id, $displayName, $avatarUrl, $iconUrl, $avatarImageUrl, $status,
                                          $statusDescription, $pronouns, $bio, $dateJoined, $tags, $platform,
                                          $lastPlatform, $lastActivity, $fetchedAt)
                                  ON CONFLICT (id) DO UPDATE SET
                                      display_name = excluded.display_name,
                                      avatar_url = excluded.avatar_url,
                                      icon_url = excluded.icon_url,
                                      avatar_image_url = excluded.avatar_image_url,
                                      status = excluded.status,
                                      status_description = excluded.status_description,
                                      pronouns = excluded.pronouns,
                                      bio = excluded.bio,
                                      date_joined = excluded.date_joined,
                                      tags = excluded.tags,
                                      platform = excluded.platform,
                                      last_platform = excluded.last_platform,
                                      last_activity = excluded.last_activity,
                                      fetched_at = excluded.fetched_at
                                  """;

            command.Parameters.AddWithValue("$id", player.Id);
            command.Parameters.AddWithValue("$displayName", player.DisplayName);
            command.Parameters.AddWithValue("$avatarUrl", (object?)player.AvatarUrl ?? DBNull.Value);
            command.Parameters.AddWithValue("$iconUrl", (object?)player.IconUrl ?? DBNull.Value);
            command.Parameters.AddWithValue("$avatarImageUrl", (object?)player.AvatarImageUrl ?? DBNull.Value);
            command.Parameters.AddWithValue("$status", (object?)player.Status ?? DBNull.Value);
            command.Parameters.AddWithValue("$statusDescription", (object?)player.StatusDescription ?? DBNull.Value);
            command.Parameters.AddWithValue("$pronouns", (object?)player.Pronouns ?? DBNull.Value);
            command.Parameters.AddWithValue("$bio", (object?)player.Bio ?? DBNull.Value);
            command.Parameters.AddWithValue("$dateJoined", (object?)player.DateJoined ?? DBNull.Value);
            command.Parameters.AddWithValue("$tags", string.Join(',', player.Tags));
            command.Parameters.AddWithValue("$platform", (object?)player.Platform ?? DBNull.Value);
            command.Parameters.AddWithValue("$lastPlatform", (object?)player.LastPlatform ?? DBNull.Value);
            command.Parameters.AddWithValue("$lastActivity", (object?)player.LastActivity ?? DBNull.Value);
            command.Parameters.AddWithValue("$fetchedAt", DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());

            await command.ExecuteNonQueryAsync(token);
        });

        attempt.OnFailure(ex => Log.Warning(ex, "Could not store the profile of {UserId}", player.Id));
    }

    /// <summary>Every friend request ever recorded, newest first.</summary>
    public IReadOnlyList<FriendRequestRow> LoadFriendRequests()
    {
        var attempt = Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText = """
                                  SELECT id, user_id, display_name, created_at, seen, active, first_seen, last_seen
                                  FROM friend_requests
                                  ORDER BY first_seen DESC
                                  """;

            var rows = new List<FriendRequestRow>();
            using var reader = command.ExecuteReader();
            while (reader.Read())
                rows.Add(new(reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                    reader.GetInt64(4) != 0, reader.GetInt64(5) != 0, reader.GetInt64(6), reader.GetInt64(7)));

            return rows;
        });

        return attempt
            .OnFailure(ex => Log.Warning(ex, "Could not read the stored friend requests"))
            .GetOrElse(_ => new List<FriendRequestRow>());
    }

    /// <summary>
    ///     Records the requests the API just returned. They are history, so nothing is deleted: a request
    ///     that is no longer pending is only marked inactive.
    /// </summary>
    public async Task SaveFriendRequestsAsync(IReadOnlyList<FriendRequestRow> requests, CancellationToken token = default)
    {
        var attempt = await Try.Run(async () =>
        {
            await using var connection = await OpenAsync(token);
            await using var transaction = (SqliteTransaction)await connection.BeginTransactionAsync(token);

            var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            foreach (var request in requests)
            {
                await using var command = connection.CreateCommand();
                command.Transaction = transaction;
                command.CommandText = """
                                      INSERT INTO friend_requests
                                          (id, user_id, display_name, created_at, seen, active, first_seen, last_seen)
                                      VALUES ($id, $userId, $displayName, $createdAt, $seen, $active, $now, $now)
                                      ON CONFLICT (id) DO UPDATE SET
                                          user_id = excluded.user_id,
                                          display_name = excluded.display_name,
                                          created_at = excluded.created_at,
                                          seen = excluded.seen,
                                          active = excluded.active,
                                          last_seen = excluded.last_seen
                                      """;

                command.Parameters.AddWithValue("$id", request.Id);
                command.Parameters.AddWithValue("$userId", request.UserId);
                command.Parameters.AddWithValue("$displayName", request.DisplayName);
                command.Parameters.AddWithValue("$createdAt", request.CreatedAt);
                command.Parameters.AddWithValue("$seen", request.Seen ? 1 : 0);
                command.Parameters.AddWithValue("$active", request.Active ? 1 : 0);
                command.Parameters.AddWithValue("$now", now);

                await command.ExecuteNonQueryAsync(token);
            }

            // Anything the API did not return this time is no longer pending.
            await using var expire = connection.CreateCommand();
            expire.Transaction = transaction;
            expire.CommandText = "UPDATE friend_requests SET active = 0 WHERE last_seen < $now";
            expire.Parameters.AddWithValue("$now", now);
            await expire.ExecuteNonQueryAsync(token);

            await transaction.CommitAsync(token);
        });

        attempt.OnFailure(ex => Log.Warning(ex, "Could not store the friend requests"));
    }

    /// <summary>Every avatar name resolved so far, keyed by the image file id it was found from.</summary>
    public IReadOnlyDictionary<string, string> LoadAvatars()
    {
        var attempt = Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT file_id, name FROM avatars";

            var avatars = new Dictionary<string, string>();
            using var reader = command.ExecuteReader();
            while (reader.Read())
                avatars[reader.GetString(0)] = reader.GetString(1);

            return avatars;
        });

        return attempt
            .OnFailure(ex => Log.Warning(ex, "Could not read the stored avatar names"))
            .GetOrElse(_ => new());
    }

    public async Task SaveAvatarAsync(string fileId, string avatarId, string name, CancellationToken token = default)
    {
        var attempt = await Try.Run(async () =>
        {
            await using var connection = await OpenAsync(token);
            await using var command = connection.CreateCommand();
            command.CommandText = """
                                  INSERT INTO avatars (file_id, avatar_id, name, fetched_at)
                                  VALUES ($fileId, $avatarId, $name, $fetchedAt)
                                  ON CONFLICT (file_id) DO UPDATE SET
                                      avatar_id = excluded.avatar_id,
                                      name = excluded.name,
                                      fetched_at = excluded.fetched_at
                                  """;

            command.Parameters.AddWithValue("$fileId", fileId);
            command.Parameters.AddWithValue("$avatarId", avatarId);
            command.Parameters.AddWithValue("$name", name);
            command.Parameters.AddWithValue("$fetchedAt", DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());

            await command.ExecuteNonQueryAsync(token);
        });

        attempt.OnFailure(ex => Log.Warning(ex, "Could not store the avatar {FileId}", fileId));
    }

    private void Prune()
    {
        var cutoff = DateTimeOffset.UtcNow.AddDays(-RetentionDays).ToUnixTimeMilliseconds();

        Try.Run(() =>
        {
            using var connection = Open();
            using var command = connection.CreateCommand();
            command.CommandText = "DELETE FROM game_events WHERE created_at < $cutoff";
            command.Parameters.AddWithValue("$cutoff", cutoff);
            command.ExecuteNonQuery();
        }).OnFailure(ex => Log.Warning(ex, "Could not prune the stored instance events"));
    }

    /// <summary>
    ///     Tags are simple identifiers (<c>system_trust_known</c>), so a comma-separated column keeps the
    ///     database free of the reflection-based serializer the trimmed build turns off.
    /// </summary>
    private static string[] ParseTags(string? tags)
    {
        if (string.IsNullOrEmpty(tags))
            return [];

        if (tags[0] != '[')
            return tags.Split(',', StringSplitOptions.RemoveEmptyEntries);

        // A row written before tags were stored comma-separated.
        return
        [
            .. tags.Trim('[', ']')
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(tag => tag.Trim().Trim('"'))
                .Where(tag => tag.Length > 0)
        ];
    }

    /// <summary>Moves the database an older build left in the data folder, next to the settings instead.</summary>
    private void MoveFromTheDataFolder()
    {
        var legacy = Path.Combine(Constants.DataDirectory, "antibot.db");
        if (!File.Exists(legacy) || File.Exists(DatabasePath))
            return;

        foreach (var suffix in new[]
                 {
                     "", "-wal", "-shm"
                 })
        {
            var from = legacy + suffix;
            if (!File.Exists(from))
                continue;

            Try.Run(() => File.Move(from, DatabasePath + suffix, true))
                .OnFailure(ex => Log.Warning(ex, "Could not move {File} next to the settings", from));
        }
    }

    private static SqliteConnection Open()
    {
        var connection = new SqliteConnection(ConnectionString);
        connection.Open();
        return connection;
    }

    private static async Task<SqliteConnection> OpenAsync(CancellationToken token)
    {
        var connection = new SqliteConnection(ConnectionString);
        await connection.OpenAsync(token);
        return connection;
    }
}

internal static class SqliteReaderExtensions
{
    public static string? GetStringOrNull(this SqliteDataReader reader, int ordinal) =>
        reader.IsDBNull(ordinal) ? null : reader.GetString(ordinal);
}
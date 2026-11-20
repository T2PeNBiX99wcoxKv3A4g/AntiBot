using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using PhotinoNetUtils.Hosting;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     The one local server this window talks to: the built interface in a release build, and the
///     account pictures in both builds.
/// </summary>
internal static class AppServer
{
    /// <summary>The prefix for this run's data routes, or empty before the server started.</summary>
    public static string DataUrl { get; private set; } = "";

    public static StaticServer Start()
    {
        var server = StaticServer.Start(
            Constants.DataDirectory,
            typeof(AppServer).Assembly,
            "Resources/wwwroot",
            MapData,
#if DEBUG
            ["http://127.0.0.1:3200", "http://localhost:3200"]
#else
            []
#endif
        );

        DataUrl = server.DataUrl;
        Log.Information("Data plane at {Url}", DataUrl);

        return server;
    }

    private static void MapData(WebApplication app, string token)
    {
        // An account picture is a small PNG, but it is still a picture: as a response it keeps the
        // browser's cache and connection pool, and the payload carries a URL instead of base64.
        app.MapGet($"/data/{token}/avatar/{{id}}", (string id) =>
        {
            var file = AccountStore.AvatarFile(id);

            if (file is not { Length: > 0 } || !File.Exists(file))
                return Results.NotFound();

            return Results.File(file, MimeOf(file), enableRangeProcessing: false,
                lastModified: File.GetLastWriteTimeUtc(file));
        });
    }

    private static string MimeOf(string file) => Path.GetExtension(file).ToLowerInvariant() switch
    {
        ".jpg" or ".jpeg" => "image/jpeg",
        ".webp" => "image/webp",
        ".gif" => "image/gif",
        _ => "image/png"
    };
}

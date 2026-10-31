using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace AntiBot.Services;

/// <summary>
///     The VRChat pipeline websocket: status changes for the signed-in account and its friends arrive
///     within seconds instead of waiting for the next poll.
/// </summary>
/// <remarks>
///     It connects to <c>wss://pipeline.vrchat.cloud/?auth=&lt;auth cookie&gt;</c>; every frame is
///     <c>{"type": "...", "content": "&lt;json&gt;"}</c>, so the content is parsed a second time. Only the
///     messages that carry a user are used.
/// </remarks>
internal sealed class VrchatPipeline : IDisposable
{
    private static readonly Uri Endpoint = new("wss://pipeline.vrchat.cloud/");
    private static readonly TimeSpan ReconnectDelay = TimeSpan.FromSeconds(5);

    private readonly Lock _gate = new();
    private CancellationTokenSource? _cancellation;
    private ClientWebSocket? _socket;

    public void Start(string token)
    {
        Stop();

        var cancellation = new CancellationTokenSource();
        lock (_gate)
            _cancellation = cancellation;

        _ = Task.Run(async () =>
        {
            try
            {
                await RunAsync(token, cancellation.Token);
            }
            finally
            {
                cancellation.Dispose();
            }
        });
    }

    public void Stop()
    {
        CancellationTokenSource? cancellation;
        ClientWebSocket? socket;

        lock (_gate)
        {
            cancellation = _cancellation;
            socket = _socket;
            _cancellation = null;
            _socket = null;
        }

        // The run loop owns the token source and disposes it once it has stopped.
        cancellation?.Cancel();
        socket?.Dispose();
    }

    public void Dispose() => Stop();

    private async Task RunAsync(string token, CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            using var socket = new ClientWebSocket();

            // VRChat refuses requests without a user agent, the websocket handshake included.
            socket.Options.SetRequestHeader("User-Agent",
                $"AntiBot/{AppInfoService.Version} ({AppInfoService.Platform})");

            lock (_gate)
            {
                if (_cancellation is null)
                    return;

                _socket = socket;
            }

            try
            {
                var uri = new Uri(Endpoint, $"?auth={Uri.EscapeDataString(token)}");
                await socket.ConnectAsync(uri, cancellationToken);
                Log.Information("VRChat pipeline connected");
                await ReceiveAsync(socket, cancellationToken);
            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {
                if (cancellationToken.IsCancellationRequested)
                    return;

                // A rejected token will not start working by retrying; a new sign-in restarts the pipeline.
                if (socket.HttpStatusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden)
                {
                    Log.Warning("VRChat refused the pipeline token ({Status}); status updates fall back to polling",
                        socket.HttpStatusCode);
                    return;
                }

                Log.Debug(ex, "VRChat pipeline connection failed");
            }
            finally
            {
                lock (_gate)
                    _socket = null;
            }

            try
            {
                await Task.Delay(ReconnectDelay, cancellationToken);
            }
            catch (OperationCanceledException)
            {
                return;
            }
        }
    }

    private async Task ReceiveAsync(ClientWebSocket socket, CancellationToken cancellationToken)
    {
        var buffer = new byte[64 * 1024];
        using var message = new MemoryStream();

        while (!cancellationToken.IsCancellationRequested && socket.State == WebSocketState.Open)
        {
            message.SetLength(0);

            WebSocketReceiveResult result;
            do
            {
                result = await socket.ReceiveAsync(buffer, cancellationToken);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "", cancellationToken);
                    return;
                }

                message.Write(buffer, 0, result.Count);
            } while (!result.EndOfMessage);

            if (result.MessageType == WebSocketMessageType.Text)
                Handle(Encoding.UTF8.GetString(message.ToArray()));        }
    }

    private static void Handle(string json)
    {
        if (Try.Run(() => Read(json)).GetOrNull() is not { Id.Length: > 0 } presence)
            return;

        PresenceService.Instance.Set(presence.Id, presence.Status, presence.Description);
    }

    /// <summary>Pulls the user out of one frame, or empty when the frame carries no status.</summary>
    private static (string Id, string? Status, string? Description) Read(string json)
    {
        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;

        if (!root.TryGetProperty("type", out var type) ||
            type.GetString() is not ("friend-update" or "friend-online" or "friend-active" or "friend-location"
                or "user-update"))
            return ("", null, null);

        if (!root.TryGetProperty("content", out var contentElement) ||
            contentElement.ValueKind != JsonValueKind.String ||
            contentElement.GetString() is not { Length: > 0 } contentJson)
            return ("", null, null);

        using var content = JsonDocument.Parse(contentJson);
        if (!content.RootElement.TryGetProperty("user", out var user))
            return ("", null, null);

        return (
            user.TryGetProperty("id", out var idElement) ? idElement.GetString() ?? "" : "",
            user.TryGetProperty("status", out var statusElement) ? statusElement.GetString() : null,
            user.TryGetProperty("statusDescription", out var descriptionElement)
                ? descriptionElement.GetString()
                : null);
    }
}

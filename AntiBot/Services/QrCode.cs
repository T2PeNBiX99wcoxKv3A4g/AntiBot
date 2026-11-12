using QRCoder;
using Serilog;

namespace AntiBot.Services;

/// <summary>Renders the device sign-in link as a QR code the interface can show.</summary>
internal static class QrCode
{
    /// <summary>The text as a PNG data URL, or an empty string when it cannot be encoded.</summary>
    public static string DataUrl(string text) =>
        Try.Run(() =>
        {
            using var generator = new QRCodeGenerator();
            using var data = generator.CreateQrCode(text, QRCodeGenerator.ECCLevel.M);
            var png = new PngByteQRCode(data).GetGraphic(4);
            return $"data:image/png;base64,{Convert.ToBase64String(png)}";
        }).GetOrElse(ex =>
        {
            Log.Warning(ex, "Could not render the device sign-in QR code");
            return "";
        });
}
using QRCoder;

namespace app_backend.Services;

public class QrCodeService(IWebHostEnvironment environment) : IQrCodeService
{
    public async Task<string> GenerateBookQrAsync(Guid bookId, string content, CancellationToken cancellationToken = default)
    {
        var qrDirectory = Path.Combine(environment.WebRootPath ?? Path.Combine(environment.ContentRootPath, "wwwroot"), "qrcodes");
        Directory.CreateDirectory(qrDirectory);

        using var qrGenerator = new QRCodeGenerator();
        using var qrData = qrGenerator.CreateQrCode(content, QRCodeGenerator.ECCLevel.Q);
        var pngQrCode = new PngByteQRCode(qrData);
        var qrBytes = pngQrCode.GetGraphic(20);

        var fileName = $"{bookId}.png";
        var filePath = Path.Combine(qrDirectory, fileName);
        await File.WriteAllBytesAsync(filePath, qrBytes, cancellationToken);

        return $"/qrcodes/{fileName}";
    }
}

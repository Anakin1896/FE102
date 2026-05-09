namespace app_backend.Services;

public interface IQrCodeService
{
    Task<string> GenerateBookQrAsync(Guid bookId, string content, CancellationToken cancellationToken = default);
}

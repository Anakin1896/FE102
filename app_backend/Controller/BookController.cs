using app_backend.Data;
using app_backend.Models;
using app_backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController(AppDbContext context, IQrCodeService qrCodeService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
            var book = await context.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (book is null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpGet("{id:guid}/qr/download")]
        public async Task<IActionResult> DownloadQr(Guid id, CancellationToken cancellationToken)
        {
            var book = await context.Books.FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
            if (book is null || string.IsNullOrEmpty(book.QrPath))
                return NotFound();

            var webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var filePath = Path.Combine(webRootPath, book.QrPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath, cancellationToken);
            var fileName = $"{book.Title.Replace(" ", "_")}_QR.png";
            return File(fileBytes, "image/png", fileName);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var normalizedIsbn = book.Isbn.Trim();
            var normalizedTitle = book.Title.Trim();
            var normalizedAuthor = book.Author.Trim();

            var duplicateExists = await context.Books.AnyAsync(
                b => b.Isbn == normalizedIsbn || (b.Title == normalizedTitle && b.Author == normalizedAuthor),
                cancellationToken);

            if (duplicateExists)
            {
                return Conflict(new { message = "A similar book already exists." });
            }

            book.Isbn = normalizedIsbn;
            book.Title = normalizedTitle;
            book.Author = normalizedAuthor;
            book.Category = book.Category.Trim();

            if (book.Id == Guid.Empty)
            {
                book.Id = Guid.NewGuid();
            }

            var qrContent = $"BookId:{book.Id};ISBN:{book.Isbn};Title:{book.Title};Author:{book.Author};Quantity:{book.Quantity};Category:{book.Category}";
            book.QrPath = await qrCodeService.GenerateBookQrAsync(book.Id, qrContent, cancellationToken);

            await context.Books.AddAsync(book, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }
    }
}

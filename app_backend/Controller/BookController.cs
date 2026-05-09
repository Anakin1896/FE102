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

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

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

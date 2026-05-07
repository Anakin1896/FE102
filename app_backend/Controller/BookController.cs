using app_backend.Data;
using app_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController(AppDbContext context) : ControllerBase
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
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (book.Id == Guid.Empty)
            {
                book.Id = Guid.NewGuid();
            }

            await context.Books.AddAsync(book);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }
    }
}

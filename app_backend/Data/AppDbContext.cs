using app_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace app_backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Book> Books => Set<Book>();
}

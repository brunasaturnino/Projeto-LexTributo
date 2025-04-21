using back_end.Entities;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data
{
    public class LexTributoDbContext(DbContextOptions<LexTributoDbContext> options): DbContext(options)
    {
        public DbSet<User> Users { get; set; }
    }
}

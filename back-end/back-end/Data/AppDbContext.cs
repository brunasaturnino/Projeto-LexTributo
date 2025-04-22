using back_end.Entities;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Processo> Processos { get; set; }
        public DbSet<Documento> Documentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relação PROCESSO e USER
            modelBuilder.Entity<Processo>()
                .HasOne(p => p.User)
                .WithMany(u => u.Processos)
                .HasForeignKey(p => p.UserId);

            // Relação DOCUMENTO e PROCESSO
            modelBuilder.Entity<Documento>()
                .HasOne(d => d.Processo)
                .WithMany(p => p.Documentos)
                .HasForeignKey(d => d.ProcessoId);
        }

    }


}

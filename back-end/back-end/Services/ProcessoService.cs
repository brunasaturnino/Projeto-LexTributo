using back_end.Data;
using back_end.Entities;
using back_end.Models;
using back_end.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class ProcessoService : IProcessoService
    {
        private readonly AppDbContext _context;

        public ProcessoService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<ProcessoDto> CriarProcessoAsync(CreateProcessoDto dto)
        {
            var processo = new Processo
            {
                Id = Guid.NewGuid(),
                NumeroProcesso = dto.NumeroProcesso,
                Nome = dto.Nome,
                Autor = dto.Autor,
                Reu = dto.Reu,
                Tribunal = dto.Tribunal,
                Status = dto.Status,
                UserId = dto.UserId
            };

            _context.Processos.Add(processo);
            await _context.SaveChangesAsync();

            return new ProcessoDto
            {
                Id = processo.Id,
                NumeroProcesso = processo.NumeroProcesso,
                Nome = processo.Nome,
                Autor = processo.Autor,
                Reu = processo.Reu,
                Tribunal = processo.Tribunal,
                Status = processo.Status,
                UserId = processo.UserId
            };
        }



        public async Task<IEnumerable<ProcessoDto>> ObterTodosProcessosAsync()
        {
            return await _context.Processos
                .Select(p => new ProcessoDto
                {
                    Id = p.Id,
                    NumeroProcesso = p.NumeroProcesso,
                    Nome = p.Nome,
                    Autor = p.Autor,
                    Reu = p.Reu,
                    Tribunal = p.Tribunal,
                    Status = p.Status,
                    UserId = p.UserId
                }).ToListAsync();
        }


        public async Task<ProcessoDto> ObterProcessoPorIdAsync(Guid id)
        {
            var processo = await _context.Processos.FindAsync(id);
            if (processo == null) return null;

            return new ProcessoDto
            {
                Id = processo.Id,
                NumeroProcesso = processo.NumeroProcesso,
                Nome = processo.Nome,
                Autor = processo.Autor,
                Reu = processo.Reu,
                Tribunal = processo.Tribunal,
                Status = processo.Status,
                UserId = processo.UserId
            };
        }



        public async Task<IEnumerable<ProcessoDto>> ObterProcessosPorUserIdAsync(Guid userId)
        {
            var processos = await _context.Processos
                .Where(p => p.UserId == userId)  // Filtra pelos processos do usuário
                .ToListAsync();

            return processos.Select(p => new ProcessoDto
            {
                Id = p.Id,
                NumeroProcesso = p.NumeroProcesso,
                Nome = p.Nome,
                Autor = p.Autor,
                Reu = p.Reu,
                Tribunal = p.Tribunal,
                Status = p.Status,
                UserId = p.UserId
            });
        }



        public async Task<Processo?> AlterarProcessoAsync(Guid id, UpdateProcessoDto dto)
        {
            var processo = await _context.Processos.FindAsync(id);
            if (processo == null)
                return null;

            if (!string.IsNullOrWhiteSpace(dto.NumeroProcesso))
                processo.NumeroProcesso = dto.NumeroProcesso;

            if (!string.IsNullOrWhiteSpace(dto.Nome))
                processo.Nome = dto.Nome;

            if (!string.IsNullOrWhiteSpace(dto.Autor))
                processo.Autor = dto.Autor;

            if (!string.IsNullOrWhiteSpace(dto.Reu))
                processo.Reu = dto.Reu;

            if (!string.IsNullOrWhiteSpace(dto.Tribunal))
                processo.Tribunal = dto.Tribunal;

            if (!string.IsNullOrWhiteSpace(dto.Status))
                processo.Status = dto.Status;

            _context.Processos.Update(processo);
            await _context.SaveChangesAsync();

            return processo;
        }



        public async Task<bool> DeletarProcessoAsync(Guid id)
        {
            var processo = await _context.Processos
                .Include(p => p.Documentos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (processo == null) return false;

            _context.Documentos.RemoveRange(processo.Documentos);
            _context.Processos.Remove(processo);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}

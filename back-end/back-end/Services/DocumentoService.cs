using back_end.Data;
using back_end.Entities;
using back_end.Models;
using back_end.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class DocumentoService : IDocumentoService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public DocumentoService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }



        public async Task<DocumentoDto> CriarDocumentoAsync(CreateDocumentoDto dto)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Arquivo.FileName);
            var folderPath = Path.Combine(_env.WebRootPath, "documentos");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Arquivo.CopyToAsync(stream);
            }

            var documento = new Documento
            {
                Id = Guid.NewGuid(),
                NomeArquivo = dto.Arquivo.FileName,
                CaminhoArquivo = $"http://localhost:5247/documentos/{fileName}",
                ProcessoId = dto.ProcessoId
            };

            _context.Documentos.Add(documento);
            await _context.SaveChangesAsync();

            return new DocumentoDto
            {
                Id = documento.Id,
                NomeArquivo = documento.NomeArquivo,
                CaminhoArquivo = documento.CaminhoArquivo,
                ProcessoId = documento.ProcessoId
            };
        }



        public async Task<Documento?> ObterDocumentoPorIdAsync(Guid id)
        {
            return await _context.Documentos.FindAsync(id);
        }



        public async Task<IEnumerable<DocumentoDto>> ObterDocumentosPorProcessoIdAsync(Guid processoId)
        {
            return await _context.Documentos
                .Where(d => d.ProcessoId == processoId)
                .Select(d => new DocumentoDto
                {
                    Id = d.Id,
                    NomeArquivo = d.NomeArquivo,
                    CaminhoArquivo = d.CaminhoArquivo,
                    ProcessoId = d.ProcessoId
                }).ToListAsync();
        }


        public async Task<DocumentoDto> AtualizarDocumentoAsync(Guid id, UpdateDocumentoDto dto)
        {
            var documento = await _context.Documentos.FindAsync(id);

            if (documento == null) return null;

            // Atualizar apenas o nome, se informado
            if (!string.IsNullOrEmpty(dto.NomeArquivo))
            {
                documento.NomeArquivo = dto.NomeArquivo;
            }

            // Se houver um novo arquivo para substituir
            if (dto.Arquivo != null)
            {
                // Excluir o arquivo antigo
                var oldFilePath = Path.Combine(_env.WebRootPath, documento.CaminhoArquivo.TrimStart('/'));
                if (File.Exists(oldFilePath))
                {
                    File.Delete(oldFilePath);
                }

                // Gerar novo nome de arquivo e salvar
                var newFileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Arquivo.FileName);
                var newFolderPath = Path.Combine(_env.WebRootPath, "documentos");

                if (!Directory.Exists(newFolderPath))
                    Directory.CreateDirectory(newFolderPath);

                var newFilePath = Path.Combine(newFolderPath, newFileName);

                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await dto.Arquivo.CopyToAsync(stream);
                }

                documento.CaminhoArquivo = $"/documentos/{newFileName}";
            }

            await _context.SaveChangesAsync();

            return new DocumentoDto
            {
                Id = documento.Id,
                NomeArquivo = documento.NomeArquivo,
                CaminhoArquivo = documento.CaminhoArquivo,
                ProcessoId = documento.ProcessoId
            };
        }


        public async Task<bool> DeletarDocumentoAsync(Guid id)
        {
            var documento = await _context.Documentos.FindAsync(id);

            if (documento == null) return false;

            // Excluir o arquivo fisicamente
            var filePath = Path.Combine(_env.WebRootPath, documento.CaminhoArquivo.TrimStart('/'));
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            // Remover o documento do banco de dados
            _context.Documentos.Remove(documento);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}

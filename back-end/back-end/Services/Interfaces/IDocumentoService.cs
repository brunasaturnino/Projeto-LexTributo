using back_end.Entities;
using back_end.Models;

namespace back_end.Services.Interfaces
{
    public interface IDocumentoService
    {
        Task<DocumentoDto> CriarDocumentoAsync(CreateDocumentoDto dto);
        Task<Documento?> ObterDocumentoPorIdAsync(Guid id);
        Task<IEnumerable<DocumentoDto>> ObterDocumentosPorProcessoIdAsync(Guid processoId);
        Task<DocumentoDto> AtualizarDocumentoAsync(Guid id, UpdateDocumentoDto dto);
        Task<bool> DeletarDocumentoAsync(Guid id);
    }
}

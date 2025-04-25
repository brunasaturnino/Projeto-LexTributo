using back_end.Entities;
using back_end.Models;

namespace back_end.Services.Interfaces
{
    public interface IProcessoService
    {
        Task<ProcessoDto> CriarProcessoAsync(CreateProcessoDto dto);
        Task<IEnumerable<ProcessoDto>> ObterTodosProcessosAsync();
        Task<ProcessoDto> ObterProcessoPorIdAsync(Guid id);
        Task<IEnumerable<ProcessoDto>> ObterProcessosPorUserIdAsync(Guid userId);
        Task<Processo?> AlterarProcessoAsync(Guid id, UpdateProcessoDto dto);
        Task<bool> DeletarProcessoAsync(Guid id);
    }
}

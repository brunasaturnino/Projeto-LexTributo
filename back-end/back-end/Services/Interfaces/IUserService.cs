using back_end.Entities;
using back_end.Models;

namespace back_end.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ObterTodosUsersAsync();
        Task<User?> ObterUserPorIdAsync(Guid id);
        Task<bool> DeleteUserAsync(Guid id);
    }
}
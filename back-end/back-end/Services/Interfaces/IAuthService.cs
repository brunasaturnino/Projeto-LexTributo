using back_end.Entities;
using back_end.Models;

namespace back_end.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserWithRoleDto request);
        Task<string?> LoginAsync(UserDto request);
    }
}

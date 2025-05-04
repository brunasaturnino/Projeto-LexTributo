using back_end.Entities;
using back_end.Models;

namespace back_end.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(UserLoginDto request);
    }
}

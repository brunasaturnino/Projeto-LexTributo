// Services/UserService.cs
using back_end.Data;
using back_end.Entities;
using back_end.Models;
using back_end.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        
        
        public async Task<IEnumerable<User>> ObterTodosUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }



        public async Task<User?> ObterUserPorIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }



        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Processos)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return false;

            if (user.Processos.Any())
            {
                _context.Processos.RemoveRange(user.Processos);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

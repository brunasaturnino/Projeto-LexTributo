// Controllers/UserController.cs
using back_end.Entities;
using System.Security.Claims;
using back_end.Models;
using back_end.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using back_end.Services;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserWithRoleDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var user = await _userService.RegisterAsync(request);

            if (user == null)
            {
                return BadRequest("Username already exists");
            }

            return Ok(user);
        }


        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.ObterTodosUsersAsync();

            var result = users.Select(user => new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            });

            return Ok(result);
        }



        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterUserPorId(Guid id)
        {

            if (!CurrentUserPodeAcessar(id))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var user = await _userService.ObterUserPorIdAsync(id);
            if (user == null) return NotFound("Usuário não encontrado.");
            
            var userDto = new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };

            return Ok(userDto);
        }



        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            if (!CurrentUserPodeAcessar(id))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var result = await _userService.DeleteUserAsync(id);
            if (!result) return NotFound("Usuário não encontrado");

            return NoContent();
        }


        private bool CurrentUserPodeAcessar(Guid EndpointUserId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUserRole = User.FindFirstValue(ClaimTypes.Role);

            return currentUserRole == "admin" || EndpointUserId.ToString() == currentUserId;
        }
    }

}

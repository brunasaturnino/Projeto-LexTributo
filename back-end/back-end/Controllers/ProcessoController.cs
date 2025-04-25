using System.Security.Claims;
using back_end.Entities;
using back_end.Models;
using back_end.Services;
using back_end.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessosController : ControllerBase
    {
        private readonly IProcessoService _processoService;

        public ProcessosController(IProcessoService service)
        {
            _processoService = service;
        }



        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CriarProcesso([FromBody] CreateProcessoDto dto)
        {
            var processo = await _processoService.CriarProcessoAsync(dto);
            return CreatedAtAction(nameof(ObterProcessoPorId), new { id = processo.Id }, processo);
        }



        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> ObterTodosProcessos()
        {
            var processos = await _processoService.ObterTodosProcessosAsync();
            return Ok(processos);
        }



        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> ObterProcessosPorUserId(Guid userId)
        {
            if (!CurrentUserPodeAcessar(userId))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var processos = await _processoService.ObterProcessosPorUserIdAsync(userId);

            if (processos == null || !processos.Any())
            {
                return NotFound("Nenhum processo encontrado para este usuário.");
            }

            return Ok(processos);
        }



        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterProcessoPorId(Guid id)
        {
            var processo = await _processoService.ObterProcessoPorIdAsync(id);
            if (processo == null) return NotFound("Processo não encontrado");

            if (!CurrentUserPodeAcessar(processo))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            return Ok(processo);
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> AlterarProcesso(Guid id, [FromBody] UpdateProcessoDto dto)
        {
            var processo = await _processoService.ObterProcessoPorIdAsync(id);
            if (processo == null)
                return NotFound("Processo não encontrado.");

            if (!CurrentUserPodeAcessar(processo))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var updated = await _processoService.AlterarProcessoAsync(id, dto);

            return Ok(updated);
        }



        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarProcesso(Guid id)
        {
            var processo = await _processoService.ObterProcessoPorIdAsync(id);
            if (processo == null) return NotFound("Processo não encontrado");

            if (!CurrentUserPodeAcessar(processo))
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var resultado = await _processoService.DeletarProcessoAsync(id);
            return resultado ? NoContent() : NotFound();
        }



        private bool CurrentUserPodeAcessar(Guid EndpointUserId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUserRole = User.FindFirstValue(ClaimTypes.Role);

            return currentUserRole == "admin" || EndpointUserId.ToString() == currentUserId;
        }



        private bool CurrentUserPodeAcessar(ProcessoDto processo)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUserRole = User.FindFirstValue(ClaimTypes.Role);

            return currentUserRole == "admin" || processo.UserId.ToString() == currentUserId;
        }
    }

}

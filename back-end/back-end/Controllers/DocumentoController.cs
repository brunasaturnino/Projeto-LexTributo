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
    public class DocumentosController : ControllerBase
    {
        private readonly IDocumentoService _documentoService;
        private readonly IProcessoService _processoService;

        public DocumentosController(IDocumentoService documentoService, IProcessoService processoService)
        {
            _documentoService = documentoService;
            _processoService = processoService;
        }



        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CriarDocumento([FromForm] CreateDocumentoDto dto)
        {
            var doc = await _documentoService.CriarDocumentoAsync(dto);
            return Ok(doc);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var documento = await _documentoService.ObterDocumentoPorIdAsync(id);
            if (documento == null)
                return NotFound("Documento não encontrado.");

            var processo = await _processoService.ObterProcessoPorIdAsync(documento.ProcessoId);
            if (processo == null)
                return NotFound("Processo vinculado ao documento não encontrado.");

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currenteUserRole = User.FindFirstValue(ClaimTypes.Role);

            if (currenteUserRole != "admin" && processo.UserId.ToString() != currentUserId)
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var response = new DocumentoResponseDto
            {
                Id = documento.Id,
                NomeArquivo = documento.NomeArquivo,
                ProcessoId = documento.ProcessoId,
                CaminhoArquivo = documento.CaminhoArquivo
            };

            return Ok(response);
        }



        [Authorize]
        [HttpGet("processo/{processoId}")]
        public async Task<IActionResult> ObterDocumentosPorProcesso(Guid processoId)
        {
            var processo = await _processoService.ObterProcessoPorIdAsync(processoId);
            if (processo == null)
                return NotFound("Processo vinculado ao documento não encontrado.");

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currenteUserRole = User.FindFirstValue(ClaimTypes.Role);

            if (currenteUserRole != "admin" && processo.UserId.ToString() != currentUserId)
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var docs = await _documentoService.ObterDocumentosPorProcessoIdAsync(processoId);
            return Ok(docs);
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarDocumento(Guid id, [FromForm] UpdateDocumentoDto dto)
        {
            var documento = await _documentoService.ObterDocumentoPorIdAsync(id);
            if (documento == null)
                return NotFound("Documento não encontrado.");

            var processo = await _processoService.ObterProcessoPorIdAsync(documento.ProcessoId);
            if (processo == null)
                return NotFound("Processo vinculado ao documento não encontrado.");

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currenteUserRole = User.FindFirstValue(ClaimTypes.Role);

            if (currenteUserRole != "admin" && processo.UserId.ToString() != currentUserId)
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var documentoAtualizado = await _documentoService.AtualizarDocumentoAsync(id, dto);

            if (documentoAtualizado == null)
                return NotFound("Documento não encontrado.");

            return Ok(documentoAtualizado);
        }



        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarDocumento(Guid id)
        {
            var documento = await _documentoService.ObterDocumentoPorIdAsync(id);
            if (documento == null)
                return NotFound("Documento não encontrado.");

            var processo = await _processoService.ObterProcessoPorIdAsync(documento.ProcessoId);
            if (processo == null)
                return NotFound("Processo vinculado ao documento não encontrado.");

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currenteUserRole = User.FindFirstValue(ClaimTypes.Role);

            if (currenteUserRole != "admin" && processo.UserId.ToString() != currentUserId)
                return StatusCode(StatusCodes.Status403Forbidden, "Você não tem permissão para acessar este recurso.");

            var sucesso = await _documentoService.DeletarDocumentoAsync(id);

            if (!sucesso)
                return NotFound("Documento não encontrado.");

            return NoContent(); // Retorna 204 No Content
        }
    }

}

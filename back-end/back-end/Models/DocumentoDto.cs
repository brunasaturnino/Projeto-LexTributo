namespace back_end.Models
{
    public class DocumentoDto
    {
        public Guid Id { get; set; }
        public string NomeArquivo { get; set; }
        public string CaminhoArquivo { get; set; }
        public Guid ProcessoId { get; set; }
    }

    public class CreateDocumentoDto
    {
        public IFormFile Arquivo { get; set; }
        public Guid ProcessoId { get; set; }
    }

    public class UpdateDocumentoDto
    {
        public IFormFile? Arquivo { get; set; }
        public string? NomeArquivo { get; set; }
    }

    public class DocumentoResponseDto
    {
        public Guid Id { get; set; }
        public string NomeArquivo { get; set; }
        public string CaminhoArquivo { get; set; }
        public Guid ProcessoId { get; set; }
    }
}

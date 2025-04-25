namespace back_end.Entities
{
    public class Documento
    {
        public Guid Id { get; set; }
        public string NomeArquivo { get; set; }
        public string CaminhoArquivo { get; set; }

        // Relação com PROCESSO
        public Guid ProcessoId { get; set; }
        public Processo Processo { get; set; }
    }
}

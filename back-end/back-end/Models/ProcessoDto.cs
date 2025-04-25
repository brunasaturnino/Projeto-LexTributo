namespace back_end.Models
{
    public class ProcessoDto
    {
        public Guid Id { get; set; }
        public string NumeroProcesso { get; set; }
        public string Nome {  get; set; }
        public string Autor { get; set; }
        public string Reu { get; set; }
        public string Tribunal { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }
    }



    public class CreateProcessoDto
    {
        public string NumeroProcesso { get; set; }
        public string Nome { get; set; }

        public string Autor { get; set; }
        public string Reu { get; set; }
        public string Tribunal { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }
    }



    public class UpdateProcessoDto
    {
        public string? NumeroProcesso { get; set; }
        public string? Nome { get; set; }
        public string? Autor { get; set; }
        public string? Reu { get; set; }
        public string? Tribunal { get; set; }
        public string? Status { get; set; }
    }
}

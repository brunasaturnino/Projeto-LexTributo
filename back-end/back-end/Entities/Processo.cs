namespace back_end.Entities
{
    public class Processo
    {
        public Guid Id { get; set; }
        public string NumeroProcesso { get; set; }
        public string Nome { get; set; }
        public string Autor {  get; set; }
        public string Reu {  get; set; }
        public string Tribunal { get; set; }
        public string Status { get; set; }

        // Relação com USER
        public Guid UserId { get; set; }
        public User User { get; set; }

        // Relação com DOCUMENTO
        public ICollection<Documento> Documentos { get; set; } = new List<Documento>();
    }
}

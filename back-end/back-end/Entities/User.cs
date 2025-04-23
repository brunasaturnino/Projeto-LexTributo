namespace back_end.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        // Relação com PROCESSO
        public ICollection<Processo> Processos { get; set; } = new List<Processo>();

    }
}

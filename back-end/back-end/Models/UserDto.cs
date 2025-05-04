using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class UserDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }



    public class UserWithRoleDto: IValidatableObject
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var allowedRoles = new[] { "admin", "advogado" };

            if (!allowedRoles.Contains(Role))
            {
                yield return new ValidationResult(
                    $"O valor '{Role}' não é um papel permitido. Use 'admin' ou 'advogado'.",
                    new[] { nameof(Role) });
            }
        }
    }



    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
    }

    public class UserLoginDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}

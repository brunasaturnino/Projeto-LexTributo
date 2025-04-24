import {
  Container,
  Card,
  Title,
  Input,
  Register,
  PasswordWrapper,
  TogglePassword,
  ErrorMessage,
} from "./styles";
import { Button } from "../../components/Button";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let valid = true;

    // Regex simples para email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("A senha precisa de pelo menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      alert("Login válido!");
    }
  };

  return (
    <Container>
      <Card>
        <img src={logo.src} alt="Logo" width={120} height={120} />
        <Title>Login</Title>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <Button onClick={handleLogin}>Entrar</Button>
        <Register>Ainda não possui uma conta? <span onClick={() => alert("Redirecionar para cadastro")}>Crie aqui.</span>.</Register>
      </Card>
    </Container>
  );
}

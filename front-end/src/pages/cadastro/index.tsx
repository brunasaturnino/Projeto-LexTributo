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
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");

  const router = useRouter();

  const handleRegister = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome.trim()) {
      setNomeError("Informe seu nome completo");
      valid = false;
    } else if (nome.trim().split(" ").length < 2) {
      setNomeError("Informe nome e sobrenome");
      valid = false;
    } else {
      setNomeError("");
    }

    if (!emailRegex.test(email)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (senha.length < 6) {
      setSenhaError("A senha precisa de pelo menos 6 caracteres");
      valid = false;
    } else {
      setSenhaError("");
    }

    if (confirmarSenha !== senha) {
      setConfirmarSenhaError("As senhas não coincidem");
      valid = false;
    } else {
      setConfirmarSenhaError("");
    }

    if (valid) {
      alert("Conta criada!");
      router.push("/login");
    }
  };

  return (
    <Container>
      <Card>
        <img src={logo.src} alt="Logo" width={120} height={120} />
        <Title>Cadastro</Title>

        <Input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        {nomeError && <ErrorMessage>{nomeError}</ErrorMessage>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {senhaError && <ErrorMessage>{senhaError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {confirmarSenhaError && <ErrorMessage>{confirmarSenhaError}</ErrorMessage>}

        <Button onClick={handleRegister}>Cadastrar</Button>
        <Register>
          Já possui uma conta? <span onClick={() => router.push("/login")}>Faça login.</span>
        </Register>
      </Card>
    </Container>
  );
}
  
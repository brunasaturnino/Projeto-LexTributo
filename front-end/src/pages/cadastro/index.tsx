import {
  Container,
  Card,
  Title,
  Input,
  Register,
  PasswordWrapper,
  TogglePassword
} from "./styles";
import { Button } from "../../components/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/router";
import { cadastrarUsuario } from "../../services/usuarios";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await cadastrarUsuario({ nome, email, senha });
      alert("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      alert("Erro ao cadastrar: ");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Cadastro</Title>

        <Input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>

        <PasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>

        <Button onClick={handleRegister}>Cadastrar</Button>
        <Register onClick={() => router.push("/login")}>
          Já possui uma conta? Faça login.
        </Register>
      </Card>
    </Container>
  );
}

import { Container, Card, Title, Input, Register, PasswordWrapper, TogglePassword } from "./styles";
import { Button } from "../../components/Button";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  return (
    <Container>
      <Card>
        <Title>Cadastro</Title>

        <Input type="text" placeholder="Nome completo" />
        <Input type="email" placeholder="Email" />

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>

        <PasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>

        <Button onClick={() =>{ alert("Conta criada!");
            router.push("/login");
        }}>Cadastrar</Button>
        <Register onClick={() => router.push("/login")}>Já possui uma conta? Faça login.</Register>
      </Card>
    </Container>
  );
}

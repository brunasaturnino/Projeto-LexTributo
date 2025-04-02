import { Container, Card, Title, Input, Register, PasswordWrapper, TogglePassword } from "./styles";
import { Button } from "../../components/Button";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // ícones de olho




export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <Container>
          <Card>
          <img src={logo.src} alt="Logo" width={120} height={120} />
            <Title>Login</Title>
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
    
            <Button onClick={() => alert("Login")}>Entrar</Button>
            <Register>Ainda não possui uma conta? Crie aqui.</Register>
          </Card>
        </Container>
      );
    }
import React, { useState } from "react";
import { useRouter } from "next/router";
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
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../../services/auth";
import { UserLogin } from "../../types/User";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<UserLogin>({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    let valid = true;
    setApiError("");

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validação de senha
    if (form.password.length < 6) {
      setPasswordError("A senha precisa ter ao menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setLoading(true);
    try {
      const { token } = await loginUser(form);
      // token já salvo no localStorage pelo serviço
      router.push("/"); // redireciona para a home/dashboard
    } catch (err: any) {
      const data = err.response?.data;
      let msg = "Erro ao fazer login";

      if (data) {
        // se veio uma string simples
        if (typeof data === "string") {
          msg = data;
        }
        // ProblemDetails padrão do ASP.NET Core com campo errors
        else if (data.errors && typeof data.errors === "object") {
          // junta todas as mensagens de validação
          msg = Object.values(data.errors)
            .flat()
            .join(" ");
        }
        // título genérico de erro
        else if (data.title) {
          msg = data.title;
        }
        // fallback
        else {
          msg = JSON.stringify(data);
        }
      }

      setApiError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <img src={logo.src} alt="Logo" width={120} height={120} />
        <Title>Login</Title>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Register>
          Ainda não possui uma conta?{" "}
          <span onClick={() => router.push("/cadastro")}>Crie aqui.</span>
        </Register>
      </Card>
    </Container>
  );
}
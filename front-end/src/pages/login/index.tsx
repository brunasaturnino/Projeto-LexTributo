// front-end/src/pages/login/index.tsx

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
import { loginUser, fetchCurrentUser } from "../../services/auth";
import { UserLogin } from "../../types/User";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<UserLogin>({ Email: "", Password: "" });
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

    // Validação de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.Email)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validação de senha
    if (form.Password.length < 6) {
      setPasswordError("A senha precisa ter ao menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setLoading(true);
    try {
      // 1) Faz login e salva token
      await loginUser(form);

      // 2) Busca dados do usuário logado
      // const user = await fetchCurrentUser();

      // 3) Redireciona para a página de processos
      //    Exemplo: /processos
      //    Ou então: /processos?userId=${user.id}
      router.push("/processos");
    } catch (err: any) {
      const data = err.response?.data;
      let msg = "Erro ao fazer login";

      if (data) {
        if (typeof data === "string") {
          msg = data;
        } else if (data.errors && typeof data.errors === "object") {
          msg = Object.values(data.errors)
            .flat()
            .join(" ");
        } else if (data.title) {
          msg = data.title;
        } else {
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
          type="Email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "Password"}
            name="Password"
            placeholder="Senha"
            value={form.Password}
            onChange={handleChange}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Button onClick={handleLogin} disabled={loading} type="button">
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

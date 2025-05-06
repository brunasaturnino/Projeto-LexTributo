// front-end/src/pages/register/index.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../../services/auth';
import { Button } from '../../components/Button';
import {
  Container,
  Card,
  Title,
  Input,
  Register,
  PasswordWrapper,
  TogglePassword,
  ErrorMessage,
} from './styles';
import logo from '../../assets/logo.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { UserRegistration } from '../../types/User';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState<UserRegistration>({ nome: '', email: '', senha: '' });
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function handleRegister() {
    let valid = true;
    setApiError('');

    // Validação de nome completo
    if (!form.nome.trim()) {
      setNomeError('Informe seu nome completo');
      valid = false;
    } else if (form.nome.trim().split(' ').length < 2) {
      setNomeError('Informe nome e sobrenome');
      valid = false;
    } else {
      setNomeError('');
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validação de senha
    if (form.senha.length < 6) {
      setSenhaError('A senha precisa de pelo menos 6 caracteres');
      valid = false;
    } else {
      setSenhaError('');
    }

    // Validação de confirmação de senha
    if (confirmPassword !== form.senha) {
      setConfirmPasswordError('As senhas não coincidem');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      await registerUser(form);
      router.push('/login');
    } catch (err: any) {
      const data = err.response?.data;
      let msg = 'Erro ao cadastrar usuário';
      if (data) {
        if (typeof data === 'string') {
          msg = data;
        } else if (data.title) {
          msg = data.title;
        } else if (data.errors && typeof data.errors === 'object') {
          msg = Object.values(data.errors).flat().join(' ');
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
        <Title>Cadastro</Title>

        <Input
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
        />
        {nomeError && <ErrorMessage>{nomeError}</ErrorMessage>}

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
            type={showPassword ? 'text' : 'password'}
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {senhaError && <ErrorMessage>{senhaError}</ErrorMessage>}

        <PasswordWrapper>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={handleConfirmChange}
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </TogglePassword>
        </PasswordWrapper>
        {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}

        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Button type="button" onClick={handleRegister} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <Register>
          Já possui uma conta?{' '}
          <span onClick={() => router.push('/login')}>Faça login.</span>
        </Register>
      </Card>
    </Container>
  );
}

// src/services/usuarios.js
import API_BASE_URL from "./api";

// Cadastro de usuário
export async function cadastrarUsuario({ nome, email, senha }) {
  const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Erro ao cadastrar usuário.");
  }

  return await response.json();
}

// Login de usuário
export async function loginUsuario({ email, senha }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Erro ao fazer login.");
  }

  return await response.json(); // Deve retornar token ou dados do usuário
}

// src/services/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5247";

console.log("🌐 API_BASE_URL:", API_BASE_URL); // <== ADICIONE ISSO


export async function cadastrarUsuario(dados) {
  const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Erro ao cadastrar usuário.");
  }

  return await response.json();
}

import API_BASE_URL from "./api";

// Função para cadastrar um novo usuário
export async function cadastrarUsuario({ nome, email, senha }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao cadastrar usuário.");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao cadastrar usuário.");
    }
  }
}

// Função para fazer login de usuário (opcional para login futuramente)
export async function loginUsuario({ email, senha }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao fazer login.");
    }

    return await response.json(); // Retorna token ou usuário, dependendo da API
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao fazer login.");
    }
  }
}

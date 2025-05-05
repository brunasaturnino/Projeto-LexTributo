export interface UserRegistration {
  nome: string;
  email: string;
  senha: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserProfile {
  id: string;
  nome: string;
  email: string;
}

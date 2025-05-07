export interface UserRegistration {
  Username: string;
  Email: string;
  Role: string;
  Password: string;
}

export interface UserLogin {
  Email: string;
  Password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserProfile {
  Id: string;
  Username: string;
  Email: string;
}

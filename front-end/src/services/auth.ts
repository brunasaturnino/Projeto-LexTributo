import api from './api';
import { UserLogin, UserProfile, AuthResponse } from '../types/User';

const ENDPOINT = '/auth';

export async function loginUser(dto: UserLogin): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>(`${ENDPOINT}/login`, dto);
  localStorage.setItem('token', data.token);
  return data;
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>(`${ENDPOINT}/me`);
  return data;
}

export function logoutUser(): void {
  localStorage.removeItem('token');
}

import api from './api';
import { UserLogin, UserProfile, AuthResponse } from '../types/User';
import { jwtDecode } from 'jwt-decode';

const ENDPOINT = '/auth';

export async function loginUser(dto: UserLogin): Promise<string> {
  const { data } = await api.post<string>(`${ENDPOINT}/login`, dto);
  localStorage.setItem('token', data);
  return data;
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>(`${ENDPOINT}/me`);
  return data;
}

export function getToken(){
  const token = localStorage.getItem("token")
  return token  
}

export function getCurrentUserId(token: string){
  const decoded: any = jwtDecode(token)
  const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    
  return id  
}

export function logoutUser(): void {
  localStorage.removeItem('token');
}

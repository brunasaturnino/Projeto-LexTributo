import api from './api';
import { UserRegistration } from '../types/User';

const ENDPOINT = '/user';

export async function registerUser(dto: UserRegistration): Promise<void> {
  await api.post(`${ENDPOINT}/register`, dto);
}

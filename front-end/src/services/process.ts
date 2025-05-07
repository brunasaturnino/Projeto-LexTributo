import api from './api';
import { ProcessCreateDto, ProcessUpdateDto, Process } from '../types/Process';
import { getCurrentUserId, getToken } from './auth';

const ENDPOINT = '/Processos';

export async function createProcess(dto: ProcessCreateDto): Promise<Process> {
  const { data } = await api.post<Process>(ENDPOINT, dto);
  return data;
}

export async function getProcesses(): Promise<Process[] | null> {
  const token = getToken()

  if (token){
    const userId = getCurrentUserId(token)
    const { data } = await api.get<Process[]>(`${ENDPOINT}/user/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  }

  return null
}

export async function getProcessById(id: string): Promise<Process> {
  const { data } = await api.get<Process>(`${ENDPOINT}/${id}`);
  return data;
}

export async function updateProcess(
  id: string,
  dto: ProcessUpdateDto
): Promise<Process> {
  const { data } = await api.put<Process>(`${ENDPOINT}/${id}`, dto);
  return data;
}

export async function deleteProcess(id: string): Promise<void> {
  await api.delete(`${ENDPOINT}/${id}`);
}

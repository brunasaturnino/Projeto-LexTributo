import api from './api';
import { ProcessCreateDto, ProcessUpdateDto, Process } from '../types/Process';

const ENDPOINT = '/processes';

export async function createProcess(dto: ProcessCreateDto): Promise<Process> {
  const { data } = await api.post<Process>(ENDPOINT, dto);
  return data;
}

export async function getProcesses(): Promise<Process[]> {
  const { data } = await api.get<Process[]>(ENDPOINT);
  return data;
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

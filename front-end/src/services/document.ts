import api from './api';
import { Document, CreateDocumentDto, UpdateDocumentDto } from '../types/Document';

const ENDPOINT = '/documentos';

export async function getDocumentsByProcessId(
  processoId: string
): Promise<Document[]> {
  const { data } = await api.get<Document[]>(`${ENDPOINT}/processo/${processoId}`);
  return data;
}

export async function uploadDocument(dto: CreateDocumentDto): Promise<Document> {
  const form = new FormData();
  form.append('Arquivo', dto.Arquivo);
  form.append('ProcessoId', dto.ProcessoId);
  const { data } = await api.post<Document>(ENDPOINT, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateDocument(
  id: string,
  dto: UpdateDocumentDto
): Promise<Document> {
  const form = new FormData();
  if (dto.Arquivo) form.append('Arquivo', dto.Arquivo);
  if (dto.NomeArquivo) form.append('NomeArquivo', dto.NomeArquivo);
  const { data } = await api.put<Document>(`${ENDPOINT}/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`${ENDPOINT}/${id}`);
}

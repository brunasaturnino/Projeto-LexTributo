import api from './api';
import { Document, CreateDocumentDto, UpdateDocumentDto } from '../types/Document';

const ENDPOINT = '/documentos';

export async function getDocumentsByProcessId(
  processoId: string
): Promise<Document[]> {
  const { data } = await api.get<Document[]>(`${ENDPOINT}/processo/${processoId}`);
  return data;
}

export async function uploadDocument(file: File, processoId: string): Promise<Document> {
  const formData = new FormData();
  formData.append('Arquivo', file);
  formData.append('ProcessoId', processoId);

  const { data } = await api.post('/documentos', formData, {
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

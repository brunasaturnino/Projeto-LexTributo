export interface Document {
    id: string;
    nomeArquivo: string;
    caminhoArquivo: string;
    processoId: string;
  }
  
  // para enviar via FormData
  export interface CreateDocumentDto {
    Arquivo: File;
    ProcessoId: string;
  }
  
  export interface UpdateDocumentDto {
    Arquivo?: File;
    NomeArquivo?: string;
  }
  
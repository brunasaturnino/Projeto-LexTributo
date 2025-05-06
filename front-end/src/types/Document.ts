export interface Document {
    Id: string;
    NomeArquivo: string;
    CaminhoArquivo: string;
    ProcessoId: string;
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
  
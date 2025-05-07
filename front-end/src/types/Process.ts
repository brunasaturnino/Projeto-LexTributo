export interface Process {
    id: string;
    numeroProcesso: string;
    nome: string;
    autor: string;
    reu: string;
    tribunal: string;
    status: string;
    userId: string;
  }
  
  export interface ProcessCreateDto {
    NumeroProcesso: string;
    Nome: string;
    Autor: string;
    Reu: string;
    Tribunal: string;
    Status: string
    UserId: string
  }
  
  export interface ProcessUpdateDto {
    Status: string
  }
  
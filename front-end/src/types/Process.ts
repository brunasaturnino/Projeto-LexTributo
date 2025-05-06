export interface Process {
    Id: string;
    Titulo: string;
    Descricao: string;
    CriadoEm: string;  // ISO date
    Status: 'aberto' | 'em_andamento' | 'concluido';
  }
  
  export interface ProcessCreateDto {
    Titulo: string;
    Descricao: string;
  }
  
  export interface ProcessUpdateDto {
    Titulo?: string;
    Descricao?: string;
    Status?: Process['Status'];
  }
  
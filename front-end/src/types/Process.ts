export interface Process {
    id: string;
    titulo: string;
    descricao: string;
    criadoEm: string;  // ISO date
    status: 'aberto' | 'em_andamento' | 'concluido';
  }
  
  export interface ProcessCreateDto {
    titulo: string;
    descricao: string;
  }
  
  export interface ProcessUpdateDto {
    titulo?: string;
    descricao?: string;
    status?: Process['status'];
  }
  
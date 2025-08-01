export interface Categoria {
  id: string;
  nome: string;
  restaurante_id?: string;
}

export interface NovaCategoria {
  nome: string;
}

export interface DadosEdicao {
  id?: string;
  nome: string;
}
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

export interface Item {
  id: string;
  nome: string;
  preco_unitario: string;
  descricao?: string; 
  foto: string;
  categoria_id: string;
}

export interface NovoItem {
  nome: string;
  preco_unitario: string;
  descricao?: string;
  foto: string;
  categoria_id: string;
}

export interface DadosEdicaoItem {
  id?: string;
  nome: string;
  preco_unitario: string;
  descricao?: string;
  foto: string;
  categoria_id: string;
}
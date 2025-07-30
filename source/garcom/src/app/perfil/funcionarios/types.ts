export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  user_id?: string;
  restaurante_id?: string;
}

export interface NovoFuncionario {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

export interface DadosEdicao {
  nome: string;
  email: string;
  cpf: string;
}

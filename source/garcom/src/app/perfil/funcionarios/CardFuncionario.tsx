import { Funcionario } from "./types";

interface CardFuncionarioProps {
  funcionario: Funcionario;
  carregando: boolean;
  onEditar: (funcionario: Funcionario) => void;
  onExcluir: (id: string) => void;
}

export function CardFuncionario({
  funcionario,
  carregando,
  onEditar,
  onExcluir,
}: CardFuncionarioProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{funcionario.nome}</h3>
        <p className="text-gray-600">{funcionario.email}</p>
        <p className="text-sm text-gray-500">CPF: {funcionario.cpf}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onEditar(funcionario)}
          disabled={carregando}
          title="Editar funcionário"
        >
          <img className="h-5 w-5" src="/editar.svg" alt="Editar" />
        </button>
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onExcluir(funcionario.id)}
          disabled={carregando}
          title="Excluir funcionário"
        >
          <img className="h-5 w-5" src="/excluir.svg" alt="Excluir" />
        </button>
      </div>
    </div>
  );
}

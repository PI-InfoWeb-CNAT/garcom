import { Funcionario } from "./types";

interface CardFuncionarioProps {
  funcionario: Funcionario;
  carregando: boolean;
  onEditar: (funcionario: Funcionario) => void;
  onExcluir: (id: string) => void;
}

function formatarCPF(cpf: string): string {
  const apenasNumeros = cpf.replace(/\D/g, "");
  return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function CardFuncionario({
  funcionario,
  carregando,
  onEditar,
  onExcluir,
}: CardFuncionarioProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-[#646464]">
          {funcionario.nome}
        </h3>
        <p className="!text-sm text-[#757575]">{funcionario.email}</p>
        <p className="!text-sm text-[#757575]">
          CPF: {formatarCPF(funcionario.cpf)}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onEditar(funcionario)}
          disabled={carregando}
          title="Editar funcionário"
        >
          <img className="h-5 w-5" src="/editar_f.svg" alt="Editar" />
        </button>
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onExcluir(funcionario.id)}
          disabled={carregando}
          title="Excluir funcionário"
        >
          <img className="h-5 w-5" src="/excluir_f.svg" alt="Excluir" />
        </button>
      </div>
    </div>
  );
}

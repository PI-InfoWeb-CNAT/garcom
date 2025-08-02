import { Input } from "@/components/ui/input";
import { DadosEdicao } from "./types";

interface EdicaoFuncionarioProps {
  dadosEdicao: DadosEdicao;
  setDadosEdicao: (dados: DadosEdicao) => void;
  carregando: boolean;
  onSalvar: () => void;
  onCancelar: () => void;
}

export function EdicaoFuncionario({
  dadosEdicao,
  setDadosEdicao,
  carregando,
  onSalvar,
  onCancelar,
}: EdicaoFuncionarioProps) {
  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carregando) {
      onSalvar();
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">
      <Input
        type="text"
        placeholder="Nome"
        value={dadosEdicao.nome}
        autoComplete="off"
        onChange={(e) =>
          setDadosEdicao({
            ...dadosEdicao,
            nome: e.target.value,
          })
        }
        className="w-full"
      />
      <Input
        type="email"
        placeholder="Email"
        value={dadosEdicao.email}
        autoComplete="off"
        onChange={(e) =>
          setDadosEdicao({
            ...dadosEdicao,
            email: e.target.value,
          })
        }
        className="w-full"
      />
      <Input
        type="text"
        placeholder="CPF"
        value={dadosEdicao.cpf}
        autoComplete="off"
        onChange={(e) =>
          setDadosEdicao({
            ...dadosEdicao,
            cpf: e.target.value,
          })
        }
        className="w-full"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          disabled={carregando}
        >
          Salvar
        </button>
        <button
          type="button"
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

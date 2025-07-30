import { Input } from "@/components/ui/input";
import { NovoFuncionario } from "./types";

interface FormularioFuncionarioProps {
  novoFuncionario: NovoFuncionario;
  setNovoFuncionario: (funcionario: NovoFuncionario) => void;
  carregando: boolean;
  onAdicionar: () => void;
}

export function FormularioFuncionario({
  novoFuncionario,
  setNovoFuncionario,
  carregando,
  onAdicionar,
}: FormularioFuncionarioProps) {
  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carregando) {
      onAdicionar();
    }
  };

  return (
    <div className="items-right min-h-full w-2/5 pl-30">
      <h3 className="mb-5 text-xl font-semibold text-gray-800">
        Adicionar Funcionário
      </h3>

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <Input
          placeholder="Nome completo"
          className="w-full"
          type="text"
          value={novoFuncionario.nome}
          autoComplete="off"
          onChange={(e) =>
            setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          className="w-full"
          type="email"
          value={novoFuncionario.email}
          autoComplete="off"
          onChange={(e) =>
            setNovoFuncionario({
              ...novoFuncionario,
              email: e.target.value,
            })
          }
        />
        <Input
          placeholder="CPF"
          className="w-full"
          type="text"
          value={novoFuncionario.cpf}
          autoComplete="off"
          onChange={(e) =>
            setNovoFuncionario({ ...novoFuncionario, cpf: e.target.value })
          }
        />
        <Input
          placeholder="Senha"
          className="w-full"
          type="password"
          value={novoFuncionario.senha}
          autoComplete="new-password"
          onChange={(e) =>
            setNovoFuncionario({
              ...novoFuncionario,
              senha: e.target.value,
            })
          }
        />
        <button
          type="submit"
          className="w-full rounded bg-red-400 px-4 py-2 text-white hover:bg-red-500 disabled:opacity-50"
          disabled={carregando}
        >
          {carregando ? "Adicionando..." : "Adicionar Funcionário"}
        </button>
      </form>

      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 font-medium text-gray-700">Informações:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Nome completo é obrigatório</li>
          <li>• Email deve ser único no sistema</li>
          <li>• CPF deve ser válido e único</li>
          <li>• Senha deve ter pelo menos 8 caracteres</li>
          <li>• Funcionário poderá fazer login com email e senha</li>
        </ul>
      </div>
    </div>
  );
}

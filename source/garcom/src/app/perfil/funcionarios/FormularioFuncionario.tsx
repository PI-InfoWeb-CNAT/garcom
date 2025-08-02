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

  const inputClass =
    "font-poppins rounded-full mb-2 border-[#9E9E9E] bg-[#EFEFEF] !text-xs font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";


  return (
    <div className="items-right min-h-full w-2/5 pl-15">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="space-y-4 rounded-2xl border border-[#9E9E9E] p-9"
      >
        <h3 className="mb-5 text-center text-xl font-semibold text-[#E55F4B]">
          Adicionar Funcionário
        </h3>
        <label className="font-poppins mb-[0.3em] block text-sm text-[#616161]">
          Nome Completo
        </label>
        <Input
          placeholder="Nome completo"
          className={inputClass}
          type="text"
          value={novoFuncionario.nome}
          autoComplete="off"
          onChange={(e) =>
            setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })
          }
        />
        <label className="font-poppins mb-[0.3em] block text-sm text-[#616161]">
          Email
        </label>
        <Input
          placeholder="Email"
          className={inputClass}
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
        <label className="font-poppins mb-[0.3em] block text-sm text-[#616161]">
          CPF
        </label>
        <Input
          placeholder="CPF"
          className={inputClass}
          type="text"
          value={novoFuncionario.cpf}
          autoComplete="off"
          onChange={(e) =>
            setNovoFuncionario({ ...novoFuncionario, cpf: e.target.value })
          }
        />
        <label className="font-poppins mb-[0.3em] block text-sm text-[#616161]">
          Senha
        </label>
        <Input
          placeholder="Senha"
          className={inputClass}
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
          className="mx-auto block rounded-full mt-10 bg-[#f65c5c] px-9 py-2 cursor-pointer text-[1em] font-semibold text-[#FFFFFF] hover:bg-[#e25555]"
          disabled={carregando}
        >
          {carregando ? "Adicionando..." : "Adicionar Funcionário"}
        </button>
      </form>

      <div className="mt-4 rounded-lg bg-gray-50 p-4">
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

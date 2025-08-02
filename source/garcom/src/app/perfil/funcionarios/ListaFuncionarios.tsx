import { CardFuncionario } from "./CardFuncionario";
import { EdicaoFuncionario } from "./EdicaoFuncionario";
import { Funcionario, DadosEdicao } from "./types";

interface ListaFuncionariosProps {
  funcionarios: Funcionario[];
  carregando: boolean;
  editandoId: string | null;
  dadosEdicao: DadosEdicao;
  setDadosEdicao: (dados: DadosEdicao) => void;
  onIniciarEdicao: (funcionario: Funcionario) => void;
  onSalvarEdicao: () => void;
  onCancelarEdicao: () => void;
  onExcluir: (id: string) => void;
}

export function ListaFuncionarios({
  funcionarios,
  carregando,
  editandoId,
  dadosEdicao,
  setDadosEdicao,
  onIniciarEdicao,
  onSalvarEdicao,
  onCancelarEdicao,
  onExcluir,
}: ListaFuncionariosProps) {
  if (carregando) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (funcionarios.length === 0) {
    return <p className="text-gray-500">Nenhum funcionário cadastrado</p>;
  }

  return (
    <div className="space-y-4">
      {funcionarios.map((funcionario) => (
        <div
          key={funcionario.id}
          className="rounded-lg border border-gray-300 p-4"
        >
          {editandoId === funcionario.id ? (
            <EdicaoFuncionario
              dadosEdicao={dadosEdicao}
              setDadosEdicao={setDadosEdicao}
              carregando={carregando}
              onSalvar={onSalvarEdicao}
              onCancelar={onCancelarEdicao}
            />
          ) : (
            <CardFuncionario
              funcionario={funcionario}
              carregando={carregando}
              onEditar={onIniciarEdicao}
              onExcluir={onExcluir}
            />
          )}
        </div>
      ))}
    </div>
  );
}

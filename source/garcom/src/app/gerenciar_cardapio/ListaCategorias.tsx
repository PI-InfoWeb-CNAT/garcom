import { CardCategoria } from "./CardCategoria";
import { EdicaoCategoria } from "./EdicaoCategoria";
import { Categoria, DadosEdicao } from "./types";

interface ListaCategoriasProps {
  categorias: Categoria[];
  carregando: boolean;
  editandoId: string | null;
  dadosEdicao: DadosEdicao;
  setDadosEdicao: (dados: DadosEdicao) => void;
  onIniciarEdicao: (categoria: Categoria) => void;
  onSalvarEdicao: () => void;
  onCancelarEdicao: () => void;
  onExcluir: (id: string) => void;
}

export function ListaCategorias({
  categorias,
  carregando,
  editandoId,
  dadosEdicao,
  setDadosEdicao,
  onIniciarEdicao,
  onSalvarEdicao,
  onCancelarEdicao,
  onExcluir,
}: ListaCategoriasProps) {
  if (carregando) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (categorias.length === 0) {
    return <p className="text-gray-500">Nenhuma categoria cadastrada</p>;
  }

  return (
    <div className="space-y-4">
      {categorias.map((categoria) => (
        <div
          key={categoria.id}
          className="rounded-lg border border-gray-300 p-4"
        >
          {editandoId === categoria.id ? (
            <EdicaoCategoria
              dadosEdicao={dadosEdicao}
              setDadosEdicao={setDadosEdicao}
              carregando={carregando}
              onSalvar={onSalvarEdicao}
              onCancelar={onCancelarEdicao}
            />
          ) : (
            <CardCategoria
              categoria={categoria}
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

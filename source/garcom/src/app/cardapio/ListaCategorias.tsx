import { Input } from "@/components/ui/input";
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
    <ul className="list-disc pl-5 marker:text-red-400">
      {categorias.map((categoria) => (
        <li key={categoria.id} className="mb-5">
          <div className="flex flex-row items-center space-x-4">
            {editandoId === categoria.id ? (
              <Input
                type="text"
                value={dadosEdicao.nome}
                onChange={(e) =>
                  setDadosEdicao({ ...dadosEdicao, nome: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSalvarEdicao();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    onCancelarEdicao();
                  }
                }}
                className="rounded-4xl border-1 border-[#83546A] bg-white p-1 font-semibold text-gray-700"
                autoFocus
                disabled={carregando}
              />
            ) : (
              <h3 className="font-semibold text-gray-700">
                {categoria.nome}
              </h3>
            )}
            <div className="flex flex-row items-center space-x-1">
              {editandoId === categoria.id ? (
                <div key={`edit-buttons-${categoria.id}`} className="flex space-x-1">
                  <button
                    className="cursor-pointer disabled:opacity-50"
                    onClick={onSalvarEdicao}
                    disabled={carregando || !dadosEdicao.nome.trim()}
                    title="Salvar"
                  >
                    <img
                      className="h-8 w-8"
                      src="/editar.svg"
                      alt="Salvar"
                    />
                  </button>
                  <button
                    className="cursor-pointer disabled:opacity-50"
                    onClick={onCancelarEdicao}
                    disabled={carregando}
                    title="Cancelar"
                  >
                    <img
                      className="h-8 w-8"
                      src="/excluir.svg"
                      alt="Cancelar"
                    />
                  </button>
                </div>
              ) : (
                <div key={`view-buttons-${categoria.id}`} className="flex space-x-1">
                  <button
                    className="cursor-pointer disabled:opacity-50"
                    onClick={() => onIniciarEdicao(categoria)}
                    disabled={carregando}
                    title="Editar"
                  >
                    <img
                      className="h-6 w-6"
                      src="/editar.svg"
                      alt="Editar"
                    />
                  </button>
                  <button
                    className="cursor-pointer disabled:opacity-50"
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`)) {
                        onExcluir(categoria.id);
                      }
                    }}
                    disabled={carregando}
                    title="Excluir"
                  >
                    <img
                      className="h-6 w-6"
                      src="/excluir.svg"
                      alt="Excluir"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

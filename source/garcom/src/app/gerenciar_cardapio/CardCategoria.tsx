import { Categoria } from "./types";

interface CardCategoriaProps {
  categoria: Categoria;
  carregando: boolean;
  onEditar: (categoria: Categoria) => void;
  onExcluir: (id: string) => void;
}

export function CardCategoria({
  categoria,
  carregando,
  onEditar,
  onExcluir,
}: CardCategoriaProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">
          {categoria.nome}
        </h3>
      </div>
      <div className="flex space-x-2">
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onEditar(categoria)}
          disabled={carregando}
          title="Editar categoria"
        >
          <img className="h-8 w-8" src="/editar.svg" alt="Editar" />
        </button>
        <button
          className="rounded p-2 hover:cursor-pointer"
          onClick={() => onExcluir(categoria.id)}
          disabled={carregando}
          title="Excluir categoria"
        >
          <img className="h-8 w-8" src="/excluir.svg" alt="Excluir" />
        </button>
      </div>
    </div>
  );
}

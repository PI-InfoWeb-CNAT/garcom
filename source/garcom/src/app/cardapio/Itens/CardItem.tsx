import { Item } from "../types";

interface CardItemProps {
  item: Item;
  carregando: boolean;
  onEditar: (item: Item) => void;
  onExcluir: (id: string) => void;
}

export function CardItem({
  item,
  carregando,
  onEditar,
  onExcluir,
}: CardItemProps) {
  const handleEditar = () => {
    onEditar(item);
  };

  const handleExcluir = () => {
    if (confirm(`Tem certeza que deseja excluir o item "${item.nome}"?`)) {
      onExcluir(item.id);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-red-400">{item.nome}</h3>
        {item.descricao && (
          <p className="text-xs text-gray-600">{item.descricao}</p>
        )}
        <p className="text-xs font-medium text-gray-600">
          R$ {parseFloat(item.preco_unitario).toFixed(2)}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-1">
        <button
          className="cursor-pointer disabled:opacity-50"
          onClick={handleEditar}
          disabled={carregando}
        >
          <img
            className="h-8 w-8"
            src="/editar.svg"
            alt="editar"
          />
        </button>
        <button
          className="cursor-pointer disabled:opacity-50"
          onClick={handleExcluir}
          disabled={carregando}
        >
          <img
            className="h-8 w-8"
            src="/excluir.svg"
            alt="Deletar"
          />
        </button>
      </div>
    </div>
  );
}

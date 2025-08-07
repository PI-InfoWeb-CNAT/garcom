import { Item, DadosEdicaoItem, Categoria } from "../types";
import { CardItem } from "./CardItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ListaItensProps {
  itens: Item[];
  categorias: Categoria[];
  carregando: boolean;
  editandoId: string | null;
  dadosEdicao: DadosEdicaoItem;
  setDadosEdicao: (dados: DadosEdicaoItem) => void;
  onIniciarEdicao: (item: Item) => void;
  onSalvarEdicao: () => void;
  onCancelarEdicao: () => void;
  onExcluir: (id: string) => void;
}

export function ListaItens({
  itens,
  categorias,
  carregando,
  editandoId,
  dadosEdicao,
  setDadosEdicao,
  onIniciarEdicao,
  onSalvarEdicao,
  onCancelarEdicao,
  onExcluir,
}: ListaItensProps) {
  // Função para filtrar itens por categoria
  const getItensPorCategoria = (categoriaId: string) => {
    return itens.filter((item) => item.categoria_id === categoriaId);
  };

  if (carregando) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (categorias.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma categoria cadastrada. Adicione uma categoria para começar.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {categorias.map((categoria) => (
          <AccordionItem key={categoria.id} value={`categoria-${categoria.id}`}>
            <AccordionTrigger className="text-base text-gray-700">
              {categoria.nome} ({getItensPorCategoria(categoria.id).length} itens)
            </AccordionTrigger>
            <AccordionContent className="ml-14">
              <ul className="list-disc pl-5 marker:text-red-400">
                {getItensPorCategoria(categoria.id).length > 0 ? (
                  getItensPorCategoria(categoria.id).map((item) => (
                    <li key={item.id} className="mb-5">
                      <CardItem
                        item={item}
                        carregando={carregando}
                        onEditar={onIniciarEdicao}
                        onExcluir={onExcluir}
                      />
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Nenhum item cadastrado nesta categoria</li>
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

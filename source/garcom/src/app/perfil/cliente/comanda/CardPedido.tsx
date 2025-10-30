"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ModalPedido } from "./ModalPedido";

interface CardPedidoProps {
  pedido: any;
  items?: any[];
}

function formatStatus(status?: string) {
  switch (status) {
    case "aberto":
      return "Aberto";
    case "em_preparacao":
      return "Em preparação";
    case "pronto":
      return "Pronto";
    case "finalizado":
      return "Finalizado";
    default:
      return status ?? "Preparando";
  }
}

export function CardPedido({ pedido, items = [] }: CardPedidoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pedidoIdShort = pedido?.id ? String(pedido.id).slice(0, 6) : "—";
  const horario = pedido?.datahora
    ? new Date(pedido.datahora).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  return (
    <>
      <div
        className="mt-8 cursor-pointer rounded-3xl bg-[#FFC300] px-6 py-4 text-black/65 transition-transform hover:scale-[1.02]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between text-[14px]">
          <h4 className="text-[14px] font-semibold">Pedido #{pedidoIdShort}</h4>
          <p className="text-[14px]">{horario}</p>
        </div>
        <div className="mb-1 flex items-center">
          <img
            className="h-[18px]"
            src="/chapeu_chef.svg"
            alt="Chapéu de Chef"
          />
          <h2 className="ml-1.5 font-semibold">
            {formatStatus(pedido?.status)}
          </h2>
        </div>
        <hr className="border" />
        <div>
          <ul className="space-y-0.2 mt-4">
            {items.map((it, idx) => (
              <li key={idx} className="flex items-center gap-5">
                <p>{(it.quantidade ?? it.qtd ?? 0)} uni</p>
                <h4 className="">{it.item_cardapio?.nome ?? it.item_nome ?? it.item_id ?? "Item"}</h4>
              </li>
            ))}
            {items.length === 0 && (
              <li className="flex items-center gap-5 text-[#9E9E9E]">
                Nenhum item
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            className="rounded-2xl bg-black/65"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <ChevronDown className="text-[#FFC300]" />
          </button>
        </div>
      </div>

      <ModalPedido
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pedido={pedido}
        items={items}
      />
    </>
  );
}

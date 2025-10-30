"use client";
import { X } from "lucide-react";
import { MessageCircle } from "lucide-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalPedidoProps {
  isOpen: boolean;
  onClose: () => void;
  pedido?: any;
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
      return status ?? "—";
  }
}

export function ModalPedido({
  isOpen,
  onClose,
  pedido,
  items = [],
}: ModalPedidoProps) {
  const pedidoIdShort = pedido?.id ? String(pedido.id).slice(0, 6) : "—";
  const horario = pedido?.datahora
    ? new Date(pedido.datahora).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";
  const totalQuantidade = items.reduce(
    (acc, it) => acc + (it.quantidade ?? 0),
    0,
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed top-0 right-0 z-100 h-screen overflow-y-auto bg-white shadow-lg focus:outline-none">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-10">
                <Dialog.Title className="sr-only">
                  Detalhes do Pedido
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="top-4 left-4 cursor-pointer text-[#9E9E9E] transition-opacity hover:opacity-100 focus:outline-none"
                    aria-label="Fechar"
                  >
                    <X className="h-7 w-7" />
                  </button>
                </Dialog.Close>
                <h3 className="text-[19px] font-semibold text-[#9E9E9E]">
                  Pedido #{pedidoIdShort}
                </h3>
                <p className="text-black/65">{horario}</p>
              </div>

              <hr className="border-[#FF954A]" />

              <div className="flex items-center justify-between">
                <div className="flex w-40 items-center justify-center rounded-2xl bg-[#FFC300] py-1 text-white">
                  <hr className="bg mr-1.5 h-2 w-2 rounded-3xl bg-white"></hr>
                  <h4 className="">{formatStatus(pedido?.status)}</h4>
                </div>
                <h3 className="text-[#9E9E9E]">
                  mesa{" "}
                  {pedido?.mesa_numero ??
                    (pedido?.mesa_id
                      ? String(pedido.mesa_id).slice(0, 6)
                      : "—")}
                </h3>
              </div>

              <div className="space-y-3">
                <ul className="space-y-2 text-[14px!important]">
                  {items.map((it, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-[#9E9E9E]"
                    >
                      <div className="flex items-center gap-3">
                        <span>{(it.quantidade ?? it.qtd ?? 0)} uni</span>
                        <h4>{it.item_cardapio?.nome ?? it.item_nome ?? it.item_id ?? "Item"}</h4>
                      </div>
                      <span>{it.observacao ? it.observacao : ""}</span>
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="text-[#9E9E9E]">
                      Nenhum item registrado para este pedido.
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-10 flex items-center">
                <MessageCircle className="mr-1 h-[18px] text-[#9E9E9E]" />
                <h2 className="text-[#9E9E9E]">
                  {items
                    .map((it) => it.observacao)
                    .filter(Boolean)
                    .join(", ") || "Sem observações"}
                </h2>
              </div>

              <hr className="border-rounded border-[#FF954A]" />

              <div className="flex items-center font-semibold text-[#9E9E9E]">
                <h4 className="mr-1">Total:</h4>
                <span>{totalQuantidade} item(s)</span>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

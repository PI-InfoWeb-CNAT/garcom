import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { MessageCircle } from "lucide-react";

interface ModalPedidoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalPedido({ isOpen, onClose }: ModalPedidoProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed top-0 right-0 mt-25 h-screen overflow-y-auto bg-white shadow-lg focus:outline-none">
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
                  Pedido #12345
                </h3>
                <p className="text-black/65">15:57</p>
              </div>

              <hr className="border-[#FF954A]" />

              <div className="flex items-center justify-between">
                <div className="flex w-30 items-center justify-center rounded-2xl bg-[#FFC300] py-1 text-white">
                  <hr className="bg mr-1.5 h-2 w-2 rounded-3xl bg-white"></hr>
                  <h4>Preparando</h4>
                </div>
                <h3 className="text-[#9E9E9E]">mesa 3</h3>
              </div>

              <div className="space-y-3">
                <ul className="space-y-2 text-[14px!important]">
                  <li className="flex items-center justify-between text-[#9E9E9E]">
                    <div className="flex items-center gap-3">
                      <span>2 uni</span>
                      <h4>Pizza Margherita</h4>
                    </div>
                    <span>R$ 45,00</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center mt-10">
                <MessageCircle  className=" h-[18px] text-[#9E9E9E] mr-1" />
                <h2 className=" text-[#9E9E9E]">Tirar o manjericão</h2>
              </div>

              <hr className="border-[#FF954A] border-rounded" />

              <div className="flex items-center text-[#9E9E9E] font-semibold">
                <h4 className="mr-1">Total:</h4>
                <span>
                  R$ 135,00
                </span>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

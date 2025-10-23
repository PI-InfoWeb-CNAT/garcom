"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ModalPedido } from "./ModalPedido";

export function CardPedido() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="mt-8 cursor-pointer rounded-3xl bg-[#FFC300] px-6 py-4 text-black/65 transition-transform hover:scale-[1.02]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between text-[14px]">
          <h4 className="text-[14px] font-semibold">Pedido #12345</h4>
          <p className="text-[14px]">15:57</p>
        </div>
        <div className="mb-1 flex items-center">
          <img
            className="h-[18px]"
            src="/chapeu_chef.svg"
            alt="Chapéu de Chef"
          />
          <h2 className="ml-1.5 font-semibold">Preparando</h2>
        </div>
        <hr className="border" />
        <div>
          <ul className="space-y-0.2 mt-4">
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
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

      <ModalPedido isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

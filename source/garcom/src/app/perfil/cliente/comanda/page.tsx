"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CardPedido } from "./CardPedido";

export default function ClienteComanda() {
  return (
    <>
      <Header />
      <div className="mx-6 mt-30 mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#F65C5C]">Minha Comanda</h1>
          <h3 className="font-semibold text-[#9E9E9E]">3 pedido(s)</h3>
        </div>
        <button className="mt-4 cursor-pointer rounded-full bg-[#F65C5C] px-5 py-1 text-[16px] text-white hover:bg-[#f79393]">
          Fazer pedido
        </button>
        <CardPedido />
        <CardPedido />
        <CardPedido />
      </div>
      <Footer />
    </>
  );
}

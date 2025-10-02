
"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
const ClientePedido = () => {
  return (
    <div>
      <Header />
      <main className="!pt-26 flex items-center flex-col min-h-screen bg-white">
        <section>
          <section className="m-[5vw]">
            <div className="flex items-center mb-4 place-content-between">
              <h2 className="text-[20px] font-bold text-[#F65C5C] mr-4 ">Pedido</h2>
              
            </div>
            <div className="mb-8">
              <h3 className="text-[20px] font-bold text-[#F65C5C] mb-2">Itens do pedido</h3>
              <ul>
                <li className="flex items-center mb-6">
                  <img className="w-24 h-24 rounded-[5vw] object-cover mr-5" src="/comidateste.jpg" alt="Pizza" />
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-[#F65C5C]">Pizza Calabresa</h3>
                    <p className="text-[#464646] max-w-[100%]">Massa fina, molho especial, calabresa, cebola e queijo.</p>
                    <div className="flex items-center place-content-between max-w-[100%] mt-2">
                      <p className="!text-[18px] min-w-[10%] font-extrabold text-[#F65C5C]">
                        <span className="text-[14px] font-bold text-[#F65C5C]">R$</span> 39,90
                      </p>
                      <div className="flex items-center gap-2 ml-auto">
                            <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-lg cursor-pointer text-[#F65C5C]"
                            onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                            >-</button>
                            <span>1</span>
                            <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-lg cursor-pointer text-[#F65C5C]"
                            onClick={() => setQuantidade(q => q + 1)}
                            >+</button>
                        </div>
                        <img className="w-4 h-4 ml-4 cursor-pointer" src="/excluir_f.svg" alt="Remover item" />
                    </div>
                  </div>
                </li>
                
              </ul>
              <div className="flex justify-end mt-6">
                <span className="text-[18px] font-bold text-[#F65C5C]">Total: R$ 87,80</span>
              </div>
            </div>
            <h2 className="text-[15px] font-bold text-[#9E9E9E] mr-4 mb-5">Observações</h2>

            <Input
                    type="text"
                    placeholder="Descrição do produto"
                    value="descricaoItem"
                    className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-5 text-[#83546A] text-[16px] mb-2"
                />

          </section>
        </section>
        <div className="fixed bottom-6 flex items-center gap-4 bg-[#F65C5C] text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          <button className="text-white !border-2 border-white font-bold px-4 py-2 rounded-full hover:bg-[#E15050] cursor-pointer">Cancelar</button>
          <button className="bg-white text-[#F65C5C] font-bold px-4 py-2 rounded-full hover:bg-[#FFE3CF] cursor-pointer">Confirmar pedido</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientePedido;
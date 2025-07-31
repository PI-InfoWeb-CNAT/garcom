"use client";

import { useState } from "react";
import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Tipos
type dados = {
  id: string;
  nome: string;
  restaurante_id?: string;
};

type Item = {
  id: string;
  id_restaurante: number;
  nome: string;
  descricao: string;
  valor: number;
  imagem: string;
  categoria_id: string;
};

export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  const criarCategoria = async (dados) => {
    const res = await fetch("/api/categoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return await res.json();
  };

  // Buscar todos os registros
  const buscarCategorias = async () => {
    const res = await fetch("/api/categoria");
    return await res.json();
  };

  // Buscar por ID
  const buscarCategoriaPorId = async (id) => {
    const res = await fetch(`/api/categoria?id=${id}`);
    return await res.json();
  };

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    buscarCategorias().then(setCategorias);
  }, []);



  return (
    <>
      <Header />
      <main className={mainClass}>
        <div className="items-left min-h-full flex-1 pr-30">
          <div className="mb-10 flex flex-row items-center justify-between">
            <h2 className="mb-10 text-2xl font-bold text-red-400">Cardápio</h2>
            <div className="mb-5 flex flex-row items-center justify-between">
              <Input
                placeholder="Adicionar novo produto"
                className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
              />
              <button className="cursor-pointer">
                <img
                  className="ml-0.5 h-fit w-fit"
                  src="/add.svg"
                  alt="Adicionar"
                />
              </button>
            </div>
          </div>
          <ul className="flex flex-col gap-5">
            {categorias.map((categoria) => (
              <li key={categoria.id}>{categoria.nome}</li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}

<<<<<<< HEAD
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


=======
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { getDados } from "@/app/auth/getDados/page";
import CategoriasList from "../gerenciar_cardapio/components/CategoriasList";

// Tipos
type Categoria = {
  id: string;
  nome: string;
  restaurante_id: string;
};

const testeCategorias = async () => {
  const dados = await getDados();

  if (!dados) {
    return (
      <div className="p-10 text-center">
        <h1>Erro ao carregar dados do usuário</h1>
      </div>
    );
  }

  const { role, roleData, user } = dados;

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass =
    "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  // Buscar categorias do servidor
  let categorias: Categoria[] = [];
  let errorMessage = "";

  if (roleData?.id) {
    try {
      // ✅ Debug: Verificar variáveis
      console.log("🔍 Debug - Dados para carregar categorias:");
      console.log("   - API URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("   - Restaurante ID:", roleData.id);

      // ✅ Construir URL corretamente
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = `${baseUrl}/api/categorias?restaurante_id=${roleData.id}`;
      console.log("   - URL completa:", url);

      const response = await fetch(url, {
        cache: "no-store", // Para sempre buscar dados atualizados
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (response.ok) {
        categorias = await response.json();
        console.log("✅ Categorias carregadas:", categorias);
      } else {
        const errorText = await response.text();
        console.error("❌ Erro na API:", errorText);
        errorMessage = `Erro ${response.status}: ${errorText}`;
      }
    } catch (error) {
      console.error("❌ Erro ao carregar categorias:", error);
      errorMessage = `Erro de conexão: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`;
    }
  } else {
    console.warn("⚠️ Não há restaurante_id para carregar categorias");
    errorMessage = "Restaurante não identificado";
  }
>>>>>>> 7929e95e38d622a90db905db0b488887edaf0bb4

  return (
    <>
      <Header />
      <main className={mainClass}>
<<<<<<< HEAD
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
=======
        <h1 className={`${tituloClass} !m-0 !text-[27px] !text-[#616161]`}>
          {user.name} - Categorias
        </h1>

        {/* Informações do usuário */}
        <div className="mb-6 rounded-lg border bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-blue-800">
            Dados do Sistema
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Usuário:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Restaurante:</strong> {roleData?.nome || "N/A"}
            </p>
            <p className="col-span-2">
              <strong>Restaurante ID:</strong>
              <span className="ml-2 rounded bg-yellow-200 px-2 py-1">
                {roleData?.id}
              </span>
            </p>
          </div>
        </div>

        {/* Mostrar erro se houver */}
        {errorMessage && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
            <strong>Erro ao carregar categorias:</strong> {errorMessage}
          </div>
        )}

        <div className="items-right min-h-full w-2/5 pl-30">
          {/* Componente Client para interações */}
          <CategoriasList
            categoriasIniciais={categorias}
            restauranteId={roleData?.id || null}
          />
>>>>>>> 7929e95e38d622a90db905db0b488887edaf0bb4
        </div>
      </main>

      <Footer />
    </>
  );
<<<<<<< HEAD
}
=======
};

export default testeCategorias;
>>>>>>> 7929e95e38d622a90db905db0b488887edaf0bb4

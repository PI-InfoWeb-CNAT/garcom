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

export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  // Adicionar categoria
  const [categorias, setCategoria] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");

  useEffect(() => {
    const categoriasSalvas = localStorage.getItem("categorias");
    if (categoriasSalvas !== null) {
      setCategoria(JSON.parse(categoriasSalvas));
    }
  }, []);

  // salvar categorias no localStorage
  const salvarLocalStorage = (novasCategorias) => {
    localStorage.setItem("categorias", JSON.stringify(novasCategorias));
  };

  const addCategoria = () => {
    if (novaCategoria.trim() !== "") {
      const categoria = {
        id: categorias.length + 1,
        nome: novaCategoria,
      };
      setCategoria([...categorias, categoria]);
      salvarLocalStorage([...categorias, categoria]);
      setNovaCategoria("");
    }
  };

  // excluir categoria
  const excluirCategoria = (id: number) => {
    const novasCategorias = categorias.filter(
      (categoria) => categoria.id !== id,
    );
    setCategoria(novasCategorias);
    salvarLocalStorage(novasCategorias);
  };

  // editar categoria
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditando, setNomeEditando] = useState("");



  const iniciarEdicao = (id: number, nome: string) => {
    setEditandoId(id);
    setNomeEditando(nome);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditando("");
  };

  const salvarEdicao = () => {
    if (nomeEditando.trim() !== "" && editandoId !== null) {
      const novasCategorias = categorias.map((categoria) => {
        if (categoria.id === editandoId) {
          return { ...categoria, nome: nomeEditando };
        }
        return categoria;
      });
      setCategoria(novasCategorias);
      salvarLocalStorage(novasCategorias);
      cancelarEdicao();
    }
  };



  

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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base text-gray-700">
                Destaques
              </AccordionTrigger>
              <AccordionContent className="ml-14">
                <ul>
                  <li className="mb-5 flex flex-row items-center justify-between">
                    <h3 className="font-semibold text-red-400">Item 1</h3>
                    <div className="flex flex-row items-center justify-between space-x-8">
                      <p className="text-red-400">
                        ----------------------------------------
                      </p>
                      <div className="flex flex-row items-center space-x-1">
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/editar.svg"
                            alt="editar"
                          />
                        </button>
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/excluir.svg"
                            alt="Deletar"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="mb-5 flex flex-row items-center justify-between">
                    <h3 className="font-semibold text-red-400">Item 2</h3>
                    <div className="flex flex-row items-center justify-between space-x-8">
                      <p className="text-red-400">
                        ----------------------------------------
                      </p>
                      <div className="flex flex-row items-center space-x-1">
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/editar.svg"
                            alt="editar"
                          />
                        </button>
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/excluir.svg"
                            alt="Deletar"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* borda */}
        <div className="mx-8 w-px self-stretch bg-[#F55774]"></div> 

        <div className="items-right min-h-full w-2/5 pl-30">
          <div className="mb-5 flex flex-row items-center justify-between">
            <Input
              placeholder="Adicionar nova categoria"
              className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
            <button className="cursor-pointer" onClick={addCategoria}>
              <img
                className="ml-0.5 h-fit w-fit"
                src="/add.svg"
                alt="Adicionar"
              />
            </button>
          </div>
          <ul className="list-disc pl-5 marker:text-red-400">
            {categorias.map((categoria) => (
              <li key={categoria.id} className="mb-5">
                <div className="flex flex-row items-center space-x-4">
                  {editandoId === categoria.id ? (
                    <Input
                      type="text"
                      value={nomeEditando}
                      onChange={(e) => setNomeEditando(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          salvarEdicao();
                        } else if (e.key === "Escape") {
                          cancelarEdicao();
                        }
                      }}
                      className="rounded-4xl border-1 border-[#83546A] bg-white p-1 font-semibold text-gray-700"
                      autoFocus
                    />
                  ) : (
                    <h3 className="font-semibold text-gray-700">
                      {categoria.nome}
                    </h3>
                  )}
                  <div className="flex flex-row items-center space-x-1">
                    {editandoId === categoria.id ? (
                      <>
                        <button
                          className="cursor-pointer"
                          onClick={salvarEdicao}
                        >
                          <img
                            className="h-8 w-8"
                            src="/editar.svg"
                            alt="Salvar"
                          />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={cancelarEdicao}
                        >
                          <img
                            className="h-8 w-8"
                            src="/excluir.svg"
                            alt="Cancelar"
                          />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            iniciarEdicao(categoria.id, categoria.nome)
                          }
                        >
                          <img
                            className="h-6 w-6"
                            src="/editar.svg"
                            alt="editar"
                          />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={() => excluirCategoria(categoria.id)}
                        >
                          <img
                            className="h-6 w-6"
                            src="/excluir.svg"
                            alt="Deletar"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

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
type Categoria = {
  id: number;
  nome: string;
};

type Item = {
  id: number;
  id_restaurante: number;
  nome: string;
  descricao: string;
  valor: number;
  imagem: string;
  categoria_id: number;
};

export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  // Adicionar categoria
  const [categorias, setCategoria] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");

  // Estados do modal de adicionar item
  const [modalAberto, setModalAberto] = useState(false);
  const [nomeItem, setNomeItem] = useState("");
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [imagemSelecionada, setImagemSelecionada] =
    useState<string>("/comidateste.jpg");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    number | null
  >(null);

  useEffect(() => {
    const categoriasSalvas = localStorage.getItem("categorias");
    if (categoriasSalvas !== null) {
      setCategoria(JSON.parse(categoriasSalvas));
    }
  }, []);

  // salvar categorias no localStorage
  const salvarLocalStorage = (novasCategorias: Categoria[]) => {
    localStorage.setItem("categorias", JSON.stringify(novasCategorias));
  };

  const addCategoria = () => {
    if (novaCategoria.trim() !== "") {
      const categoria = {
        id: Date.now(), // Usar timestamp para IDs únicos
        nome: novaCategoria.trim(),
      };
      const novasCategorias = [...categorias, categoria];
      setCategoria(novasCategorias);
      salvarLocalStorage(novasCategorias);
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

  // Funções do modal de adicionar item
  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    limparFormularioItem();
  };

  const limparFormularioItem = () => {
    setNomeItem("");
    setDescricaoItem("");
    setValorItem("");
    setImagemSelecionada("/comidateste.jpg");
    setCategoriaSelecionada(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemSelecionada(imageUrl);
    }
  };

  const selecionarCategoria = (categoriaId: number) => {
    if (categoriaSelecionada === categoriaId) {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(categoriaId);
    }
  };

  const isCategoriaSelected = (categoriaId: number) => {
    return categoriaSelecionada === categoriaId;
  };

  const salvarItem = () => {
    // Validações
    if (!nomeItem.trim()) {
      alert("Nome do produto é obrigatório!");
      return;
    }
    if (!descricaoItem.trim()) {
      alert("Descrição é obrigatória!");
      return;
    }
    if (!valorItem || parseFloat(valorItem) <= 0) {
      alert("Valor deve ser maior que zero!");
      return;
    }
    if (categoriaSelecionada === null) {
      alert("Selecione uma categoria!");
      return;
    }

    // Criar novo item
    const novoItem: Item = {
      id: Date.now(),
      id_restaurante: 1,
      nome: nomeItem.trim(),
      descricao: descricaoItem.trim(),
      valor: parseFloat(valorItem),
      imagem: imagemSelecionada,
      categoria_id: categoriaSelecionada,
    };

    // Salvar no localStorage
    const itensExistentes = localStorage.getItem("itens");
    const itens = itensExistentes ? JSON.parse(itensExistentes) : [];
    itens.push(novoItem);
    localStorage.setItem("itens", JSON.stringify(itens));

    alert("Item salvo com sucesso!");
    fecharModal();
  };

  const handleSubmitItem = (e: React.FormEvent) => {
    e.preventDefault();
    salvarItem();
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
                readOnly
                onClick={abrirModal}
              />
              <button className="cursor-pointer" onClick={abrirModal}>
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

      {/* Form para adicionar item */}
      {modalAberto && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="mx-4 max-h-[95vh] w-[40%] max-w-xl overflow-y-auto">
            <section className="min-h-fit rounded-3xl border-1 border-[#F55774] bg-white p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#F55774]">
                  Adicionar Novo Item
                </h2>
              </div>

              <form className="space-y-3" onSubmit={handleSubmitItem}>
                <div className="relative">
                  <input
                    type="file"
                    id="file-input-modal"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="file-input-modal"
                    className="absolute z-10 m-5 cursor-pointer rounded-full p-2 shadow-lg transition-shadow hover:shadow-xl"
                  >
                    <img
                      src={"/arquivo.svg"}
                      alt="Arquivo"
                      className="h-8 w-8"
                    />
                  </label>

                  <img
                    src={imagemSelecionada}
                    alt="foto_item"
                    className="h-50 w-full rounded-3xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#616161]">
                    Nome do produto
                  </h2>
                  <Input
                    type="text"
                    placeholder="Nome do produto"
                    value={nomeItem}
                    onChange={(e) => setNomeItem(e.target.value)}
                    className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                    required
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#616161]">
                    Descrição
                  </h2>
                  <Input
                    type="text"
                    placeholder="Descrição do produto"
                    value={descricaoItem}
                    onChange={(e) => setDescricaoItem(e.target.value)}
                    className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                    required
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#616161]">
                    Valor
                  </h2>
                  <Input
                    type="number"
                    placeholder="00,00"
                    step="0.01"
                    min="0"
                    value={valorItem}
                    onChange={(e) => setValorItem(e.target.value)}
                    className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                    required
                  />
                </div>
                <div className="relative overflow-hidden">
                  <h2 className="mb-3 text-lg font-semibold text-[#616161]">
                    Categoria (selecione uma)
                  </h2>
                  <Carousel className="w-full max-w-full">
                    <CarouselContent className="-ml-1">
                      {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                          <CarouselItem
                            key={categoria.id}
                            className="min-w-0 flex-shrink-0 basis-1/3 pl-1"
                          >
                            <button
                              type="button"
                              onClick={() => selecionarCategoria(categoria.id)}
                              className={`w-full cursor-pointer rounded-3xl border-2 p-2 transition-all duration-200 ${
                                isCategoriaSelected(categoria.id)
                                  ? "scale-100 transform border-transparent bg-[#FFE3CF] text-[#E55F4B]"
                                  : "border-transparent bg-[#D9D9D9] text-gray-700 hover:border-gray-300 hover:bg-[#C0C0C0]"
                              }`}
                            >
                              <div className="flex items-center justify-center">
                                <p className="text-sm font-medium">
                                  {categoria.nome}
                                </p>
                              </div>
                            </button>
                          </CarouselItem>
                        ))
                      ) : (
                        <div className="w-full py-4 text-center">
                          <p className="text-gray-500">
                            Nenhuma categoria encontrada
                          </p>
                        </div>
                      )}
                    </CarouselContent>
                  </Carousel>

                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/85 to-transparent"></div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={fecharModal}
                    className="rounded-3xl bg-[#FFC300] p-6"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-3xl bg-[#E55F4B] p-6 pr-15 pl-15"
                  >
                    Salvar Produto
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

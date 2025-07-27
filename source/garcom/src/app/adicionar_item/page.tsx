"use client";

import { useEffect, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

// Tipos para o item e categoria
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
  categorias: number[]; // IDs das categorias selecionadas
};

export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-right min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [imagemSelecionada, setImagemSelecionada] =
    useState<string>("/comidateste.jpg");
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    number[]
  >([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carregar categorias do localStorage
  useEffect(() => {
    const categoriasStorage = localStorage.getItem("categorias");
    if (categoriasStorage) {
      try {
        const categoriasCarregadas = JSON.parse(categoriasStorage);
        setCategorias(categoriasCarregadas);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setCategorias([]);
      }
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemSelecionada(imageUrl);
    }
  };

  // Função para toggle de seleção de categoria
  const toggleCategoria = (categoriaId: number) => {
    setCategoriasSelecionadas((prev) => {
      if (prev.includes(categoriaId)) {
        return prev.filter((id) => id !== categoriaId);
      } else {
        return [...prev, categoriaId];
      }
    });
  };

  // Função para verificar se categoria está selecionada
  const isCategoriaSelected = (categoriaId: number) => {
    return categoriasSelecionadas.includes(categoriaId);
  };

  // Função para salvar item no localStorage
  const salvarItem = () => {
    // Validações
    if (!nome.trim()) {
      alert("Nome do produto é obrigatório!");
      return;
    }
    if (!descricao.trim()) {
      alert("Descrição é obrigatória!");
      return;
    }
    if (!valor || parseFloat(valor) <= 0) {
      alert("Valor deve ser maior que zero!");
      return;
    }
    if (categoriasSelecionadas.length === 0) {
      alert("Selecione pelo menos uma categoria!");
      return;
    }

    // Criar novo item
    const novoItem: Item = {
      id: Date.now(), // ID único baseado em timestamp
      id_restaurante: 1, // Valor fixo
      nome: nome.trim(),
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      imagem: imagemSelecionada,
      categorias: categoriasSelecionadas,
    };

    // Salvar no localStorage
    const itensExistentes = localStorage.getItem("itens");
    const itens = itensExistentes ? JSON.parse(itensExistentes) : [];
    itens.push(novoItem);
    localStorage.setItem("itens", JSON.stringify(itens));

    // Feedback de sucesso
    alert("Item salvo com sucesso!");

    // Limpar formulário
    limparFormulario();
  };

  // Função para limpar o formulário
  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor("");
    setImagemSelecionada("/comidateste.jpg");
    setCategoriasSelecionadas([]);
  };

  // Função para cancelar
  const cancelar = () => {
    if (confirm("Deseja realmente cancelar? Todos os dados serão perdidos.")) {
      limparFormulario();
    }
  };

  // Função para lidar com submit do form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salvarItem();
  };

  return (
    <>
      <Header />
      <main className={mainClass}>
        <section className="min-h-fit rounded-3xl border-1 border-[#F55774] p-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="file-input"
                className="absolute z-10 m-5 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-shadow hover:shadow-xl"
              >
                <img src={"/arquivo.svg"} alt="Arquivo" className="h-8 w-8" />
              </label>

              <img
                src={imagemSelecionada}
                alt="foto_item"
                className="h-60 w-100 rounded-3xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">
                Nome do produto
              </h2>
              <Input
                type="text"
                id="product-name"
                placeholder="Nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                required
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">
                Descrição
              </h2>
              <Input
                type="text"
                id="product-description"
                placeholder="Descrição do produto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                required
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">Valor</h2>
              <Input
                type="number"
                id="product-value"
                placeholder="00,00"
                step="0.01"
                min="0"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                required
              />
            </div>
            <div className="relative overflow-hidden">
              <h2 className="mb-3 text-lg font-semibold text-[#616161]">
                Categorias (selecione uma ou mais)
              </h2>
              <Carousel className="w-full max-w-100">
                <CarouselContent className="-ml-1">
                  {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <CarouselItem
                        key={categoria.id}
                        className="min-w-0 flex-shrink-0 basis-1/3 pl-1"
                      >
                        <button
                          type="button"
                          onClick={() => toggleCategoria(categoria.id)}
                          className={`w-full cursor-pointer rounded-3xl border-2 p-2 transition-all duration-200 ${
                            isCategoriaSelected(categoria.id)
                              ? "scale-100 transform border-[#F55774] bg-[#F55774] text-[#E55F4B]"
                              : "border-transparent bg-[#D9D9D9] text-gray-700 hover:border-gray-300 hover:bg-[#C0C0C0]"
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-sm border-2 ${
                                isCategoriaSelected(categoria.id)
                                  ? "border-white bg-white"
                                  : "border-gray-500 bg-transparent"
                              }`}
                            >
                              {isCategoriaSelected(categoria.id) && (
                                <svg
                                  className="h-3 w-3 text-[#F55774]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
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
                onClick={cancelar}
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
      </main>
      <Footer />
    </>
  );
}

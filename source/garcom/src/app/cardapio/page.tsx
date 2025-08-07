"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useItens } from "./useItens";
import CategoriasList from "./components/CategoriasList";
import { ListaItens } from "./Itens/ListaItens";
import { EdicaoItem } from "./Itens/EdicaoItem";

const testeCategorias = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  
  // Estados do modal de adicionar item
  const [nomeItem, setNomeItem] = useState("");
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState<string>("/comidateste.jpg");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  
  const {
    itens,
    categorias,
    carregando,
    editandoId,
    dadosEdicao,
    setDadosEdicao,
    iniciarEdicao,
    salvarEdicao,
    cancelarEdicao,
    excluirItem,
    adicionarItem,
    novoItem,
    setNovoItem,
    restauranteId,
    carregarItens,
    carregarCategorias,
  } = useItens();

  // Funções do modal de adicionar item
  const abrirModalAdicionar = () => {
    console.log("🔍 Debug abrirModalAdicionar - Categorias carregadas:", categorias);
    console.log("🔍 Debug - Quantidade de categorias:", categorias.length);
    setModalAdicionarAberto(true);
    limparFormularioItem();
  };

  const fecharModalAdicionar = () => {
    setModalAdicionarAberto(false);
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagemSelecionada(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const selecionarCategoria = (categoriaId: string) => {
    if (categoriaSelecionada === categoriaId) {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(categoriaId);
    }
  };

  const isCategoriaSelected = (categoriaId: string) => {
    return categoriaSelecionada === categoriaId;
  };

  const salvarNovoItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🔍 Debug salvarNovoItem - Nome:", nomeItem);
    console.log("🔍 Debug salvarNovoItem - Valor:", valorItem);
    console.log("🔍 Debug salvarNovoItem - Categoria selecionada:", categoriaSelecionada);
    
    // Validações
    if (!nomeItem.trim()) {
      alert("Nome do produto é obrigatório!");
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

    // Criar objeto com os dados do item
    const dadosItem = {
      nome: nomeItem.trim(),
      preco_unitario: valorItem,
      descricao: descricaoItem.trim() || "",
      foto: imagemSelecionada,
      categoria_id: categoriaSelecionada,
    };

    console.log("🔍 Debug - Dados do item a serem salvos:", dadosItem);

    // Chamar a função do hook passando os dados diretamente
    const sucesso = await adicionarItem(dadosItem);
    
    // Se foi bem-sucedido, fechar o modal
    if (sucesso) {
      fecharModalAdicionar();
    }
  };

  if (carregando) {
    return (
      <div className="p-10 text-center">
        <h1>Carregando dados...</h1>
      </div>
    );
  }

  // Debug: Log das categorias no render
  console.log("🔍 Debug render - Categorias:", categorias);
  console.log("🔍 Debug render - Carregando:", carregando);
  console.log("🔍 Debug render - RestauranteId:", restauranteId);

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass =
    "!pt-35 flex flex-row items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  return (
    <>
      <Header />
      <main className={mainClass}>
          {/* <h2 className="mb-10 text-2xl font-bold text-red-400">Cardápio</h2> */}
        <div className="flex-1">
          
          {/* Input para adicionar novo item */}
          <div className="mb-5 flex flex-row items-center justify-between">
            <Input
              placeholder="Adicionar novo item"
              className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
              type="text"
              value="" // Mantém vazio, apenas visual
              readOnly // Só para mostrar, não para digitar
              onClick={abrirModalAdicionar}
              style={{ cursor: 'pointer' }}
            />
            <button className="cursor-pointer" onClick={abrirModalAdicionar}>
              <img
                className="ml-0.5 h-fit w-fit"
                src="/add.svg"
                alt="Adicionar Item"
              />
            </button>
          </div>
          
          {/* Lista de Itens */}
          <ListaItens
            itens={itens}
            categorias={categorias}
            carregando={carregando}
            editandoId={editandoId}
            dadosEdicao={dadosEdicao}
            setDadosEdicao={setDadosEdicao}
            onIniciarEdicao={(item) => {
              iniciarEdicao(item);
              setModalAberto(true);
            }}
            onSalvarEdicao={salvarEdicao}
            onCancelarEdicao={cancelarEdicao}
            onExcluir={excluirItem}
          />
        </div>

        {/* borda */}
        <div className="mx-8 mr-10 ml-30 w-px self-stretch bg-[#F55774]"></div>

        <div className="items-right min-h-full w-2/5 pl-30">
          {/* Gerenciamento de Categorias */}
          <CategoriasList
            categoriasIniciais={categorias}
            restauranteId={restauranteId || ""}
            onCategoriasChange={() => {
              // Recarregar ambas as listas quando há mudança nas categorias
              carregarItens();
              carregarCategorias();
            }}
          />
        </div>
      </main>

      {/* Modal de Edição */}
      {modalAberto && editandoId && (
        <EdicaoItem
          dadosEdicao={dadosEdicao}
          setDadosEdicao={setDadosEdicao}
          categorias={categorias}
          carregando={carregando}
          onSalvar={() => {
            salvarEdicao();
            setModalAberto(false);
          }}
          onCancelar={() => {
            setModalAberto(false);
            cancelarEdicao();
          }}
        />
      )}

      {/* Modal de Adicionar Item */}
      {modalAdicionarAberto && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="mx-4 max-h-[95vh] w-[40%] max-w-xl overflow-y-auto">
            <section className="min-h-fit rounded-3xl border-1 border-[#F55774] bg-white p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#F55774]">
                  Adicionar Novo Item
                </h2>
              </div>

              <form className="space-y-3" onSubmit={salvarNovoItem}>
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
                  
                  {carregando ? (
                    <div className="w-full py-4 text-center">
                      <p className="text-gray-500">Carregando categorias...</p>
                    </div>
                  ) : (
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
                              Nenhuma categoria encontrada. 
                              Total de categorias: {categorias.length}
                            </p>
                          </div>
                        )}
                      </CarouselContent>
                    </Carousel>
                  )}

                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/85 to-transparent"></div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={fecharModalAdicionar}
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
};

export default testeCategorias;

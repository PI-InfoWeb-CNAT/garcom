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

  // Funções para API de categorias
  const buscarCategorias = async () => {
    try {
      const res = await fetch('/api/categorias', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  };

  const criarCategoria = async (dados: any) => {
    try {
      console.log('Enviando dados para API:', dados);
      const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      
      console.log('Status da resposta:', res.status);
      const resultado = await res.json();
      console.log('Resposta da API de criação:', resultado);
      
      return resultado;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      return null;
    }
  };

  const atualizarCategoria = async (id: string, dados: any) => {
    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      return null;
    }
  };

  const deletarCategoria = async (id: string) => {
    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      return null;
    }
  };

  // Funções para API de itens
  const buscarItens = async () => {
    try {
      const res = await fetch('/api/itens', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      return [];
    }
  };

  const criarItem = async (dados: any) => {
    try {
      const res = await fetch('/api/itens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao criar item:', error);
      return null;
    }
  };

  const atualizarItem = async (id: string, dados: any) => {
    try {
      const res = await fetch(`/api/itens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      return null;
    }
  };

  const deletarItem = async (id: string) => {
    try {
      const res = await fetch(`/api/itens/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      return null;
    }
  };

  // Adicionar categoria
  const [categorias, setCategoria] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");

  // Estados para itens
  const [itens, setItens] = useState<Item[]>([]);

  // Estados do modal de adicionar/editar item
  const [modalAberto, setModalAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState<Item | null>(null);
  const [nomeItem, setNomeItem] = useState("");
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [imagemSelecionada, setImagemSelecionada] =
    useState<string>("/comidateste.jpg");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const categoriasBuscadas = await buscarCategorias();
        setCategoria(categoriasBuscadas);

        const itensBuscados = await buscarItens();
        setItens(itensBuscados);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  const addCategoria = async () => {
    if (novaCategoria.trim() !== "") {
      const dadosCategoria = {
        nome: novaCategoria.trim(),
        restaurante_id: "550e8400-e29b-41d4-a716-446655440000", // UUID padrão
      };
      
      console.log('Dados da categoria a serem enviados:', dadosCategoria);
      
      const novaCategoriaCriada = await criarCategoria(dadosCategoria);
      console.log('Resposta da API:', novaCategoriaCriada);
      
      if (novaCategoriaCriada && !novaCategoriaCriada.error) {
        setCategoria([...categorias, novaCategoriaCriada]);
        setNovaCategoria("");
        console.log('Categoria adicionada ao estado:', novaCategoriaCriada);
      } else {
        alert("Erro ao criar categoria: " + (novaCategoriaCriada?.error || "Erro desconhecido"));
      }
    }
  };

  // excluir categoria
  const excluirCategoria = async (id: string) => {
    const resultado = await deletarCategoria(id);
    if (resultado) {
      const novasCategorias = categorias.filter(
        (categoria) => categoria.id !== id,
      );
      setCategoria(novasCategorias);
    } else {
      alert("Erro ao excluir categoria!");
    }
  };

  // editar categoria
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditando, setNomeEditando] = useState("");

  
  const iniciarEdicao = (id: string, nome: string) => {
    setEditandoId(id);
    setNomeEditando(nome);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditando("");
  };

  const salvarEdicao = async () => {
    if (nomeEditando.trim() !== "" && editandoId !== null) {
      const dadosAtualizados = {
        nome: nomeEditando.trim(),
      };
      
      const resultado = await atualizarCategoria(editandoId, dadosAtualizados);
      if (resultado) {
        const novasCategorias = categorias.map((categoria) => {
          if (categoria.id === editandoId) {
            return { ...categoria, nome: nomeEditando };
          }
          return categoria;
        });
        setCategoria(novasCategorias);
        cancelarEdicao();
      } else {
        alert("Erro ao atualizar categoria!");
      }
    }
  };

  // Funções do modal de adicionar/editar item
  const abrirModal = () => {
    setModalAberto(true);
    setItemEditando(null);
  };

  const abrirModalEdicao = (item: Item) => {
    setItemEditando(item);
    setNomeItem(item.nome);
    setDescricaoItem(item.descricao);
    setValorItem(item.valor.toString());
    setImagemSelecionada(item.imagem);
    setCategoriaSelecionada(item.categoria_id);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemEditando(null);
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

  const salvarItem = async () => {
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

    const dadosItem = {
      nome: nomeItem.trim(),
      descricao: descricaoItem.trim(),
      valor: parseFloat(valorItem),
      imagem: imagemSelecionada,
      categoria_id: categoriaSelecionada,
      id_restaurante: '210b0a36-b898-44a2-8e63-e236eccfaffa', // Por enquanto hardcoded
    };

    if (itemEditando) {
      // Editando item existente
      const resultado = await atualizarItem(itemEditando.id, dadosItem);
      if (resultado) {
        const novosItens = itens.map((item) =>
          item.id === itemEditando.id ? resultado : item
        );
        setItens(novosItens);
        alert("Item atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar item!");
        return;
      }
    } else {
      // Criando novo item
      const novoItem = await criarItem(dadosItem);
      if (novoItem) {
        setItens([...itens, novoItem]);
        alert("Item salvo com sucesso!");
      } else {
        alert("Erro ao salvar item!");
        return;
      }
    }

    fecharModal();
  };

  // Função para excluir item
  const excluirItem = async (id: string) => {
    const resultado = await deletarItem(id);
    if (resultado) {
      const novosItens = itens.filter((item) => item.id !== id);
      setItens(novosItens);
    } else {
      alert("Erro ao excluir item!");
    }
  };

  // Função para filtrar itens por categoria
  const getItensPorCategoria = (categoriaId: string) => {
    return itens.filter((item) => item.categoria_id === categoriaId);
  };

   const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    await salvarItem();
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

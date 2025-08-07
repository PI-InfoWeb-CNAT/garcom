import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Item, NovoItem, DadosEdicaoItem, Categoria } from "./types";

export function useItens() {
  // Estados para gerenciar itens
  const [itens, setItens] = useState<Item[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [novoItem, setNovoItem] = useState<NovoItem>({
    nome: "",
    preco_unitario: "",
    descricao: "",
    foto: "",
    categoria_id: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [restauranteId, setRestauranteId] = useState<string | null>(null);

  // Estados para edição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [dadosEdicao, setDadosEdicao] = useState<DadosEdicaoItem>({
    nome: "",
    preco_unitario: "",
    descricao: "",
    foto: "",
    categoria_id: "",
  });

  // Carregar dados do usuário logado e restaurante
  useEffect(() => {
    const inicializar = async () => {
      try {
        await carregarDadosUsuario();
      } catch (error) {
        console.error("Erro na inicialização:", error);
      }
    };

    inicializar();
  }, []);

  // Carregar itens quando tiver o restaurante_id
  useEffect(() => {
    if (restauranteId) {
      carregarItens();
      carregarCategorias();
    }
  }, [restauranteId]);

  // Buscar dados do usuário logado e seu restaurante
  const carregarDadosUsuario = async () => {
    try {
      setCarregando(true);

      // Buscar sessão atual usando authClient
      const sessionData = await authClient.getSession();

      if (sessionData?.data?.user?.id) {
        const userId = sessionData.data.user.id;

        // Verificar se o usuário é do tipo restaurante
        const userResponse = await fetch(`/api/user?id=${userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();

          if (userData.role !== "restaurante") {
            console.warn("Usuário não é do tipo restaurante");
            return;
          }

          // Buscar dados do restaurante
          const restauranteResponse = await fetch(
            `/api/restaurante?user_id=${userId}`,
          );
          if (restauranteResponse.ok) {
            const restauranteData = await restauranteResponse.json();
            setRestauranteId(restauranteData.id);
          } else {
            console.error("Restaurante não encontrado para este usuário");
          }
        } else {
          console.error("Erro ao buscar dados do usuário");
        }
      } else {
        console.warn("Usuário não está logado ou sessão inválida");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setCarregando(false);
    }
  };

  // Carregar itens do restaurante
  const carregarItens = async () => {
    if (!restauranteId) return;

    try {
      setCarregando(true);
      const response = await fetch(
        `/api/item?restaurante_id=${restauranteId}`,
      );

      if (response.ok) {
        const data = await response.json();

        // Para cada item, formatá-lo corretamente
        const itensFormatados = data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          preco_unitario: item.preco_unitario,
          descricao: item.descricao || "",
          foto: item.foto,
          categoria_id: item.categoria_id,
        }));

        setItens(itensFormatados);
      } else {
        console.error("Erro ao carregar itens");
        alert("Erro ao carregar lista de itens.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão ao carregar itens.");
    } finally {
      setCarregando(false);
    }
  };

  // Carregar categorias do restaurante
  const carregarCategorias = async () => {
    if (!restauranteId) return;

    try {
      setCarregando(true);
      const response = await fetch(
        `/api/categoria?restaurante_id=${restauranteId}`,
      );

      if (response.ok) {
        const data = await response.json();

        // Para cada categoria, formatá-la corretamente
        const categoriasFormatadas = data.map((cat: any) => ({
          id: cat.id,
          nome: cat.nome,
          restaurante_id: cat.restaurante_id,
        }));

        setCategorias(categoriasFormatadas);
      } else {
        console.error("Erro ao carregar categorias");
        alert("Erro ao carregar lista de categorias.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão ao carregar categorias.");
    } finally {
      setCarregando(false);
    }
  };

  // Adicionar novo item
  const adicionarItem = async (dadosItem?: NovoItem) => {
    // Se dados foram passados como parâmetro, usar eles; senão usar o estado
    const itemData = dadosItem || novoItem;
    
    console.log("🔍 Hook adicionarItem - Dados recebidos:", itemData);
    
    // Verificar se o usuário está logado e é um restaurante
    const sessionData = await authClient.getSession();
    if (!sessionData?.data?.user?.id) {
      alert("Erro: Usuário não está logado. Faça login novamente.");
      return;
    }

    const userResponse = await fetch(
      `/api/user?id=${sessionData.data.user.id}`,
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      if (userData.role !== "restaurante") {
        alert("Acesso negado: Apenas restaurantes podem gerenciar itens.");
        return;
      }
    } else {
      alert("Erro ao verificar permissões do usuário.");
      return;
    }

    // Validações básicas - usando os dados passados ou do estado
    if (!restauranteId) {
      alert("Erro: Restaurante não identificado. Recarregue a página.");
      return;
    }

    if (!itemData.nome.trim()) {
      console.log("❌ Hook: Nome vazio:", itemData.nome);
      alert("Nome é obrigatório.");
      return;
    }

    if (!itemData.preco_unitario.trim()) {
      console.log("❌ Hook: Preço vazio:", itemData.preco_unitario);
      alert("Preço é obrigatório.");
      return;
    }

    if (!itemData.categoria_id) {
      console.log("❌ Hook: Categoria vazia:", itemData.categoria_id);
      alert("Categoria é obrigatória.");
      return;
    }

    if (!itemData.foto.trim()) {
      console.log("❌ Hook: Foto vazia:", itemData.foto);
      alert("Foto é obrigatória.");
      return;
    }

    try {
      setCarregando(true);

      console.log("🔍 Hook: Enviando dados para API:", itemData);

      // Criar item
      const criarItemResult = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: itemData.nome,
          preco_unitario: itemData.preco_unitario,
          descricao: itemData.descricao,
          foto: itemData.foto,
          categoria_id: itemData.categoria_id,
        }),
      });

      if (!criarItemResult.ok) {
        const errorData = await criarItemResult.json();
        throw new Error(errorData.message || "Erro ao criar item");
      }

      console.log("✅ Hook: Item criado com sucesso");

      // Recarregar ambas as listas para garantir sincronização
      await carregarItens();
      await carregarCategorias();
      
      // Só executa se tudo acima deu certo
      setNovoItem({
        nome: "",
        preco_unitario: "",
        descricao: "",
        foto: "",
        categoria_id: "",
      });
      alert("Item adicionado com sucesso!");
      return true; // Indicar sucesso
    } catch (error) {
      console.error("❌ Hook: Erro ao adicionar item:", error);
      alert(
        `Erro ao adicionar item: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
      return false; // Indicar falha
    } finally {
      setCarregando(false);
    }
  };

  // Excluir item
  const excluirItem = async (id: string) => {
    const item = itens.find((i) => i.id === id);
    if (!item) {
      alert("Item não encontrado.");
      return;
    }

    const confirmacao = confirm(
      `Tem certeza que deseja excluir o item ${item.nome}?\n\nEsta ação não pode ser desfeita.`,
    );

    if (!confirmacao) return;

    try {
      setCarregando(true);

      // Excluir item
      const itemResponse = await fetch(`/api/item?id=${id}`, {
        method: "DELETE",
      });

      if (!itemResponse.ok) {
        throw new Error("Erro ao excluir item");
      }

      // Recarregar ambas as listas para garantir sincronização
      await carregarItens();
      await carregarCategorias();
      alert("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      alert(
        `Erro ao excluir item: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  // Iniciar edição
  const iniciarEdicao = (item: Item) => {
    setEditandoId(item.id);
    setDadosEdicao({
      nome: item.nome,
      preco_unitario: item.preco_unitario,
      descricao: item.descricao || "",
      foto: item.foto,
      categoria_id: item.categoria_id,
    });
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setDadosEdicao({
      nome: "",
      preco_unitario: "",
      descricao: "",
      foto: "",
      categoria_id: "",
    });
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!editandoId) return;

    // Validações
    if (!dadosEdicao.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    if (!dadosEdicao.preco_unitario.trim()) {
      alert("Preço é obrigatório.");
      return;
    }

    if (!dadosEdicao.categoria_id) {
      alert("Categoria é obrigatória.");
      return;
    }

    if (!dadosEdicao.foto.trim()) {
      alert("Foto é obrigatória.");
      return;
    }

    const itemAtual = itens.find((i) => i.id === editandoId);
    if (!itemAtual) {
      alert("Item não encontrado.");
      return;
    }

    try {
      setCarregando(true);

      // Atualizar dados do item
      const response = await fetch(`/api/item?id=${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editandoId,
          nome: dadosEdicao.nome,
          preco_unitario: dadosEdicao.preco_unitario,
          descricao: dadosEdicao.descricao,
          foto: dadosEdicao.foto,
          categoria_id: dadosEdicao.categoria_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do item");
      }

      cancelarEdicao();
      // Recarregar ambas as listas para garantir sincronização
      await carregarItens();
      await carregarCategorias();
      alert("Item atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      alert(
        `Erro ao atualizar item: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  return {
    // Estados
    itens,
    categorias,
    novoItem,
    setNovoItem,
    carregando,
    editandoId,
    dadosEdicao,
    setDadosEdicao,
    restauranteId,

    // Funções
    adicionarItem,
    excluirItem,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    carregarItens,
    carregarCategorias,
  };
}

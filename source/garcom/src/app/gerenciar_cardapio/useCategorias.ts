import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Categoria, NovaCategoria, DadosEdicao } from "./types";

export function useCategorias() {
  // Estados para gerenciar categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState<NovaCategoria>({
    nome: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [restauranteId, setRestauranteId] = useState<string | null>(null);

  // Estados para edição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [dadosEdicao, setDadosEdicao] = useState<DadosEdicao>({
    nome: "",
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

  // Carregar funcionários quando tiver o restaurante_id
  useEffect(() => {
    if (restauranteId) {
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
          descricao: cat.descricao || "",
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

  // Adicionar nova categoria
  const adicionarCategoria = async () => {
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
        alert("Acesso negado: Apenas restaurantes podem gerenciar categorias.");
        return;
      }
    } else {
      alert("Erro ao verificar permissões do usuário.");
      return;
    }

    // Validações básicas
    if (!restauranteId) {
      alert("Erro: Restaurante não identificado. Recarregue a página.");
      return;
    }

    if (!novaCategoria.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    try {
      setCarregando(true);

      // 1. Criar categoria
      const criarCategoriaResult = await fetch("/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: novaCategoria.nome,
        }),
      });

      if (!criarCategoriaResult.ok) {
        const errorData = await criarCategoriaResult.json();
        throw new Error(errorData.message || "Erro ao criar categoria");
      }

      const categoriaData = await criarCategoriaResult.json();
      const categoriaId = categoriaData.id;

      if (!categoriaId) {
        throw new Error("ID da categoria não foi retornado pelo sistema");
      }
      // // 2. Associar categoria ao restaurante
      // const associarCategoriaResult = await fetch("/api/restaurante_categoria", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     restaurante_id: restauranteId,
      //     categoria_id: categoriaId,
      //   }),
      // });

      // 3. Criar registro da categoria
      const categoriaResponse = await fetch("/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoria_id: categoriaId,
          restaurante_id: restauranteId,
        }),
      });

      if (!categoriaResponse.ok) {
        // Se falhar, tentar excluir a categoria criada
        await fetch(`/api/categoria?id=${categoriaId}`, { method: "DELETE" });
        throw new Error("Erro ao criar registro da categoria");
      }

      // Só executa se tudo acima deu certo
      setNovaCategoria({ nome: "" });
      await carregarCategorias();
      alert("Categoria adicionada com sucesso!");
      return; // <-- Adicione esse return para garantir que nada mais será executado
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      alert(
        `Erro ao adicionar categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
      return; // <-- Adicione esse return para garantir que nada mais será executado
    } finally {
      setCarregando(false);
    }
  };

  // Excluir categoria
  const excluirCategoria = async (id: string) => {
    const categoria = categorias.find((c) => c.id === id);
    if (!categoria) {
      alert("Categoria não encontrada.");
      return;
    }

    const confirmacao = confirm(
      `Tem certeza que deseja excluir a categoria ${categoria.nome}?\n\nEsta ação não pode ser desfeita e irá:\n- Remover a categoria do restaurante\n- Excluir todos os dados relacionados`,
    );

    if (!confirmacao) return;

    try {
      setCarregando(true);

      // 1. Excluir registro da categoria
      const categoriaResponse = await fetch(`/api/categoria?id=${id}`, {
        method: "DELETE",
      });

      if (!categoriaResponse.ok) {
        throw new Error("Erro ao excluir registro da categoria");
      }

      // 2. Excluir usuário (remove sessões e contas relacionadas)
      //   const userResponse = await fetch(`/api/user?id=${funcionario.user_id}`, {
      //     method: "DELETE",
      //   });

      //   if (!userResponse.ok) {
      //     console.warn("Erro ao excluir usuário, mas funcionário foi removido");
      //   }

      await carregarCategorias();
      alert("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert(
        `Erro ao excluir categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  // Iniciar edição
  const iniciarEdicao = (categoria: Categoria) => {
    setEditandoId(categoria.id);
    setDadosEdicao({
      nome: categoria.nome,
    });
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setDadosEdicao({ nome: "" });
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!editandoId) return;

    // Validações
    if (!dadosEdicao.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    const categoriaAtual = categorias.find((c) => c.id === editandoId);
    if (!categoriaAtual) {
      alert("Categoria não encontrada.");
      return;
    }

    try {
      setCarregando(true);

      // 1. Atualizar dados da categoria
      const response = await fetch(`/api/categoria?id=${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editandoId,
          nome: dadosEdicao.nome,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados da categoria");
      }

      cancelarEdicao();
      await carregarCategorias();
      alert("Categoria atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      alert(
        `Erro ao atualizar categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  return {
    // Estados
    categorias,
    novaCategoria,
    setNovaCategoria,
    carregando,
    editandoId,
    dadosEdicao,
    setDadosEdicao,
    restauranteId,

    // Funções
    adicionarCategoria,
    excluirCategoria,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    carregarCategorias,
  };
}

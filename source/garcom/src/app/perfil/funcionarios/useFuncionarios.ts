import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Funcionario, NovoFuncionario, DadosEdicao } from "./types";

export function useFuncionarios() {
  // Estados para gerenciar funcionários
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [novoFuncionario, setNovoFuncionario] = useState<NovoFuncionario>({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [restauranteId, setRestauranteId] = useState<string | null>(null);

  // Estados para edição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [dadosEdicao, setDadosEdicao] = useState<DadosEdicao>({
    nome: "",
    email: "",
    cpf: "",
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
      carregarFuncionarios();
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

  // Carregar funcionários do restaurante
  const carregarFuncionarios = async () => {
    if (!restauranteId) return;

    try {
      setCarregando(true);
      const response = await fetch(
        `/api/funcionario?restaurante_id=${restauranteId}`,
      );

      if (response.ok) {
        const data = await response.json();

        // Para cada funcionário, buscar os dados do usuário
        const funcionariosCompletos = await Promise.all(
          data.map(async (func: any) => {
            try {
              const userResponse = await fetch(`/api/user?id=${func.user_id}`);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                  id: func.id,
                  nome: userData.name,
                  email: userData.email,
                  cpf: func.cpf,
                  user_id: func.user_id,
                  restaurante_id: func.restaurante_id,
                };
              } else {
                // Se não encontrar o usuário, usar dados padrão
                return {
                  id: func.id,
                  nome: `Funcionário ${func.id.slice(0, 8)}`,
                  email: `funcionario${func.id.slice(0, 4)}@email.com`,
                  cpf: func.cpf,
                  user_id: func.user_id,
                  restaurante_id: func.restaurante_id,
                };
              }
            } catch (error) {
              console.error("Erro ao buscar dados do usuário:", error);
              return {
                id: func.id,
                nome: `Funcionário ${func.id.slice(0, 8)}`,
                email: `funcionario${func.id.slice(0, 4)}@email.com`,
                cpf: func.cpf,
                user_id: func.user_id,
                restaurante_id: func.restaurante_id,
              };
            }
          }),
        );

        setFuncionarios(funcionariosCompletos);
      } else {
        console.error("Erro ao carregar funcionários");
        alert("Erro ao carregar lista de funcionários.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão ao carregar funcionários.");
    } finally {
      setCarregando(false);
    }
  };

  // Validar CPF (apenas números)
  const validarCpf = (cpf: string): boolean => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpfLimpo.length === 11 && /^\d+$/.test(cpfLimpo);
  };

  // Verificar se email já existe no restaurante
  const verificarEmailUnico = async (
    email: string,
    excluirId?: string,
  ): Promise<boolean> => {
    const funcionarioComEmail = funcionarios.find(
      (f) =>
        f.email.toLowerCase() === email.toLowerCase() && f.id !== excluirId,
    );
    return !funcionarioComEmail;
  };

  // Verificar se CPF já existe no restaurante
  const verificarCpfUnico = async (
    cpf: string,
    excluirId?: string,
  ): Promise<boolean> => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    const funcionarioComCpf = funcionarios.find(
      (f) =>
        f.cpf.replace(/\D/g, "") === cpfLimpo && f.id !== excluirId,
    );
    return !funcionarioComCpf;
  };

  // Adicionar novo funcionário
  const adicionarFuncionario = async () => {
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
        alert(
          "Acesso negado: Apenas restaurantes podem gerenciar funcionários.",
        );
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

    if (!novoFuncionario.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    if (!novoFuncionario.email.trim()) {
      alert("Email é obrigatório.");
      return;
    }

    if (!novoFuncionario.cpf.trim()) {
      alert("CPF é obrigatório.");
      return;
    }

    if (!novoFuncionario.senha.trim()) {
      alert("Senha é obrigatória.");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoFuncionario.email)) {
      alert("Email deve ter um formato válido.");
      return;
    }

    // Validar CPF
    if (!validarCpf(novoFuncionario.cpf)) {
      alert("CPF deve conter exatamente 11 dígitos numéricos.");
      return;
    }

    // Validar senha
    if (novoFuncionario.senha.length < 8) {
      alert("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    // Verificar email único no restaurante
    const emailUnico = await verificarEmailUnico(novoFuncionario.email);
    if (!emailUnico) {
      alert("Email já está em uso por outro funcionário deste restaurante.");
      return;
    }

    // Verificar CPF único no restaurante
    const cpfUnico = await verificarCpfUnico(novoFuncionario.cpf);
    if (!cpfUnico) {
      alert("CPF já está em uso por outro funcionário deste restaurante.");
      return;
    }

    try {
      setCarregando(true);

      // 1. Criar usuário via better-auth
      const signUpResult = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: novoFuncionario.email,
          password: novoFuncionario.senha,
          name: novoFuncionario.nome,
          autoSignIn: false,
          callbackURL: null,
        }),
      });

      if (!signUpResult.ok) {
        const errorData = await signUpResult.json();
        throw new Error(errorData.message || "Erro ao criar usuário");
      }

      const signUpData = await signUpResult.json();
      const userId =
        signUpData.id || signUpData.user?.id || signUpData.data?.user?.id;

      if (!userId) {
        throw new Error(
          "ID do usuário não foi retornado pelo sistema de autenticação",
        );
      }

      // 2. Atualizar role do usuário para "funcionario"
      const updateRoleResponse = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          role: "funcionario",
        }),
      });

      if (!updateRoleResponse.ok) {
        // Se falhar, tentar excluir o usuário criado
        await fetch(`/api/user?id=${userId}`, { method: "DELETE" });
        throw new Error("Erro ao definir role do usuário como funcionário");
      }

      // 3. Criar registro do funcionário
      const funcionarioResponse = await fetch("/api/funcionario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          cpf: novoFuncionario.cpf.replace(/\D/g, ""),
          restaurante_id: restauranteId,
        }),
      });

      if (!funcionarioResponse.ok) {
        // Se falhar, tentar excluir o usuário criado
        await fetch(`/api/user?id=${userId}`, { method: "DELETE" });
        throw new Error("Erro ao criar registro do funcionário");
      }

      // Só executa se tudo acima deu certo
      setNovoFuncionario({ nome: "", email: "", cpf: "", senha: "" });
      await carregarFuncionarios();
      alert("Funcionário adicionado com sucesso!");
      return; // <-- Adicione esse return para garantir que nada mais será executado
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert(
        `Erro ao adicionar funcionário: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
      return; // <-- Adicione esse return para garantir que nada mais será executado
    } finally {
      setCarregando(false);
    }
  };

  // Excluir funcionário
  const excluirFuncionario = async (id: string) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    if (!funcionario) {
      alert("Funcionário não encontrado.");
      return;
    }

    const confirmacao = confirm(
      `Tem certeza que deseja excluir o funcionário ${funcionario.nome}?\n\nEsta ação não pode ser desfeita e irá:\n- Remover o acesso do funcionário ao sistema\n- Excluir todos os dados relacionados`,
    );

    if (!confirmacao) return;

    try {
      setCarregando(true);

      // 1. Excluir registro do funcionário
      const funcionarioResponse = await fetch(`/api/funcionario?id=${id}`, {
        method: "DELETE",
      });

      if (!funcionarioResponse.ok) {
        throw new Error("Erro ao excluir registro do funcionário");
      }

      // 2. Excluir usuário (remove sessões e contas relacionadas)
      const userResponse = await fetch(`/api/user?id=${funcionario.user_id}`, {
        method: "DELETE",
      });

      if (!userResponse.ok) {
        console.warn("Erro ao excluir usuário, mas funcionário foi removido");
      }

      await carregarFuncionarios();
      alert("Funcionário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert(
        `Erro ao excluir funcionário: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  // Iniciar edição
  const iniciarEdicao = (funcionario: Funcionario) => {
    setEditandoId(funcionario.id);
    setDadosEdicao({
      nome: funcionario.nome,
      email: funcionario.email,
      cpf: funcionario.cpf,
    });
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setDadosEdicao({ nome: "", email: "", cpf: "" });
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!editandoId) return;

    // Validações
    if (!dadosEdicao.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    if (!dadosEdicao.email.trim()) {
      alert("Email é obrigatório.");
      return;
    }

    if (!dadosEdicao.cpf.trim()) {
      alert("CPF é obrigatório.");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosEdicao.email)) {
      alert("Email deve ter um formato válido.");
      return;
    }

    // Validar CPF
    if (!validarCpf(dadosEdicao.cpf)) {
      alert("CPF deve conter exatamente 11 dígitos numéricos.");
      return;
    }

    // Verificar email único no restaurante (excluindo o funcionário atual)
    const emailUnico = await verificarEmailUnico(dadosEdicao.email, editandoId);
    if (!emailUnico) {
      alert("Email já está em uso por outro funcionário deste restaurante.");
      return;
    }

    // Verificar CPF único no restaurante (excluindo o funcionário atual)
    const cpfUnico = await verificarCpfUnico(dadosEdicao.cpf, editandoId);
    if (!cpfUnico) {
      alert("CPF já está em uso por outro funcionário deste restaurante.");
      return;
    }

    const funcionarioAtual = funcionarios.find((f) => f.id === editandoId);
    if (!funcionarioAtual) {
      alert("Funcionário não encontrado.");
      return;
    }

    try {
      setCarregando(true);

      // 1. Atualizar dados do usuário
      const userResponse = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: funcionarioAtual.user_id,
          name: dadosEdicao.nome,
          email: dadosEdicao.email,
        }),
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao atualizar dados do usuário");
      }

      // 2. Atualizar CPF do funcionário
      const funcionarioResponse = await fetch("/api/funcionario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editandoId,
          cpf: dadosEdicao.cpf.replace(/\D/g, ""), // Salvar apenas números
        }),
      });

      if (!funcionarioResponse.ok) {
        throw new Error("Erro ao atualizar CPF do funcionário");
      }

      cancelarEdicao();
      await carregarFuncionarios();
      alert("Funcionário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert(
        `Erro ao atualizar funcionário: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setCarregando(false);
    }
  };

  return {
    // Estados
    funcionarios,
    novoFuncionario,
    setNovoFuncionario,
    carregando,
    editandoId,
    dadosEdicao,
    setDadosEdicao,
    restauranteId,

    // Funções
    adicionarFuncionario,
    excluirFuncionario,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    carregarFuncionarios,
  };
}

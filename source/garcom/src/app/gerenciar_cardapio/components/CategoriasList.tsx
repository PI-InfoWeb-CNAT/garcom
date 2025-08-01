"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

type Categoria = {
  id: string;
  nome: string;
  restaurante_id: string;
};

interface CategoriasListProps {
  categoriasIniciais: Categoria[];
  restauranteId: string | null;
}

export default function CategoriasList({
  categoriasIniciais,
  restauranteId,
}: CategoriasListProps) {
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);
  const [novaCategoria, setNovaCategoria] = useState<string>("");
  const [carregando, setCarregando] = useState(false);

  // Estados para edição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditando, setNomeEditando] = useState<string>("");

  // Função para adicionar categoria
  const adicionarCategoria = async () => {
    if (!novaCategoria.trim() || !restauranteId) {
      alert("Nome da categoria é obrigatório!");
      return;
    }

    try {
      setCarregando(true);
      const response = await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novaCategoria.trim(),
          restaurante_id: restauranteId,
        }),
      });

      if (response.ok) {
        const novaCategoriaCriada = await response.json();
        setCategorias((prev) => [...prev, novaCategoriaCriada]);
        setNovaCategoria(""); // Limpar input
        alert("Categoria adicionada com sucesso!");
      } else {
        alert("Erro ao adicionar categoria");
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      alert("Erro ao adicionar categoria");
    } finally {
      setCarregando(false);
    }
  };

  // Função para iniciar edição
  const iniciarEdicao = (categoria: Categoria) => {
    setEditandoId(categoria.id);
    setNomeEditando(categoria.nome);
  };

  // Função para salvar edição - COM DEBUG
  const salvarEdicao = async () => {
    console.log("🔍 Debug - Salvando edição:");
    console.log("   - editandoId:", editandoId);
    console.log("   - nomeEditando:", nomeEditando);
    console.log("   - restauranteId:", restauranteId);

    if (!nomeEditando.trim()) {
      alert("Nome da categoria é obrigatório!");
      return;
    }

    if (!editandoId) {
      alert("Erro: ID da categoria não encontrado!");
      return;
    }

    try {
      setCarregando(true);

      const dadosAtualizacao = {
        nome: nomeEditando.trim(),
        restaurante_id: restauranteId,
      };

      console.log("📡 Dados sendo enviados:", dadosAtualizacao);
      console.log("📡 URL da requisição:", `/api/categorias/${editandoId}`);

      const response = await fetch(`/api/categorias/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizacao),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (response.ok) {
        const categoriaAtualizada = await response.json();
        console.log("✅ Categoria atualizada recebida:", categoriaAtualizada);

        setCategorias((prev) => {
          const novaLista = prev.map((cat) =>
            cat.id === editandoId ? categoriaAtualizada : cat,
          );
          console.log("✅ Lista atualizada:", novaLista);
          return novaLista;
        });

        cancelarEdicao();
        alert("Categoria atualizada com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("❌ Erro na resposta:", errorText);
        alert(`Erro ao atualizar categoria: ${errorText}`);
      }
    } catch (error) {
      console.error("❌ Erro na requisição:", error);
      alert(
        `Erro de conexão: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`,
      );
    } finally {
      setCarregando(false);
    }
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditando("");
  };

  // Função para excluir categoria
  const excluirCategoria = async (id: string) => {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;

    try {
      setCarregando(true);
      const response = await fetch(`/api/categorias/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategorias((prev) => prev.filter((cat) => cat.id !== id));
        alert("Categoria excluída com sucesso!");
      } else {
        alert("Erro ao excluir categoria");
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Erro ao excluir categoria");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      {/* Formulário para adicionar categoria */}
      <div className="mb-5 min-w-full flex flex-row items-center justify-betweenc">
        <Input
          placeholder="Adicionar nova categoria"
          className="h-12 min-h-[48px] rounded-4xl border-0 bg-[#EFEFEF] px-4 py-3 text-left text-lg font-semibold text-gray-700 focus:ring-0 focus:outline-none"
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              adicionarCategoria();
            }
          }}
          disabled={carregando}
        />
        <button
          className="ml-3 cursor-pointer"
          onClick={adicionarCategoria}
          disabled={!novaCategoria.trim() || carregando}
        >
          <img className="h-8 w-8" src="/add.svg" alt="Adicionar" />
        </button>
      </div>

      {/* Lista de categorias */}
      <ul className="w-full list-disc pl-5 marker:text-red-400">
        {carregando ? (
          <li>Carregando...</li>
        ) : categorias.length > 0 ? (
          categorias.map((categoria) => (
            <li key={categoria.id} className="mb-5">
              {editandoId === categoria.id ? (
                // Modo de edição
                <div className="flex items-center gap-2 rounded-2xl border-1 p-3">
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
                    className="flex-1 border-0 bg-transparent"
                    autoFocus
                    disabled={carregando}
                  />
                  <button
                    onClick={salvarEdicao}
                    className="rounded-2xl bg-[#FFE3CF] px-3 py-1 text-sm text-[#E55F4B] hover:bg-[#e6cdbd]"
                    disabled={carregando || !nomeEditando.trim()}
                  >
                    {carregando ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    onClick={cancelarEdicao}
                    className="rounded-2xl bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                    disabled={carregando}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                // Modo de visualização
                <div className="flex items-center justify-between">
                  <span>{categoria.nome}</span>
                  <div className="ml-4 flex gap-2">
                    <button
                      onClick={() => iniciarEdicao(categoria)}
                      className="text-sm text-blue-500 hover:text-blue-700"
                      disabled={carregando}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirCategoria(categoria.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                      disabled={carregando}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="mb-5">Nenhuma categoria encontrada</li>
        )}
      </ul>
    </div>
  );
}

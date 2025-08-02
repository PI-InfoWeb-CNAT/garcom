"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Categoria } from "../types";
import { ListaCategorias } from "../ListaCategorias";

interface CategoriasListProps {
  categoriasIniciais?: Categoria[];
  restauranteId?: string;
  onCategoriasChange?: () => void; // Callback para notificar mudanças
}

const CategoriasList = ({ 
  categoriasIniciais = [], 
  restauranteId, 
  onCategoriasChange 
}: CategoriasListProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [dadosEdicao, setDadosEdicao] = useState({ nome: "" });

  // Atualizar categorias quando as iniciais mudarem
  useEffect(() => {
    console.log("🔍 Categorias iniciais atualizadas:", categoriasIniciais);
    if (categoriasIniciais.length > 0) {
      setCategorias(categoriasIniciais);
    }
  }, [categoriasIniciais]);

  // Carregar categorias
  const carregarCategorias = async () => {
    if (!restauranteId) {
      console.log("❌ Sem restauranteId para carregar categorias");
      return;
    }

    try {
      setCarregando(true);
      console.log("🔍 Carregando categorias para restaurante:", restauranteId);
      
      const response = await fetch(`/api/categoria?restaurante_id=${restauranteId}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Categorias carregadas:", data);
        setCategorias(data);
      } else {
        const errorText = await response.text();
        console.error("❌ Erro ao carregar categorias:", response.status, errorText);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar categorias:", error);
    } finally {
      setCarregando(false);
    }
  };

  const addCategoria = async () => {
    if (!novaCategoria.trim() || !restauranteId) {
      console.log("❌ Dados inválidos para adicionar categoria");
      return;
    }

    try {
      setCarregando(true);
      console.log("🔍 Adicionando categoria:", novaCategoria.trim());
      
      const response = await fetch("/api/categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novaCategoria.trim(),
          restaurante_id: restauranteId,
        }),
      });

      if (response.ok) {
        const novaCategoriaCriada = await response.json();
        console.log("✅ Categoria criada:", novaCategoriaCriada);
        setNovaCategoria("");
        // Recarregar as categorias para garantir sincronização
        await carregarCategorias();
        // Notificar o componente pai sobre a mudança
        if (onCategoriasChange) {
          onCategoriasChange();
        }
      } else {
        const errorText = await response.text();
        console.error("❌ Erro ao adicionar categoria:", response.status, errorText);
        alert("Erro ao adicionar categoria");
      }
    } catch (error) {
      console.error("❌ Erro ao adicionar categoria:", error);
      alert("Erro ao adicionar categoria");
    } finally {
      setCarregando(false);
    }
  };

  const iniciarEdicao = (categoria: Categoria) => {
    console.log("🔍 Iniciando edição da categoria:", categoria);
    setEditandoId(categoria.id);
    setDadosEdicao({ nome: categoria.nome });
  };

  const salvarEdicao = async () => {
    if (!editandoId || !dadosEdicao.nome.trim()) {
      console.log("❌ Dados inválidos para salvar edição");
      alert("Nome da categoria não pode estar vazio");
      return;
    }

    try {
      setCarregando(true);
      console.log("🔍 Salvando edição categoria:", editandoId, dadosEdicao.nome);
      
      const response = await fetch(`/api/categoria`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: editandoId,
          nome: dadosEdicao.nome.trim() 
        }),
      });

      if (response.ok) {
        const resultado = await response.json();
        console.log("✅ Categoria atualizada:", resultado);
        
        cancelarEdicao();
        // Recarregar as categorias para garantir sincronização
        await carregarCategorias();
        // Notificar o componente pai sobre a mudança
        if (onCategoriasChange) {
          onCategoriasChange();
        }
        
        // Mostrar feedback de sucesso
        alert("Categoria atualizada com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("❌ Erro ao atualizar categoria:", response.status, errorText);
        alert(`Erro ao atualizar categoria: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar categoria:", error);
      alert("Erro ao atualizar categoria");
    } finally {
      setCarregando(false);
    }
  };

  const cancelarEdicao = () => {
    console.log("🔍 Cancelando edição");
    setEditandoId(null);
    setDadosEdicao({ nome: "" });
  };

  const excluirCategoria = async (id: string) => {
    try {
      setCarregando(true);
      console.log("🔍 Excluindo categoria:", id);
      
      const response = await fetch(`/api/categoria?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const resultado = await response.json();
        console.log("✅ Categoria excluída:", resultado);
        alert("Categoria excluída com sucesso!");
        // Recarregar a página para atualizar todos os dados
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error("❌ Erro ao excluir categoria:", response.status, errorText);
        alert("Erro ao excluir categoria");
      }
    } catch (error) {
      console.error("❌ Erro ao excluir categoria:", error);
      alert("Erro ao excluir categoria");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      {/* Input para adicionar nova categoria */}
      <div className="mb-5 flex flex-row items-center justify-between">
        <Input
          placeholder="Adicionar nova categoria"
          className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCategoria();
            }
          }}
          disabled={carregando}
        />
        <button 
          className="cursor-pointer disabled:opacity-50" 
          onClick={addCategoria}
          disabled={carregando || !novaCategoria.trim()}
          title="Adicionar categoria"
        >
          <img
            className="ml-0.5 h-fit w-fit"
            src="/add.svg"
            alt="Adicionar"
          />
        </button>
      </div>

      {/* Lista de categorias */}
      <ListaCategorias
        categorias={categorias}
        carregando={carregando}
        editandoId={editandoId}
        dadosEdicao={dadosEdicao}
        setDadosEdicao={setDadosEdicao}
        onIniciarEdicao={iniciarEdicao}
        onSalvarEdicao={salvarEdicao}
        onCancelarEdicao={cancelarEdicao}
        onExcluir={excluirCategoria}
      />
    </div>
  );
};

export default CategoriasList;

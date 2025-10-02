"use client";
import { useState, useEffect } from "react";
import { Mesa } from "./types";

export function useMesas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarMesas = async () => {
    try {
      setCarregando(true);
      setErro(null);

      // Usar a rota existente /api/mesa
      const response = await fetch("/api/mesa");

      if (!response.ok) {
        throw new Error("Erro ao buscar mesas");
      }

      const data = await response.json();
      setMesas(data);
    } catch (error) {
      console.error("Erro ao buscar mesas:", error);
      setErro("Erro ao carregar as mesas");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarMesas();
  }, []);

  return {
    mesas,
    carregando,
    erro,
    recarregar: buscarMesas,
  };
}

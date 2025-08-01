'use client'

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EditarPerfilForm } from "./editar-perfil-form";

const atualizarConta = async (dados: any) => {
  const res = await fetch('/api/restaurante', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar conta');
  }

  return await res.json();
};

interface DadosUsuario {
  session: any;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
  role: string;
  roleData: any;
}

export default function EditarPerfilPage() {
  const [dados, setDados] = useState<DadosUsuario | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await fetch("/api/dados"); 
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const json = await res.json();
        setDados(json);
      } catch (err: any) {
        setErro(err.message);
        console.error(err);
      }
    };

    fetchDados();
  }, []);

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  return (
    <div>
      <Header />
      <main className={mainClass}>
        <h1 className={tituloClass}>Editar Restaurante</h1>
        {erro && <p className="text-red-500">Erro: {erro}</p>}
        {dados && (
          <EditarPerfilForm
            restauranteId={dados.roleData.id}
            dadosIniciais={dados.roleData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
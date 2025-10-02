'use client'

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EditarPerfilForm } from "./editar-perfil-form";
import { Progress } from "@/components/ui/progress";

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
  const [carregando, setCarregando] = useState(true);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const fetchDados = async () => {
      setCarregando(true);
      setProgress(10);
      const timer = setTimeout(() => setProgress(80), 400);
      try {
        const res = await fetch("/api/dados", { credentials: "include" });
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const json = await res.json();
        setDados(json);
      } catch (err: any) {
        setErro(err.message);
        console.error(err);
      } finally {
        setTimeout(() => setCarregando(false), 800); // tempo mínimo de loading
      }
      return () => clearTimeout(timer);
    };

    fetchDados();
  }, []);

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  return (
    <div>
      <Header />
      <main className={mainClass}>
        
        {carregando ? (
          <div className="w-full h-[70vh] text-center flex flex-col items-center justify-center">
            <h1 className={tituloClass}>Carregando</h1>
            <Progress value={progress} className="w-[70%] mx-auto" />
          </div>
        ) : (
          <>
            {erro && <p className="text-red-500">Erro: {erro}</p>}
            {dados && (
              <>
                <h1 className={tituloClass}>Editar Restaurante</h1>
                <EditarPerfilForm
                  restauranteId={dados.roleData.id}
                  dadosIniciais={dados.roleData}
                />
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EditarPerfilForm } from "./editar-perfil-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { getDados } from "@/app/auth/getDados/page";

const schema = z
  .object({
    nome: z.string().min(2),
    cnpj: z.string().min(11),
    descricao: z.string().optional(),
    email: z.string().email(),
    senha: z.string().min(6),
    confirmarSenha: z.string().min(6),
  });

type FormData = z.infer<typeof schema>;

const editarPerfil = async () => {
   const dados = await getDados();

  if (!dados || dados.role !== "restaurante") {
    return <div>Usuário não autorizado ou dados não encontrados.</div>;
  }

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  return (
    <div>
      <Header />
      <main className={mainClass}>
        <h1 className={tituloClass}>Editar Restaurante</h1>
        <EditarPerfilForm
      restauranteId={dados.roleData.id}
      dadosIniciais={dados.roleData}
    />
      </main>
      <Footer />
    </div>
  );
}
export default editarPerfil;
'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EditarPerfilForm } from "./editar-perfil-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

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

export default function editarPerfil() {
  const { data: session } = authClient.useSession();
  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  return (
    <div>
      <Header />
      <main className={mainClass}>
        <h1 className={tituloClass}>Editar Restaurante</h1>
        {session?.user?.id && (
          <EditarPerfilForm restauranteId={session.user.id} />
        )}
      </main>
      <Footer />
    </div>
  );
}
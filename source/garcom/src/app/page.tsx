import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutForm from "@/app/auth/components/logout-form";


const HomeLayout = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tituloClass = "text-[23px] font-bold mb-6 text-[#E55F4B]";
  const mainClass =
    "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0";

  let extraData = null;
  let extraTitle = null;

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
  }

  if (session?.user?.id && baseUrl) {
    try {
      const userRes = await fetch(`${baseUrl}/api/user?id=${session.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userRes.ok) {
        const user = await userRes.json();

        if (user.role === "restaurante") {
          const res = await fetch(
            `${baseUrl}/api/restaurante?user_id=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (res.ok) {
            const restaurante = await res.json();
            extraTitle = "Dados do restaurante";
            extraData = (
              <div className="text-center">
                <p>
                  <b>Nome:</b> {restaurante.nome}
                </p>
                <p>
                  <b>CNPJ:</b> {restaurante.cnpj}
                </p>
                <p>
                  <b>Descrição:</b> {restaurante.descricao}
                </p>
              </div>
            );
          }
        } else if (user.role === "funcionario") {
          const res = await fetch(
            `${baseUrl}/api/funcionario?user_id=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (res.ok) {
            const funcionario = await res.json();
            extraTitle = "Dados do funcionário";
            extraData = (
              <div className="text-center">
                <p>
                  <b>Nome:</b> {funcionario.nome}
                </p>
                <p>
                  <b>Cargo:</b> {funcionario.cargo}
                </p>
              </div>
            );
          }
        }
      }
    } catch (e) {
      console.error("Erro ao buscar dados do usuário:", e);
    }
  }

  return (
    <div>
      <Header />

      <main className={mainClass}>
        <h1 className={tituloClass}>Botoes do shadcn com tempero do kill</h1>
        <div className="flex items-center justify-center gap-4 flex-wrap ">

          <Button className="w-40" variant="rosa">
            Confirmar pedido
          </Button>
          <Button className="w-40" variant="branco">
            Editar Perfil
          </Button>
          <Button className="w-40" variant="amarelo">
            Bater no chefe
          </Button>
          <Button className="w-40" variant="laranja">
            Calabraso
          </Button>
        </div>

        {session && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <h1 className={tituloClass}>Dados do usuário logado</h1>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <p>{session.user.id}</p>
            <p>{session.user.image}</p>
            

            {extraTitle && <h2 className="mt-4 font-bold">{extraTitle}</h2>}
            {extraData}
            <LogoutForm />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;

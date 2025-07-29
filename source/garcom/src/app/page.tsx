import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LogoutForm from "@/app/auth/components/logout-form";
import { getDados } from "./auth/getDados/page";



const HomeLayout = async () => {
  const dados = await getDados();

  if (!dados) {
    return (
      <div className="p-10 text-center">
        <h1>Erro ao carregar dados do usuário</h1>
      </div>
    );
  }

  const { role, roleData, user } = dados;
  const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";
  const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0"


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
        <section className="mt-10 text-center">
          <h1 className="text-2xl font-semibold">
            Bem-vindo, {user.name}!
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Seu tipo de conta é: <b>{role}</b>
          </p>
          <ol>
            <li>CNPJ: {roleData?.cnpj}</li>
            <li>Email: {user.email}</li>
            <li>{roleData?.descricao}</li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;

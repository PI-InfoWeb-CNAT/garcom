import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
  const tituloClass =  "text-[23px] font-bold mb-6 text-[##E55F4B]"; 
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
      </main>
      
      <Footer />
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
  const tituloClass =  "text-[23px] font-bold mb-6 text-[##E55F4B]"; 
  const mainClass = "!pt-35 flex flex-col h-screen bg-white p-7 md:p-36 !pb-0"
  return (
    <div>
      <Header />
      
      <main className={mainClass}>
        <h1 className={tituloClass}>Exemplo de uso do Button do shadcn/ui</h1>
        <div className="flex items-center justify-center gap-4">
          <Button className="w-64" variant="default">
            Default Button
          </Button>
          <Button className="w-64" variant="outline">
            Outline Button
          </Button>
          <Button className="w-64" variant="destructive">
            Destructive Button
          </Button>
        </div>
      </main>
      <Footer />

    </div>
  )
}
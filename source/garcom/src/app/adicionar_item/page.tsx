import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";


export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-right h-screen bg-white p-7 md:p-36 !pb-0 mt-10";
  return (
    <>
      <Header />
      <main className={mainClass}>
        <section className="rounded-3xl border-1 border-[#F55774] p-6 h-175">
          <form className="space-y-3">
            <div>
              <button className="absolute m-5 cursor-pointer">
                <img src={"/arquivo.svg"} alt="Arquivo" className="h-8 w-8" />
              </button>
              <img
                src={"/comidateste.jpg"}
                alt="foto_item"
                className="h-60 w-100 rounded-3xl"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">
                Nome do produto
              </h2>
              <Input
                type="text"
                id="product-name"
                placeholder="Nome do produto"
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">
                Descrição
              </h2>
              <Input
                type="text"
                id="product-name"
                placeholder="Nome do produto"
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#616161]">Valor</h2>
              <Input
                type="number"
                id="product-value"
                placeholder="00,00"
                step="0.01"
                min="0"
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
              />
            </div>
            <div className="relative overflow-hidden">
              <Carousel className="w-full max-w-100">
                <CarouselContent className="-ml-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="min-w-0 flex-shrink-0 basis-1/3 pl-1"
                    >
                      <button className="w-full cursor-pointer rounded-3xl bg-[#D9D9D9]">
                        <p className="p-1">{index + 1} Destaques da semana</p>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/85 to-transparent"></div>
            </div>
            <div className="flex justify-between">
              <Button className="rounded-3xl bg-[#FFC300] p-6">
                Cancelar
              </Button>
              <Button className="rounded-3xl bg-[#E55F4B] p-6 pl-15 pr-15">
                Salvar Produto
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

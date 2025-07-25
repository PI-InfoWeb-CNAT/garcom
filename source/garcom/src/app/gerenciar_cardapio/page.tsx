import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function Page() {
  const mainClass = "!pt-35 flex flex-row items-right h-screen bg-white p-7 md:p-36 !pb-0 mt-10"
  return (
    <>
      <Header />
      <main className={mainClass}>
        <div className="items-left flex-1 border-r-1 border-[#F55774] pr-30">
          <div className="mb-10 flex flex-row items-center justify-between">
            <h2 className="mb-10 text-2xl font-bold text-red-400">Cardápio</h2>
            <div className="mb-5 flex flex-row items-center justify-between">
              <Input
                placeholder="Adicionar novo produto"
                className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
              />
              <button className="cursor-pointer">
                <img
                  className="ml-0.5 h-fit w-fit"
                  src="/add.svg"
                  alt="Adicionar"
                />
              </button>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base text-gray-700">
                Destaques
              </AccordionTrigger>
              <AccordionContent className="ml-14">
                <ul>
                  <li className="mb-5 flex flex-row items-center justify-between">
                    <h3 className="font-semibold text-red-400">Item 1</h3>
                    <div className="flex flex-row items-center justify-between space-x-8">
                      <p className="text-red-400">
                        ----------------------------------------
                      </p>
                      <div className="flex flex-row items-center space-x-1">
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/editar.svg"
                            alt="editar"
                          />
                        </button>
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/excluir.svg"
                            alt="Deletar"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="mb-5 flex flex-row items-center justify-between">
                    <h3 className="font-semibold text-red-400">Item 2</h3>
                    <div className="flex flex-row items-center justify-between space-x-8">
                      <p className="text-red-400">
                        ----------------------------------------
                      </p>
                      <div className="flex flex-row items-center space-x-1">
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/editar.svg"
                            alt="editar"
                          />
                        </button>
                        <button className="cursor-pointer">
                          <img
                            className="h-6 w-6"
                            src="/excluir.svg"
                            alt="Deletar"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="items-right w-2/5 pl-30">
          <div className="mb-5 flex flex-row items-center justify-between">
            <Input
              placeholder="Adicionar nova categoria"
              className="rounded-4xl border-0 bg-[#EFEFEF] text-right text-6xl font-semibold text-[#B9B9B9]"
            />
            <button className="cursor-pointer">
              <img
                className="ml-0.5 h-fit w-fit"
                src="/add.svg"
                alt="Adicionar"
              />
            </button>
          </div>
          <ul className="list-disc pl-5 marker:text-red-400">
            <li className="mb-5">
              <div className="flex flex-row items-center space-x-4">
                <h3 className="font-semibold text-gray-700">Item 1</h3>
                <div className="flex flex-row items-center space-x-1">
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/editar.svg" alt="editar" />
                  </button>
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/excluir.svg" alt="Deletar" />
                  </button>
                </div>
              </div>
            </li>
            <li className="mb-5">
              <div className="flex flex-row items-center space-x-4">
                <h3 className="font-semibold text-gray-700">Destaques</h3>
                <div className="flex flex-row items-center space-x-1">
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/editar.svg" alt="editar" />
                  </button>
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/excluir.svg" alt="Deletar" />
                  </button>
                </div>
              </div>
            </li>
            <li className="mb-5">
              <div className="flex flex-row items-center space-x-4">
                <h3 className="font-semibold text-gray-700">Sobremesas</h3>
                <div className="flex flex-row items-center space-x-1">
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/editar.svg" alt="editar" />
                  </button>
                  <button className="cursor-pointer">
                    <img className="h-6 w-6" src="/excluir.svg" alt="Deletar" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <>
      <Header />
      <main className="font flex min-h-screen flex-col p-24 pt-45">
        <div className="items-left max-w-2/3">
          <div className="mb-10 flex flex-row items-center justify-between w-80/100">
            <h2 className="mb-10 text-2xl font-bold text-red-400">Cardápio</h2>
            <div className="flex flex-row items-center justify-between mb-5">
              <Input placeholder="Adicionar novo item" className="bg-gray-100 border-0 text-gray-400 rounded-4xl"/>
              <button className="cursor-pointer">
                <img className="h-fit w-fit ml-0.5" src="/add.svg" alt="Adicionar" />
              </button>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-80/100">
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
      </main>
    </>
  );
}
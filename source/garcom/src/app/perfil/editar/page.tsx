'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const schema = z.object({
  usuario: z.string().min(2, "Usuário é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function editarPerfil() {
    const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";

    const inputClass = "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";
    
    const mainClass = "!pt-35 flex flex-col h-screen bg-white p-7 md:p-36 !pb-0"
    
    
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null)
    const [fotoBanner, setFotoBanner] = useState<string | null>(null)

    function mudarFotoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setFotoPerfil(URL.createObjectURL(file));}
  }
  function mudarFotoBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setFotoBanner(URL.createObjectURL(file));}
  }

    return (
    <div>
      <Header />
      <main className={mainClass}>
        <h1 className={tituloClass}>Editar Restaurante</h1>
        
        <section className="flex align-center gap-10 h-auto mb-10">
          <div className="flex flex-col items-center relative justify-center w-50 h-50">
          <img src={fotoPerfil || "/default-profile.png"} alt="Foto do perfil"
            className="w-50 h-50 rounded-full object-cover"/>

          <input type="file" accept="image/*" onChange={mudarFotoPerfil} id="foto-perfil"
            className="hidden"/>

          <label htmlFor="foto-perfil"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center justify-center rounded-full shadow-md">

            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>

        <div className="flex flex-col items-center relative justify-center w-full flex-2 h-50">
          <img src={fotoBanner || "/default-banner.png"} alt="banner"
            className="w-full h-50  object-cover"/>

          <input type="file" accept="image/*" onChange={mudarFotoBanner} id="banner"
            className="hidden"/>

          <label htmlFor="banner"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center rounded-full justify-center shadow-md">

            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>
        </section>
        <section className="flex flex-col gap-4 mb-6">
          
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
              <AccordionTrigger><h2 className={tituloClass}>Informações do Restaurante</h2></AccordionTrigger>
              <AccordionContent>
                <form className="flex flex-col gap-4">
                  <div>
                    <label>Nome do restaurante</label>
                    <Input className={inputClass} type="text" placeholder="Nome do Restaurante"/>
                  </div>
                  <Input
                    className={inputClass}
                    type="text"
                    placeholder="Endereço"
                  />
                  <Input
                    className={inputClass}
                    type="text"
                    placeholder="Telefone"
                  />
                  <Button className="w-64" variant="rosa">Salvar</Button>
                </form>
              </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>
         


        
      </main>
      <Footer />
    </div>
  )
}
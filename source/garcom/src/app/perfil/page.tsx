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

const schema = z.object({
  usuario: z.string().min(2, "Usuário é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function perfil() {
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
        
        <div className="flex align-center gap-10 h-auto mb-10">

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
        </div>
        <div className="flex items-center gap-5">
          <a href="/perfil/editar" className="h-[35px] w-fit pl-10 pr-10 inline-flex items-center justify-center rounded-full  bg-[#F65C5C] hover:bg-[#E54747] hover:text-[#FFE6E6] transition-all text-white font-semibold font-poppins ">Editar Perfil</a>
          <a href="/perfil/editar" className="h-[35px] w-fit pl-10 pr-10 inline-flex items-center justify-center rounded-full  bg-[#FF954A] hover:bg-[#DE9310] text-white hover:text-[#FFE6E6] font-semibold font-poppins ">Editar Perfil</a>
          <a href="/perfil/editar" className="h-[35px] w-fit pl-10 pr-10 inline-flex items-center justify-center rounded-full  bg-white hover:bg-[#F6E1E1] text-[#F65C5C]  border border-[#F65C5C] font-semibold font-poppins ">Editar Perfil</a>
          <a href="/perfil/editar" className="h-[35px] w-fit pl-10 pr-10 inline-flex items-center justify-center rounded-full  bg-[#FFC300] hover:bg-[#F0B800] text-white hover:text-[#FFF9E6] font-semibold font-poppins ">Editar Perfil</a>

        </div>
         
      </main>
      <Footer />
    </div>
  )
}
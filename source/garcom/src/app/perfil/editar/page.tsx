'use client'
import { Header } from "@/components/header";
import Image from "next/image";
import Link from "next/link";
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

export default function editarPerfil() {
    const tituloClass = 
        "text-[23px] font-bold mb-6 text-[##E55F4B]";

    const inputClass =
        "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";
    
    
    const [foto, setFoto] = useState<string | null>(null)

    function mudarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setFoto(URL.createObjectURL(file));}
  }

    return (
    <div>
      <Header />
      <main className="!pt-40 sm:pt-28 flex flex-col h-screen bg-white p-6 sm:p-13">
        <h1 className={tituloClass}>Editar Restaurante</h1>
        <div>
            <img src={foto || "/default-profile.png"} alt="Foto do perfil" className="w-24 h-24 rounded-full mb-4" />
            <input type="file" accept="image/*" onChange={mudarFoto} className="mb-4 hidden" id="foto-perfil" />
            <label htmlFor="foto-perfil" className="cursor-pointer rounded-full bg-[##FFE3CF] h-30 w-30 flex align-center justify-center">
                <MdOutlineEdit className="text-[#F65C5C] !size-[19px] absolute b-0 r-0" />

            </label>

        </div>
        <Input
          className={inputClass}
          placeholder="hello word"
        />
      </main>
    </div>
  )
}
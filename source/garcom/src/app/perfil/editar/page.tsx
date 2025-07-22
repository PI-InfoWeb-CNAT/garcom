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

const schema = z.object({
  usuario: z.string().min(2, "Usuário é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function editarPerfil() {
    const tituloClass = "text-[23px] font-bold mb-6 text-[##E55F4B]";
  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";
  return (
    <div>
      <Header />
      <main className="!pt-40 sm:pt-28 flex flex-col h-screen bg-[#F5F5F5] p-6 sm:p-13">
        <h1 className={tituloClass}>Editar Restaurante</h1>
        <div>
            <div>
                
            </div>
        </div>
        <Input
          className={inputClass}
          placeholder="hello word"
        />
      </main>
    </div>
  )
}
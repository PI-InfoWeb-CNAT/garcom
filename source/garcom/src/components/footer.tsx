'use client'
import * as React from "react"
import Image from "next/image"
import LogoutForm from "@/app/auth/components/logout-form";

export function Footer() {
  const [open, setOpen] = React.useState(false)

  return (
    <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 w-full max-h-24 p-7 md:p-36 box-border bg-white text-[#E55F4B] ">

        <div>
            <h1 className="flex items-center align-center pt-px">
                <Image src="/logo.svg" alt="Logo" width={60} height={60} />
            </h1>
            <p className="font-bold text-[16px] ">A janta, o mercado e aquele mimo…<br/>Chama o Garçom!</p>
        </div>

        

        <nav className="flex flex-col items-end  gap-1">
          <ol className=" flex-row md:flex hidden items-center gap-5">
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="#" className="cursor-pointer">Cardápio</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="#" className="cursor-pointer">Funcionarios</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/perfil" className="cursor-pointer">Perfil</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/perfil" className="cursor-pointer"><LogoutForm /></a></li>
          </ol>
          <p>©2025 Garçom,  Todos os direitos reservados.</p>
        </nav>
        
      </footer>
  )
}
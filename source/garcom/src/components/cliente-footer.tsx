'use client'
import * as React from "react"
import Image from "next/image"

export function Footer() {


  return (
    <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 w-full max-h-24 p-7 md:p-36 box-border bg-white text-[#E55F4B] ">

        <div>
            <h1 className="flex items-center align-center pt-px">
                <Image src="/logo.svg" alt="Logo" width={60} height={60} />
            </h1>
            <p className="font-bold text-[16px] ">A janta, o mercado e aquele mimo…<br/>Chama o Garçom!</p>
        </div>

        

        <nav className="flex flex-col items-end  gap-1">
          <p>©2025 Garçom,  Todos os direitos reservados.</p>
        </nav>
        
      </footer>
  )
}
'use client'
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="flex items-center justify-between w-full rounded-full py-3 pl-10 pr-10 box-border bg-white text-[#E55F4B] relative">
      <h1 className="font-RoadRage text-[1.5em] font-regular text-[#E55F4B]">
        GARÇOM
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden flex flex-col justify-center items-center w-10 h-10" onClick={() => setOpen(!open)} aria-label="Menu">
          
          <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#E55F4B]"></span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-[#3D3D3D] text-white" >
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> 
          <DropdownMenuSeparator />*/}
          <DropdownMenuItem>Página principal</DropdownMenuItem>
          <DropdownMenuItem>Cardápio</DropdownMenuItem>
          <DropdownMenuItem>Funcionarios</DropdownMenuItem>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      

      <nav className={` ${open ? "flex" : "hidden"}
        flex-col items-center gap-5 py-4 shadow-md
        md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:py-0 md:gap-5
      `}>
        <ol className="flex flex-col md:flex-row items-center justify-center gap-5">
          <li className="font-poppins text-[1em] font-semibold text-[#E55F4B]">Página principal</li>
          <li className="font-poppins text-[1em] font-semibold text-[#E55F4B]">Cardápio</li>
          <li className="font-poppins text-[1em] font-semibold text-[#E55F4B]">Funcionarios</li>
          <li className="font-poppins text-[1em] font-semibold text-[#E55F4B]">Perfil</li>
        </ol>
      </nav>
      
    </header>
  )
}
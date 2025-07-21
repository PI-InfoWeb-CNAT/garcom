'use client'
import * as React from "react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { FaHome, FaBookOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdPeople } from "react-icons/io";

export function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-center absolute top-0  bg-[#F65C5C] w-full h-28 p-6">
      <header className="flex items-center justify-between w-full rounded-full h-14 pl-10 pr-10 box-border bg-white text-[#E55F4B]">
        <h1 className="flex items-center align-center pt-px">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden flex flex-col justify-center items-center w-10 h-10 l--100px" onClick={() => setOpen(!open)} aria-label="Menu">
            
            <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1"></span>
            <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1"></span>
            <span className="block w-6 h-0.5 bg-[#E55F4B]"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
  className="w-48 bg-[#3D3D3D] text-white"
  align="end"
>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> 
            <DropdownMenuSeparator />*/}
            <a href="#"><DropdownMenuItem className="cursor-pointer"><FaHome />Página principal</DropdownMenuItem></a>
            <a href="#"><DropdownMenuItem className="cursor-pointer"><FaBookOpen />Cardápio</DropdownMenuItem></a>
            <a href="#"><DropdownMenuItem className="cursor-pointer"><IoMdPeople /> Funcionarios</DropdownMenuItem></a>
            <a href="#"><DropdownMenuItem className="cursor-pointer"><CgProfile />Perfil</DropdownMenuItem></a>
          </DropdownMenuContent>
        </DropdownMenu>
        

        <nav className={` ${open ? "flex" : "hidden"}
          flex-col items-center gap-5 py-4 shadow-md
          md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:py-0 md:gap-5
        `}>
          <ol className="flex flex-col md:flex-row items-center justify-center gap-5">
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E07956] transition-all"><a href="#" className="cursor-pointer">Página principal</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E07956] transition-all"><a href="#" className="cursor-pointer">Cardápio</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E07956] transition-all"><a href="#" className="cursor-pointer">Funcionarios</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E07956] transition-all"><a href="#" className="cursor-pointer">Perfil</a></li>
          </ol>
        </nav>
        
      </header>
    </div>
  )
}
'use client'
import * as React from "react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LogoutForm from "@/app/auth/components/logout-form";
import { FaHome, FaBookOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdPeople } from "react-icons/io";

export function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-center fixed top-0  bg-[#F65C5C] w-full h-26 p-4 md:p-15 pt-10 pb-10 z-100">
      <header className="flex items-center justify-between w-full rounded-full h-14 pl-3 pr-3 md:pl-20 md:pr-20 box-border bg-white text-[#E55F4B]">

        <h1 className="flex items-center align-center pt-px">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer md:hidden flex flex-col justify-center items-center w-10 h-10 " onClick={() => setOpen(!open)} aria-label="Menu">
            <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1 hover:bg-[#E54747] transition-all"></span>
            <span className="block w-6 h-0.5 bg-[#E55F4B] mb-1 hover:bg-[#E54747] transition-all"></span>
            <span className="block w-6 h-0.5 bg-[#E55F4B] hover:bg-[#E54747] transition-all"></span>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-65 bg-[#3D3D3D] text-white border-none p-0 m-0 rounded-2xl z-100000" align="end">
            <a href="/cardapio">
              <DropdownMenuItem className="cursor-pointer max-h-48px p-3 pl-6 gap-3 font-poppins text-[18px] align-center font-medium hover:!bg-[#777777] hover:!text-white transition-all">
                <FaBookOpen className="text-white !size-[23px]" />Cardápio
              </DropdownMenuItem>
            </a>

            <a href="/perfil/funcionarios">
              <DropdownMenuItem className="cursor-pointer max-h-48px p-3 pl-6 gap-3 font-poppins text-[18px] align-center font-medium hover:!bg-[#777777] hover:!text-white transition-all">
                <IoMdPeople className="text-white !size-[23px]" /> Funcionarios
              </DropdownMenuItem>
            </a>

            <a href="/perfil">
              <DropdownMenuItem className="cursor-pointer max-h-48px p-3 pl-6 gap-3 font-poppins text-[18px] align-center font-medium hover:!bg-[#777777] hover:!text-white transition-all">
                <CgProfile className="text-white !size-[23px] hover:text-[#3D3D3D]"/>Perfil
              </DropdownMenuItem>
            </a>
            <a href="/landing-page">
              <DropdownMenuItem className="cursor-pointer max-h-48px p-3 pl-6 gap-3 font-poppins text-[18px] align-center font-medium hover:!bg-[#777777] hover:!text-white transition-all">
                <FaHome className="text-white !size-[23px]" /><LogoutForm />
              </DropdownMenuItem>
            </a>
            </DropdownMenuContent>
        </DropdownMenu>
        

        <nav className={` ${open ? "flex" : "hidden"}
          flex-col items-center gap-5 py-4 shadow-md
          md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:py-0 md:gap-5
        `}>
          <ol className="flex flex-col md:flex-row items-center justify-center gap-5">
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/cardapio" className="cursor-pointer">Cardápio</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/perfil/funcionarios" className="cursor-pointer">Funcionarios</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/perfil" className="cursor-pointer">Perfil</a></li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] hover:text-[#E54747] transition-all"><a href="/perfil" className="cursor-pointer"><LogoutForm /></a></li>
          </ol>
        </nav>
        
      </header>
    </div>
  )
}
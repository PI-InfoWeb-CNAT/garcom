"use client";
import * as React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export function HeaderLP() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed top-0 flex h-26 w-full items-center justify-center bg-[#F65C5C] p-4 pt-10 pb-10 md:p-15">
      <header className="box-border flex h-14 w-full items-center justify-between rounded-full bg-white pr-3 pl-3 text-[#E55F4B] md:pr-20 md:pl-20">
        <h1 className="align-center flex items-center pt-px">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="mb-1 block h-0.5 w-6 bg-[#E55F4B]"></span>
            <span className="mb-1 block h-0.5 w-6 bg-[#E55F4B]"></span>
            <span className="block h-0.5 w-6 bg-[#E55F4B]"></span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="m-0 w-65 rounded-2xl border-none bg-[#3D3D3D] p-0 text-white"
            align="end"
          >
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> 
            <DropdownMenuSeparator />*/}
            <a href="#">
              <DropdownMenuItem className="max-h-48px font-poppins align-center cursor-pointer gap-3 p-3 pl-6 text-[18px] font-medium transition-all hover:!bg-[#777777] hover:!text-white">
                <FaUserPlus className="!size-[23px] text-white" />
                Cadastre-se
              </DropdownMenuItem>
            </a>

            <a href="#">
              <DropdownMenuItem className="max-h-48px font-poppins align-center cursor-pointer gap-3 p-3 pl-6 text-[18px] font-medium transition-all hover:!bg-[#777777] hover:!text-white">
                <FaSignInAlt className="!size-[23px] text-white" />
                Entrar
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav
          className={` ${open ? "flex" : "hidden"} flex-col items-center gap-5 py-4 shadow-md md:static md:flex md:flex-row md:gap-5 md:bg-transparent md:py-0 md:shadow-none`}
        >
          <ol className="flex flex-col items-center justify-center gap-5 md:flex-row">
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] transition-all hover:text-[#E07956]">
              <a href="auth/cadastro" className="cursor-pointer">
                Cadastre-se
              </a>
            </li>
            <li className="font-poppins text-[1em] font-semibold text-[#E55F4B] transition-all hover:text-[#E07956]">
              <a href="auth/entrar" className="cursor-pointer">
                Entrar
              </a>
            </li>
          </ol>
        </nav>
      </header>
    </div>
  );
}

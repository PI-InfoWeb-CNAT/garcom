"use client";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[60%_40%]">
      <div className="m-6 hidden items-center justify-center rounded-[40px] bg-[#f65c5c] md:flex">
        <Image
          src="/garcom-ilustracao.png"
          alt="Garçom"
          width={2000}
          height={2000}
          style={{ width: "70%", height: "auto" }}
          className="object-contain"
        />
      </div>

      <div className="scrollbar-thin scrollbar-thumb-[#f65c5c] scrollbar-thumb-rounded-full scrollbar-track-transparent flex h-full flex-col justify-center overflow-y-auto px-8 py-8 sm:px-16 md:px-24">
        <div className="mb-6 flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={90} height={20} />
          <Link href="/">
            <img
              src="/seta-voltar.svg"
              alt="Voltar"
              className="h-8 w-8 cursor-pointer"
            />
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="font-poppins text-[2.5em] font-semibold text-[#E55F4B]">
            Entrar
          </h1>
          <p className="font-poppins text-[1.2em] font-medium text-[#9E9E9E]">
            Seja bem-vindo de volta!
          </p>
        </div>

        <LoginForm />

        <p className="font-poppins mt-4 text-[1em] font-medium text-[#9E9E9E]">
          Ainda não tem uma conta?{" "}
          <Link
            href="/auth/cadastro"
            className="font-poppins font-medium text-[#f65c5c] hover:underline"
          >
            Cadastre-se!
          </Link>
        </p>
      </div>
    </div>
  );
}

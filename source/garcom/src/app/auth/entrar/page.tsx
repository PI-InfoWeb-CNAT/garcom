"use client";

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

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Login enviado:", data);
  };

  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
              Usuário
            </label>
            <Input
              className={inputClass}
              placeholder="Digite seu usuário"
              {...register("usuario")}
            />
            {errors.usuario && (
              <p className="text-sm text-[#f65c5c]">{errors.usuario.message}</p>
            )}
          </div>

          <div>
            <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
              Senha
            </label>
            <div className="relative">
              <Input
                type={mostrarSenha ? "text" : "password"}
                className={inputClass}
                placeholder="Digite sua senha"
                {...register("senha")}
              />
              <span
                className="text-muted-foreground absolute top-2.5 right-3 cursor-pointer"
                onClick={() => setMostrarSenha((prev) => !prev)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.senha && (
              <p className="text-sm text-[#f65c5c]">{errors.senha.message}</p>
            )}
            <Link href="/auth/recuperar-senha">
              <p className="mt-1 cursor-pointer text-sm font-medium text-[#f65c5c] hover:underline">
                Esqueceu sua senha?
              </p>
            </Link>
          </div>

          <Button
            type="submit"
            className="font-poppins w-full rounded-full bg-[#f65c5c] text-[1em] font-semibold text-[#FFE3CF] hover:bg-[#e25555]"
          >
            Entrar
          </Button>
        </form>

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

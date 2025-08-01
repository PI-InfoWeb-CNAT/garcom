"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

// Schema de validação
const schema = z.object({
  email: z.email("Por favor, insira um e-mail válido"),
});

type FormData = z.infer<typeof schema>;

export default function RedefinirSenhaPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: FormData) => {
    setMessage(null);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/auth/atualizar-senha",
      });

      if (error) {
        setMessage({
          text: error.message || "Erro ao enviar e-mail de redefinição",
          type: "error",
        });
      } else {
        setMessage({
          text: `Enviamos um e-mail para ${data.email} com instruções para redefinir sua senha.`,
          type: "success",
        });
      }
    } catch (error) {
      setMessage({
        text: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        type: "error",
      });
    }
  };

  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E]";

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[60%_40%]">
      <div className="m-6 hidden items-center justify-center rounded-[40px] bg-[#f65c5c] md:flex">
        <Image
          src="/garcom-ilustracao.png"
          alt="Garçom"
          width={2000}
          height={2000}
          className="h-auto w-[70%] object-contain"
        />
      </div>
      <div className="scrollbar-thin scrollbar-thumb-[#f65c5c] scrollbar-thumb-rounded-full scrollbar-track-transparent flex h-full flex-col justify-center overflow-y-auto px-8 py-8 sm:px-16 md:px-24">
        <div className="mb-6 flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={90} height={20} />
          <Link href="/auth/entrar">
            <Image
              width={30}
              height={30}
              src="/seta-voltar.svg"
              alt="Voltar"
              className="h-8 w-8 cursor-pointer"
            />
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="font-poppins text-[2.5em] font-semibold text-[#E55F4B]">
            Redefinir senha
          </h1>
          <p className="font-poppins text-[1.2em] font-medium text-[#9E9E9E]">
            Digite seu e-mail para receber o link de redefinição
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {message && (
            <p
              className={`font-poppins rounded-lg p-3 text-center text-[1em] font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-[#f65c5c]"
              }`}
            >
              {message.text}
            </p>
          )}

          <div>
            <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
              E-mail
            </label>
            <Input
              type="email"
              className={inputClass}
              placeholder="Digite seu e-mail cadastrado"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-[#f65c5c]">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="font-poppins w-full rounded-full bg-[#f65c5c] text-[1em] font-semibold text-[#FFE3CF] hover:bg-[#e25555]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
          </Button>
        </form>

        <p className="font-poppins mt-4 text-[1em] font-medium text-[#9E9E9E]">
          Lembrou sua senha?{" "}
          <Link
            href="/auth/entrar"
            className="font-poppins font-medium text-[#f65c5c] hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

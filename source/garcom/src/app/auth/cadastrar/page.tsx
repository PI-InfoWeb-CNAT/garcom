// src/app/auth/cadastrar/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const schema = z
  .object({
    nome: z.string().min(2),
    cnpj: z.string().min(11),
    descricao: z.string().optional(),
    email: z.string().email(),
    senha: z.string().min(6),
    confirmarSenha: z.string().min(6),
    termos: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos.",
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

export default function CadastroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Formulário enviado:", data);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Lado esquerdo - formulário */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24">
        <h1 className="mb-1 text-3xl font-bold text-[#f65c5c]">Registrar</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Coração de mãe sempre cabe mais um!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nome do restaurante</Label>
            <Input
              placeholder="Digite seu nome do restaurante"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-sm text-[#f65c5c]">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <Label>CNPJ</Label>
            <Input placeholder="Digite o CNPJ" {...register("cnpj")} />
            {errors.cnpj && (
              <p className="text-sm text-[#f65c5c]">{errors.cnpj.message}</p>
            )}
          </div>

          <div>
            <Label>Descrição</Label>
            <Input
              placeholder="Breve texto apresentando a empresa"
              {...register("descricao")}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Digite o email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-[#f65c5c]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Senha</Label>
            <div className="relative">
              <Input
                type={mostrarSenha ? "text" : "password"}
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
          </div>

          <div>
            <Label>Confirmar Senha</Label>
            <div className="relative">
              <Input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha novamente"
                {...register("confirmarSenha")}
              />
              <span
                className="text-muted-foreground absolute top-2.5 right-3 cursor-pointer"
                onClick={() => setMostrarSenha((prev) => !prev)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.confirmarSenha && (
              <p className="text-sm text-[#f65c5c]">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="termos" {...register("termos")} />
            <label htmlFor="termos" className="text-sm leading-none">
              Li e aceito os termos de privacidade
            </label>
          </div>
          {errors.termos && (
            <p className="text-sm text-[#f65c5c]">{errors.termos.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#f65c5c] hover:bg-[#e25555]"
          >
            Registrar
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Já possui uma conta?{" "}
          <Link href="/auth/entrar" className="text-[#f65c5c] hover:underline">
            Entre!
          </Link>
        </p>
      </div>

      {/* Lado direito - imagem */}
      <div className="hidden items-center justify-center rounded-[40px] bg-[#f65c5c] md:flex margin m-6">
        <Image
          src="/garcom-ilustracao.png"
          alt="Garçom"
          width={2000}
          height={2000}
          style={{ width: "70%", height: "auto" }}
          className="object-contain"
        />
      </div>
    </div>
  );
}

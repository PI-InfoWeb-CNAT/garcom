"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

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

export default function CadastroForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E]";

  const onSubmit = async (data: FormData) => {
    try {
      await authClient.signUp.email({
        name: data.nome, // required
        email: data.email, // required
        password: data.senha, // required
      });
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          Nome do restaurante
        </label>
        <Input
          className={inputClass}
          placeholder="Digite seu nome do restaurante"
          {...register("nome")}
        />
        {errors.nome && (
          <p className="text-sm text-[#f65c5c]">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          CNPJ
        </label>
        <Input
          className={inputClass}
          placeholder="Digite o CNPJ"
          {...register("cnpj")}
        />
        {errors.cnpj && (
          <p className="text-sm text-[#f65c5c]">{errors.cnpj.message}</p>
        )}
      </div>

      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          Descrição
        </label>
        <Input
          className={inputClass}
          placeholder="Breve texto apresentando a empresa"
          {...register("descricao")}
        />
      </div>

      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          Email
        </label>
        <Input
          type="email"
          className={inputClass}
          placeholder="Digite o email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-[#f65c5c]">{errors.email.message}</p>
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
      </div>

      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          Confirmar Senha
        </label>
        <div className="relative">
          <Input
            type={mostrarConfirmarSenha ? "text" : "password"}
            className={inputClass}
            placeholder="Digite sua senha novamente"
            {...register("confirmarSenha")}
          />
          <span
            className="text-muted-foreground absolute top-2.5 right-3 cursor-pointer"
            onClick={() => setMostrarConfirmarSenha((prev) => !prev)}
          >
            {mostrarConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.confirmarSenha && (
          <p className="text-sm text-[#f65c5c]">
            {errors.confirmarSenha.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="termos"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field }) => (
            <Checkbox
              id="termos"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <label
          htmlFor="termos"
          className="font-poppins text-[0.9em] leading-none font-medium text-[#9E9E9E]"
        >
          Li e aceito os termos de privacidade
        </label>
      </div>
      {errors.termos && (
        <p className="text-sm text-[#f65c5c]">{errors.termos.message}</p>
      )}

      <Button
        type="submit"
        className="font-poppins w-full rounded-full bg-[#f65c5c] text-[1em] font-semibold text-[#FFE3CF] hover:bg-[#e25555]"
      >
        Registrar
      </Button>
    </form>
  );
}

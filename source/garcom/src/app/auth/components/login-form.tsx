"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";

  const onSubmit = async (data: FormData) => {
    setFormError(null);
    try {
      const { error } = await authClient.signIn.email(
        {
          email: data.email,
          password: data.senha,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              setFormError("Por favor, verifique seu email para ativar sua conta.");
            } else {
              setFormError("Usuário ou senha inválidos.");
            }
          },
        },
      );
      if (error) {
        setFormError("Erro ao tentar login. Tente novamente.");
      }
    } catch (err: any) {
      setFormError("Erro ao tentar login. Tente novamente.");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-poppins mb-[0.3em] block text-[1em] font-medium text-[#9E9E9E]">
          Email
        </label>
        <Input
          type="email"
          className={inputClass}
          placeholder="Digite seu email"
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
        <a href="/auth/recuperar-senha">
          <p className="mt-1 cursor-pointer text-sm font-medium text-[#f65c5c] hover:underline">
            Esqueceu sua senha?
          </p>
        </a>
      </div>

      {formError && <p className="text-sm text-[#f65c5c]">{formError}</p>}

      <Button
        type="submit"
        className="font-poppins w-full rounded-full bg-[#f65c5c] text-[1em] font-semibold text-[#FFE3CF] hover:bg-[#e25555]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}

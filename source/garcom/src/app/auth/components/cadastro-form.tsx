"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
// ...existing code...

// Função para validar CNPJ
function validarCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/[\.\-\/]/g, "");
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  return true;
}

const schema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    cnpj: z
      .string()
      .min(18, "CNPJ deve ter 14 dígitos")
      .refine((val) => validarCNPJ(val), {
        message: "CNPJ inválido",
      }),
    descricao: z.string().optional(),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Função para aplicar máscara de CNPJ
  function formatarCNPJ(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  const inputClass =
    "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E]";

  const onSubmit = async (data: FormData) => {
    setFormError(null);
    try {
      const { data: resultData, error } = await authClient.signUp.email({
        name: data.nome,
        email: data.email,
        password: data.senha,
      });
      if (error) {
        setFormError(error.message || "Erro ao registrar usuário.");
        return;
      }
      const userId = resultData.user.id;
      const rawCnpj = data.cnpj.replace(/\D/g, "");
      const restaurantePayload: any = {
        user_id: userId,
        cnpj: rawCnpj,

      };
      if (data.descricao) restaurantePayload.descricao = data.descricao;

      const res = await fetch("/api/restaurante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantePayload),
      });
      if (!res.ok) {
        const errorMsg = await res.text();
        setFormError(errorMsg || "Erro ao cadastrar restaurante.");

        // Tenta excluir o usuário e entidades relacionadas
        try {
          await fetch(`/api/user?id=${userId}`, { method: "DELETE" });
          // Adicione aqui deleção de outras entidades relacionadas se necessário
        } catch (deleteError) {
          // Opcional: log ou mensagem de erro
        }
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setFormError(error?.message || "Erro ao registrar.");
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
          maxLength={18}
          onChange={(e) => {
            const masked = formatarCNPJ(e.target.value);
            setValue("cnpj", masked);
          }}
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

      {formError && (
        <p className="text-center text-sm text-[#f65c5c]">{formError}</p>
      )}
      <Button
        type="submit"
        className="font-poppins w-full rounded-full bg-[#f65c5c] text-[1em] font-semibold text-[#FFE3CF] hover:bg-[#e25555]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
}

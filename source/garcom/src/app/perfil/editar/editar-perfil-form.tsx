import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MdOutlineEdit } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";



type FormData = z.infer<typeof schema>;

interface Props {
  restauranteId: string;
  dadosIniciais: any;
}


const schema = z.object({
  nome: z.string().optional(),
  cnpj: z.string().optional(),
  descricao: z.string().optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  senha: z.union([z.string().min(6), z.literal("")]).optional(),
  confirmarSenha: z.union([z.string().min(6), z.literal("")]).optional(),
});

export default function EditarPerfilForm({ restauranteId, dadosIniciais }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  
  useEffect(() => {
    if (dadosIniciais) {
      setValue("nome", dadosIniciais.nome || "");
      setValue("cnpj", formatarCNPJ(dadosIniciais.cnpj || ""));
      setValue("descricao", dadosIniciais.descricao || "");
      setValue("email", dadosIniciais.email || "");

      setFotoPerfil(dadosIniciais.fotoPerfil || null);
      setFotoBanner(dadosIniciais.fotoBanner || null);
      setDadosOriginais(dadosIniciais);
    }
  }, [dadosIniciais, setValue]);

  const tituloClass = "text-[23px] font-bold mb-6 text-[#F65C5C]";
   const inputClass = "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";
  const labelClass = "text-[20px] font-medium text-[#9E9E9E] mb-[7px]"
  const [dadosOriginais, setDadosOriginais] = useState<FormData | null>(null);
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [fotoBanner, setFotoBanner] = useState<string | null>(null);

  const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

  const [horarios, setHorarios] = useState(
    diasDaSemana.map((dia) => ({
      dia,
      aberto: dia !== "Domingo",
      inicio: dia !== "Domingo" ? "08:00" : "",
      fim: dia !== "Domingo" ? "22:00" : "",
    }))
  );

  function formatarCNPJ(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  const toggleDia = (index: number) => {
    const novos = [...horarios];
    novos[index].aberto = !novos[index].aberto;
    novos[index].inicio = novos[index].aberto ? "08:00" : "";
    novos[index].fim = novos[index].aberto ? "22:00" : "";
    setHorarios(novos);
  };

  const alterarHorario = (
    index: number,
    campo: "inicio" | "fim",
    valor: string
  ) => {
    const novos = [...horarios];
    novos[index][campo] = valor;
    setHorarios(novos);
  };

  useEffect(() => {
    async function fetchRestaurante() {
      const res = await fetch(`/api/account?id=${restauranteId}`);
      const data = await res.json();

      setValue("nome", data.nome || "");
      setValue("cnpj", formatarCNPJ(data.cnpj || ""));
      setValue("descricao", data.descricao || "");
      setValue("email", data.email || "");

      setFotoPerfil(data.fotoPerfil || null);
      setFotoBanner(data.fotoBanner || null);
      setDadosOriginais(data);
    }
    fetchRestaurante();
  }, [restauranteId, setValue]);

  async function editar(data: FormData) {
    const dadosParaEnviar: any = { id: restauranteId };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && (!dadosOriginais || value !== dadosOriginais[key as keyof FormData])) {
        dadosParaEnviar[key] = value;
      }
    });

    if (data.senha && data.confirmarSenha) {
      if (data.senha !== data.confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
      }
      dadosParaEnviar.novaSenha = data.senha;
    }
    if (fotoPerfil) {
      dadosParaEnviar.fotoPerfil = fotoPerfil;
    }
    if (fotoBanner) {
      dadosParaEnviar.fotoBanner = fotoBanner;
    }

    const res = await fetch("/api/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosParaEnviar),
    });

    const result = await res.json();
    if (result.success) {
      alert("Dados atualizados com sucesso!");
    } else {
      alert(result.error || "Erro ao atualizar dados.");
    }
  }

  function mudarFotoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFotoPerfil(URL.createObjectURL(file));
  }

  function mudarFotoBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFotoBanner(URL.createObjectURL(file));
  }
  return (
    <form onSubmit={handleSubmit(editar)}>
      <section className="flex align-center gap-10 mb-10 h-auto">
        <div className="flex flex-col items-center relative justify-center w-50 h-50">
          <img src={fotoPerfil || "/default-profile.png"} alt="Foto do perfil"
            className="w-50 h-50 rounded-full object-cover" />
          <input type="file" accept="image/*" onChange={mudarFotoPerfil} id="foto-perfil" className="hidden" />
          <label htmlFor="foto-perfil"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center justify-center rounded-full shadow-md">
            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>
        <div className="flex flex-col items-center relative justify-center w-full flex-2 h-50">
          <img src={fotoBanner || "/default-banner.png"} alt="banner"
            className="w-full h-50  object-cover" />
          <input type="file" accept="image/*" onChange={mudarFotoBanner} id="banner" className="hidden" />
          <label htmlFor="banner"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center rounded-full justify-center shadow-md">
            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-0 md:gap-10">
        <div className="col-span-3 md:col-span-2">
          <section className="flex flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="cursor-pointer !no-underline border-b rounded-none h-[60px]  border-[#D9D9D9] ">
                  <h2 className={tituloClass}>Informações do Restaurante</h2>
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col mt-9 w-full gap-4">
                  <div>
                    <label className={labelClass}>Nome do restaurante</label>
                    <Input
                      className={inputClass}
                      type="text"
                      placeholder="nome"
                      {...register("nome")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelClass}>Descrição</label>
                    <textarea
                      className="font-poppins rounded-[18px] bg-[#EFEFEF] text-[1em] p-3 font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium transition-all placeholder:text-[1em]"
                      placeholder="ededde"
                      {...register("descricao")}
                      onInput={(e) => {
                        const el = e.target as HTMLTextAreaElement;
                        el.style.height = 'auto';
                        el.style.height = el.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className={labelClass}>CNPJ</label>
                      <Input
                        className={inputClass}
                        type="text"
                        placeholder="Digite"
                        {...register("cnpj")}
                      />
                    </div>
                    <div className="w-full">
                      <label className={labelClass}>Email</label>
                      <Input
                        className={inputClass}
                        type="text"
                        placeholder="Digite"
                        {...register("email")}
                      />
                    </div>
                    <div className="w-full h-fit">
                      <label className={labelClass}>Senha Atual</label>
                      <Input
                        className={inputClass}
                        type="password"
                        placeholder="*********"
                        {...register("senha")}
                      />
                    </div>
                    <div className="w-full h-fit">
                      <label className={labelClass}>Nova senha</label>
                      <Input
                        className={inputClass}
                        type="password"
                        placeholder="Digite sua nova senha"
                        {...register("confirmarSenha")}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="flex flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger className="cursor-pointer !no-underline border-b rounded-none h-[60px]  border-[#D9D9D9] ">
                  <h2 className={tituloClass}>Localização</h2>
                </AccordionTrigger>
                <AccordionContent className="mt-9">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="w-full h-fit">
                      <label className={labelClass}>CEP</label>
                      <Input className={inputClass} type="text" placeholder="Digite" />
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className={labelClass}>Logradouro</label>
                      <Input className={inputClass} type="text" placeholder="Digite" />
                    </div>
                    <div className="w-full h-fit">
                      <label className={labelClass}>Nº</label>
                      <Input className={inputClass} type="text" placeholder="233" />
                    </div>
                    <div className="w-full h-fit col-span-3">
                      <label className={labelClass}>Complemento</label>
                      <Input className={inputClass} type="text" placeholder="Digite" />
                    </div>
                    <div className="w-full h-fit">
                      <label className={labelClass}>Bairro</label>
                      <Input className={inputClass} type="text" placeholder="Digite" />
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className={labelClass}>Cidade</label>
                      <Input className={inputClass} type="text" placeholder="Natal rs" />
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className={labelClass}>Estado</label>
                      <Input className={inputClass} type="text" placeholder="Rio grande do norte" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        <section className="flex flex-col col-span-3 md:col-span-1 mb-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger className="cursor-pointer !no-underline border-b rounded-none h-[60px]  border-[#D9D9D9] ">
                <h2 className={tituloClass}>Horários de Funcionamento</h2>
              </AccordionTrigger>
              <AccordionContent className="mt-9">
                <div className="flex flex-col gap-4">
                  {horarios.map((dia, index) => (
                    <div key={dia.dia} className="flex items-center justify-between gap-2 mb-4">
                      <span className="w-29 font-medium text-[15px]  text-[#9E9E9E]">{dia.dia}</span>
                      <label className="flex items-center gap-2">
                        <Switch checked={dia.aberto} onCheckedChange={() => toggleDia(index)} />
                        <span className="text-[#9E9E9E] font-medium text-[13px]"> {dia.aberto ? "Aberto" : "Fechado"}</span>
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="time"
                          value={dia.inicio}
                          disabled={!dia.aberto}
                          onChange={(e) => alterarHorario(index, "inicio", e.target.value)}
                          className={`${inputClass} h-8 w-19 no-clock border-blocked p-[4px]`}
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="time"
                          value={dia.fim}
                          disabled={!dia.aberto}
                          onChange={(e) => alterarHorario(index, "fim", e.target.value)}
                          className={`${inputClass} h-8 w-19 no-clock border-blocked p-[4px]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      <Button type="submit" variant="rosa">Salvar Alterações</Button>
    </form>
  );
}
export { EditarPerfilForm };
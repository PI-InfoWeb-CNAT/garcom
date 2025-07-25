'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const schema = z
  .object({
    nome: z.string().min(2),
    cnpj: z.string().min(11),
    descricao: z.string().optional(),
    email: z.string().email(),
    senha: z.string().min(6),
    confirmarSenha: z.string().min(6),
  })
  // refine((data) => data.senha === data.confirmarSenha, {
    //message: "As senhas não coincidem.",
    //path: ["confirmarSenha"],
  //})
  ;

type FormData = z.infer<typeof schema>;

export default function editarPerfil() {
    const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";
    const inputClass = "font-poppins rounded-full bg-[#EFEFEF] text-[1em] font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium placeholder:text-[1em]";
    const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0"
    
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null)
    const [fotoBanner, setFotoBanner] = useState<string | null>(null)

    function mudarFotoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setFotoPerfil(URL.createObjectURL(file));}
  }
  function mudarFotoBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setFotoBanner(URL.createObjectURL(file));}
  }

  const { handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function editar(data: FormData) {
    console.log("Dados editados:", data);
  }

  const diasDaSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
  ];
  
    const [horarios, setHorarios] = useState(
      diasDaSemana.map((dia) => ({
        dia,
        aberto: dia !== "Domingo", // por padrão, domingo fechado
        inicio: dia !== "Domingo" ? "08:00" : "",
        fim: dia !== "Domingo" ? "22:00" : "",
      }))
    );

    const toggleDia = (index: number) => {
      const novos = [...horarios];
      novos[index].aberto = !novos[index].aberto;
      if (!novos[index].aberto) {
        novos[index].inicio = "";
        novos[index].fim = "";
      } else {
        novos[index].inicio = "08:00";
        novos[index].fim = "22:00";
      }
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

    return (
    <div>
      <Header />
      <main className={mainClass}>
        <h1 className={tituloClass}>Editar Restaurante</h1>
        
        <section className="flex align-center gap-10 mb-10 h-auto">
          <div className="flex flex-col items-center relative justify-center w-50 h-50">
          <img src={fotoPerfil || "/default-profile.png"} alt="Foto do perfil"
            className="w-50 h-50 rounded-full object-cover"/>

          <input type="file" accept="image/*" onChange={mudarFotoPerfil} id="foto-perfil"
            className="hidden"/>

          <label htmlFor="foto-perfil"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center justify-center rounded-full shadow-md">

            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>

        <div className="flex flex-col items-center relative justify-center w-full flex-2 h-50">
          <img src={fotoBanner || "/default-banner.png"} alt="banner"
            className="w-full h-50  object-cover"/>

          <input type="file" accept="image/*" onChange={mudarFotoBanner} id="banner"
            className="hidden"/>

          <label htmlFor="banner"
            className="absolute bottom-[10px] right-[10px] bg-[#FFE3CF] hover:brightness-95 transition-all cursor-pointer w-9 h-9 flex items-center rounded-full justify-center shadow-md">

            <MdOutlineEdit className="text-[#F65C5C] text-lg" />
          </label>
        </div>
        </section>
        <form onSubmit={handleSubmit(editar)} className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer !no-underline"><h2 className={tituloClass}>Informações do Restaurante</h2></AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-6">
                
                  <div>
                    <label className="text-[20px] font-medium text-[#9E9E9E]">Nome do restaurante</label>
                    <Input className={inputClass} type="text" placeholder="Nome do Restaurante"/>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[20px] font-medium text-[#9E9E9E]">Nome do restaurante</label>
                    <textarea 
                    onInput={(e) => {
                    const el = e.target as HTMLTextAreaElement;
                    el.style.height = 'auto';
                    el.style.height = el.scrollHeight + 'px';}}
                     className="font-poppins rounded-[18px] bg-[#EFEFEF] text-[1em] p-3 font-medium text-[#9E9E9E] placeholder:text-[#9E9E9E] placeholder:font-poppins placeholder:font-medium transition-all placeholder:text-[1em]"
                     name="descricao" placeholder="Digite uma descrição"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">CNPJ</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Email</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Senha Atual</label>
                      <Input className={inputClass} type="password" placeholder="*********"/>
                    </div>
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Nova senha</label>
                      <Input className={inputClass} type="password" placeholder="Digite sua nova senha"/>
                    </div>

                  </div>
                  
                
              </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>

        <section className="flex flex-col">
          <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
              <AccordionTrigger className="cursor-pointer !no-underline"><h2 className={tituloClass}>Localização</h2></AccordionTrigger>
              <AccordionContent>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">CEP</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className="text-[20px] font-medium text-[#9E9E9E] ">Logradouro</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Nº</label>
                      <Input className={inputClass} type="type" placeholder="233"/>
                    </div>
                    <div className="w-full h-fit col-span-3">
                      <label className="text-[20px] font-medium text-[#9E9E9E] ">Complemento</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Bairro</label>
                      <Input className={inputClass} type="text" placeholder="Digite"/>
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className="text-[20px] font-medium text-[#9E9E9E]">Cidade</label>
                      <Input className={inputClass} type="text" placeholder="Natal rs"/>
                    </div>
                    <div className="w-full h-fit col-span-2">
                      <label className="text-[20px] font-medium text-[#9E9E9E] ">Estado</label>
                      <Input className={inputClass} type="text" placeholder="Rio grande do norte"/>
                    </div>
                  </div>          
              </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>

        <section className="flex flex-col">
          <Accordion type="single" collapsible>
          <AccordionItem value="item-3">
              <AccordionTrigger className="cursor-pointer !no-underline"><h2 className={tituloClass}>Horários de Funcionamento</h2></AccordionTrigger>
              <AccordionContent>
                    <div className="flex flex-col gap-4">
                      {horarios.map((dia, index) => (
                        <div key={dia.dia} className="flex items-center justify-between border-b pb-2">
                          <span className="w-32 text-gray-700">{dia.dia}</span>

                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={dia.aberto}
                              onChange={() => toggleDia(index)}
                              className="accent-red-500 w-5 h-5"
                            />
                            <span className="text-sm text-gray-600">
                              {dia.aberto ? "Aberto" : "Fechado"}
                            </span>
                          </label>

                          <div className="flex gap-2 items-center">
                            <input
                              type="time"
                              value={dia.inicio}
                              disabled={!dia.aberto}
                              onChange={(e) => alterarHorario(index, "inicio", e.target.value)}
                              className="bg-gray-100 px-2 py-1 rounded disabled:opacity-50"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="time"
                              value={dia.fim}
                              disabled={!dia.aberto}
                              onChange={(e) => alterarHorario(index, "fim", e.target.value)}
                              className="bg-gray-100 px-2 py-1 rounded disabled:opacity-50"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  
                  
              </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>

        <Button type="submit" variant="rosa">Salvar Alterações</Button>
        </form>
         


        
      </main>
      <Footer />
    </div>
  )
}
'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";


export default function perfil() {
    const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";
    const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0"
    const [fotoBanner, setFotoBanner] = useState<string | null>(null);
    const [mesas, setMesas] = useState(40);

   type DiaSemana = 
  | 'Segunda-feira'
  | 'Terça-feira'
  | 'Quarta-feira'
  | 'Quinta-feira'
  | 'Sexta-feira'
  | 'Sábado'
  | 'Domingo';

  type HorarioFuncionamento = {
    aberto: boolean;
    horarioAbertura: string;
    horarioFechamento: string;
  };

  const dias: DiaSemana[] = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

  const horarios: Record<DiaSemana, HorarioFuncionamento> = {
    'Segunda-feira': { aberto: true, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Terça-feira': { aberto: true, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Quarta-feira': { aberto: false, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Quinta-feira': { aberto: true, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Sexta-feira': { aberto: true, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Sábado': { aberto: true, horarioAbertura: "13:00", horarioFechamento: "22:00" },
    'Domingo': { aberto: false, horarioAbertura: "", horarioFechamento: "" },
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Mesas cadastradas: ${mesas}`);
  }


    return (
    <div>
      <Header />
      <main className={mainClass}>
        <section className="relative mb-10 pb-6 border-b border-[#F65C5C]">
          <div className="flex flex-col items-center relative justify-center w-full h-auto">
            <img src={fotoBanner || "/default-banner.png"} alt="banner"
            className="w-full h-50  object-cover"/>
          </div>

          <div className="flex items-center  justify-between w-full h-auto  ">
              <div>
                <img src={"/default-profile.png"} alt="avatar" className="w-[150px] h-[150px] rounded-full absolute left-0 top-[131px]"/>

                <div className="flex items-start gap-5 mt-18">
                  <div>
                    <h1 className={`${tituloClass} !m-0 !text-[#616161] !text-[27px]`}>Super Minorinha</h1>
                    <p className="!text-[14px] text-medium mp-[-10px] text-[#B2B2B2] ">Natal - RN</p>
                  </div>
                  <Button className="w-40 mt-[5px]" variant="rosa"><a href="/perfil/editar">Editar Perfil</a></Button>
                </div>

                <div className="flex items-center w-auto gap-5 pt-2">  
                  <Button className="w-40" variant="branco">Cardápio</Button>
                  <Button className="w-40" variant="branco">Funcionarios</Button>
                </div>
              </div>
              <ul className="flex flex-col gap-2 pt-5">
                {dias.map((dia) => {
                  const { aberto, horarioAbertura, horarioFechamento } = horarios[dia];
                  return (
                    <li key={dia} className="flex items-center gap-4">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          aberto ? 'bg-[#F65C5C]' : 'bg-[#5C5C5C]'
                        }`}
                      ></span>
                      <span className="text-[#5C5C5C] min-w-[130px]">{dia}</span>
                      <span className="text-[#5C5C5C] font-medium">
                        {aberto ? `${horarioAbertura} - ${horarioFechamento}` : 'Fechado'}
                      </span>
                    </li>
                  );
                })}
              </ul>
          </div>
        </section>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-2 w-full">
          <p className="md:col-span-2 col-span-2">Facilitamos o que deveria ser simples: pedir o que você precisa e receber na porta de casa, quando você quiser. Nada de cadastro demorado, pagamento online ou mil etapas. Aqui, você escolhe, pede e recebe. Paga na hora, do seu jeito</p>
          
          <form onSubmit={handleSubmit}
            className="bg-[#FFF1C2] flex flex-col rounded-[11.01px] p-5 pl-8 pr-8 min-w-[213px] min-h-[125px] ">
            <span className="underline text-[#303030] mb-2">Editar</span>
            <p className="text-[2em] font-poppins font-semibold text-[#303030] mb-4">Mesas cadastradas</p>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-4 justify-center">
                <button type="button" onClick={() => setMesas((prev) => Math.max(0, prev - 1))}
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">–
                </button>
                
                <input type="number" value={mesas} readOnly className="text-center text-[32px] ml-[12px] w-[49px] font-bold text-[#303030]"/>
                
                <button type="button" onClick={() => setMesas((prev) => prev + 1)}
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">+
                </button>
              </div>
              <button type="submit" className="text-[#FFC300] font-bold text-[20px] ml-2 cursor-pointer">OK</button>
            </div>
          </form>

          <form onSubmit={handleSubmit}
            className="bg-[#FFF1C2] flex flex-col rounded-[11.01px] p-5 pl-8 pr-8 min-w-[213px] min-h-[125px] ">
            <span className="underline text-[#303030] mb-2">Editar</span>
            <p className="text-[2em] font-poppins font-semibold text-[#303030] mb-4">Mesas cadastradas</p>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-4 justify-center">
                <button type="button" onClick={() => setMesas((prev) => Math.max(0, prev - 1))}
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">–
                </button>
                
                <input type="number" value={mesas} readOnly className="text-center text-[32px] ml-[12px] w-[49px] font-bold text-[#303030]"/>
                
                <button type="button" onClick={() => setMesas((prev) => prev + 1)}
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">+
                </button>
              </div>
              <button type="submit" className="text-[#FFC300] font-bold text-[20px] ml-2 cursor-pointer">OK</button>
            </div>
          </form>
        </section>

        
         
      </main>
      <Footer />
    </div>
  )
}
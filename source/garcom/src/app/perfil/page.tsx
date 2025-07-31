import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { IoQrCode } from "react-icons/io5";
import LogoutForm from "@/app/auth/components/logout-form";
import { getDados } from "@/app/auth/getDados/page";


const perfil = async () => {
  const dados = await getDados();
  
    if (!dados) {
      return (
        <div className="p-10 text-center">
          <h1>Erro ao carregar dados do usuário</h1>
        </div>
      );
    }
    const { role, roleData, user } = dados;
    
    const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";
    const mainClass = "!pt-35 flex flex-col min-h-screen bg-white p-7 md:p-36 !pb-0"

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

    return (
    <div>
      <Header />
      <main className={mainClass}>
        <section className="relative mb-10 pb-6 border-b border-[#F65C5C]">
          <div className="flex flex-col items-center relative justify-center w-full h-auto">
            <img src="/default-banner.png" alt="banner"
            className="w-full h-50  object-cover"/>
          </div>

          <div className="flex sm:items-center items-start sm:flex-row flex-col  justify-between w-full h-auto  ">
              <div>
                <img src={"/default-profile.png"} alt="avatar" className="w-[150px] h-[150px] rounded-full absolute left-0 top-[131px]"/>

                <div className="flex items-start gap-5 mt-18">
                  <div>
                    <h1 className={`${tituloClass} !m-0 !text-[#616161] !text-[27px]`}>{user.name}</h1>
                    <p className="!text-[14px] text-medium mp-[-10px] text-[#B2B2B2] ">{roleData?.endereco_id.cep}</p>
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
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
          <p className="md:col-span-2 sm:col-span-2 col-span-1 pb-3 md:pb-0 !text-[#9E9E9E] w-full">{roleData?.descricao}</p>
          
          <div
            className="bg-[#FEE9E7] flex flex-col rounded-[11.01px] p-5 pl-8 pr-8 min-w-[213px] min-h-[169px] relative w-full">
            <p className="!text-[22px] font-medium text-[#303030]">Gerar QRcode das mesas</p>
            <span className="rounded-full flex items-center justify-center w-[50px] min-h-[50px] bg-[#F65C5C] text-white cursor-pointer hover:bg-[#E54747] transition-all absolute right-8 top-[93px]">
              <IoQrCode size={24} />
            </span>

          </div>

          <form className="bg-[#FFF1C2] flex flex-col rounded-[11.01px] p-5 pl-8 pr-8 min-w-[213px] min-h-[125px] w-full"
          >
            <span className="underline text-[#303030] mb-2">Editar</span>
            <p className="!text-[22px] font-medium text-[#303030] mb-4">Mesas cadastradas</p>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-4 justify-center">
                <button type="button"
                  className="cursor-pointer pb-[4px] min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">–
                </button>
                
                <input type="number" readOnly className="text-center text-[32px] ml-[12px] w-[49px] font-bold text-[#303030]"/>
                
                <button type="button"
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">+
                </button>
              </div>
              <button type="submit" className="text-[#FFC300] font-bold text-[20px] ml-2 cursor-pointer">OK</button>
            </div>
          </form>
        </section>
        <section className="mt-10">
          <h1 className={tituloClass}>Churrascos</h1>
          <div className="flex gap-2 bg-[#F5F5F5] p-4 rounded-[27px] box-border w-[360px] h-[170px]">
            <img src="/default-banner.png" alt="Churrasco" className="w-[140px] h-[140px] object-cover rounded-[20px]"/>
            <div className="flex flex-col justify-between items-start gap-1">
              <div className="flex flex-col gap-2">
                <h2 className={`${tituloClass} !text-[16px] !m-0`}>Churrascunho de besta</h2>
                <p className="!text-[15px] text-[#464646] font-medium">Espeto de carne de calma calabreso chama chama</p>
              </div>
              <p className={`${tituloClass} !text-[14px] !m-0`}>R$
                <span className={`${tituloClass} !text-[20px] !m-0`}>39,99</span></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
export default perfil;
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


const cliente = async () => {
//   const dados = await getDados();

//     if (!dados) {
//       return (
//         <div className="p-10 text-center">
//           <h1>Erro ao carregar dados do usuário</h1>
//         </div>
//       );
//     }

    // const tituloClass =  "text-[23px] font-bold mb-6 text-[#F65C5C]";
    const mainClass = "!pt-26 flex items-center flex-col min-h-screen bg-white"

    return (
    <div>
      <Header />
      <main className={mainClass}>
        <img src={"/banner-landing-page.png"} alt="Descrição da imagem" />
        <section>
          <section className="flex flex-row items-center justify-left ml-10 mt-4">
            <img className="w-16 h-16 rounded-full object-cover mr-5" src={"/default-profile.png"} alt="Descrição da imagem" />
            <div className="mr-5">
              <h2 className="text-[30px] font-bold text-[#F65C5C] ">Nome do Clienteaaaa</h2>
              <p className="text-[5px] text-[#F65C5C]">Natal - RN</p>
            </div>
          </section>
          <section className="mr-10 ml-10 mt-5">
            <div>
              <h2 className="text-[25px] font-bold text-[#F65C5C]">Categoria</h2>
            </div>
            <ul>
              <li className="flex items-center">
                <img className="w-40 h-40 rounded-[5vw] object-cover mr-5" src={"/comidateste.jpg"} alt="Descrição da imagem" />
                <div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#F65C5C]">Nome do Produto</h3>
                    <p className="text-[#464646]">Descrição do Produtao</p>
                  </div>
                  <div className="flex items-center">
                    <p className="!text-[20px] font-extrabold text-[#F65C5C]"><span className="text-[15px] font-bold text-[#F65C5C]">R$</span> 30,99</p>
                    <button className="ml-5 bg-[#F65C5C] font-bold text-white px-8 py-2 rounded-full cursor-pointer">Adicionar</button>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}
export default cliente;
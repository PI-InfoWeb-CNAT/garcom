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
          <section className="flex flex-row items-center justify-left ml-5 mt-4">
            <img className="w-16 h-16 rounded-full object-cover mr-5" src={"/default-profile.png"} alt="Descrição da imagem" />
            <div className="mr-5">
              <h2 className="text-[25px] font-bold text-[#F65C5C] ">Nome do Clienteaaaa</h2>
              <p className="text-[5px] text-[#F65C5C]">Natal - RN</p>
            </div>
          </section>
          <section className="m-[5vw]">
            <div>
              <h2 className="text-[20px] mb-4 font-bold text-[#F65C5C]">Categoria</h2>
            </div>
            <ul>
              <li className="flex items-center">
                <img className="w-30 h-30 rounded-[5vw] object-cover mr-5" src={"/comidateste.jpg"} alt="Descrição da imagem" />
                <div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#F65C5C]">Nome do Produto</h3>
                    <p className="text-[#464646] max-w-[100%]">Descrição do Produtao a a a a a a a a</p>
                  </div>
                  <div className="flex items-center place-content-between max-w-[100%] mt-2">
                    <p className="!text-[18px] min-w-[10%] font-extrabold text-[#F65C5C]"><span className="text-[14px] font-bold text-[#F65C5C]">R$</span> 30,99</p>
                    <button className="ml-2 bg-[#F65C5C] font-bold text-white px-8 py-2 rounded-full cursor-pointer text-[12px]">Adicionar</button>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </section>
        {/* <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/15 backdrop-blur-[2px]">
          <form className="!m-5 !mt-25 bg-white p-8 rounded-3xl shadow-2xl w-full max-w-100 mx-auto z-50">
            <img
              src={"/comidateste.jpg"}
              alt="foto_item"
              className="h-40 w-full rounded-3xl object-cover mb-4"
            />
            <div className="mb-3">
              <h2 className="text-[20px] font-semibold text-[#F65C5C]">Nome do Item</h2>
              <p className="text-[14px] text-[#616161]">Descrição do item que está sendo exibido no modal.</p>  
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#616161]">Observação</h2>
                <input
                  type="text"
                  placeholder="Digite sua observação"
                  className="rounded-4xl mt-2 bg-[#EFEFEF] p-4 text-[#9E9E9E] w-full outline-none ring-0 focus:outline-none focus:ring-0"
                />
            </div>
            <div>
                <div className="flex items-center gap-4 mt-4">
                  <h2 className="text-[18px] font-semibold text-[#616161] mr-2">Quantidade</h2>
                  <div className="flex items-center gap-2 ml-auto">
                    <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full text-lg cursor-pointer">-</button>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EFEFEF] text-lg text-[#616161]">1</span>
                    <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full text-lg cursor-pointer">+</button>
                  </div>
                </div>
            </div>
            <div className="flex">
              <button type="button" className="mt-6 w-1/3 bg-[#FFC300] py-3 rounded-full hover:bg-[#F0B700]  mr-2">Cancelar</button>
              <button type="submit" className="mt-6 w-2/3 bg-[#F65C5C] text-white py-3 rounded-full hover:bg-[#e05555]">Adicionar ao pedido</button>
            </div>
          </form>
        </div> */}
      </main>
      <Footer />
    </div>
  )
}
export default cliente;
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

export default function LandingPage() {
  const mainClass = "!pt-35 h-full bg-white p-7 md:p-36 !pb-0";
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start pt-29">
        <section className="w-full">
          <Image
            src="/banner-landing-page.png"
            alt="Landing Page Banner"
            width={1400}
            height={501}
            className="h-auto w-full object-contain"
          />
        </section>
        <section className={mainClass + " grid grid-cols-2"}>
          <Image
            src="/garc]om2.png"
            alt="Imagem do garçom"
            width={362.83}
            height={384.81}
            className="h-auto"
          />
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="mb-3 text-3xl font-semibold text-[#F65C5C]">
                A gente entende a sua correria
              </h2>
              <p className="mb-8 text-lg text-[#9E9E9E]">
                Aqui é simples. Você abre o cardápio do restaurante, escolhe o
                que quer, faz seu pedido e… pronto! O pessoal da cozinha recebe
                na hora. Você paga quando receber, em dinheiro, cartão, pix ou
                do jeito que combinar. Rápido, direto e sem dor de cabeça.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="">
                <Image
                  src="/agua_de_coco.svg"
                  alt="Ícone da água de coco"
                  width={29}
                  height={28.98}
                  className="mt-2 mb-3 h-auto"
                />
                <h3 className="mb-2 text-xl font-semibold text-[#F65C5C]">
                  Qualidade supimpa
                </h3>
                <p className="text-lg text-[#9E9E9E]">
                  Parceiros de confiança para garantir que tudo chegue do
                  jeitinho que você espera.
                </p>
              </div>
              <div>
                <Image
                  src="/taça.svg"
                  alt="Ícone de taça"
                  width={24}
                  height={28.98}
                  className="mb-3 h-auto"
                />
                <h3 className="mb-2 text-xl font-semibold text-[#F65C5C]">
                  Uma experiência digna
                </h3>
                <p className="text-lg text-[#9E9E9E]">
                  No fim das contas, o que a gente quer é te ouvir dizer: "Ô,
                  Garçom… capricha aí!"
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={mainClass + " w-full !bg-[#ffffff]"}>
          <h2 className="mb-6 text-3xl font-semibold text-[#F65C5C]">
            Como funciona?
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="rounded-2xl bg-[#ffe3cf40] px-5 py-10 pb-15">
              <div className="w-25">
                <Image
                  src="/card-landing-page-1.svg"
                  alt="Cardapio"
                  width={18}
                  height={17}
                  className="mb-3 h-auto object-contain"
                />
              </div>
              <h3 className=" text-lg font-semibold text-[#83546A]">
                Escolha seus itens
              </h3>
              <p className="text-[#9E9E9E]">
                Navegue pelo cardápio do restaurante e adicione seus produtos no
                carrinho.
              </p>
            </div>
            <div className="rounded-2xl bg-[#ffe3cf40] px-5 py-10 pb-15">
              <div className="w-25">
                <Image
                  src="/card-landing-page-2.svg"
                  alt="Cardapio"
                  width={17}
                  height={17}
                  className="mb-3 h-auto object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#E07956]">
                Finalize o pedido
              </h3>
              <p className="text-[#9E9E9E]">
                Confirme o pedido e mandamos para a cozinha
              </p>
            </div>
            <div className="rounded-2xl bg-[#ffe3cf40] px-5 py-10 pb-15">
              <div className="w-25">
                <Image
                  src="/card-landing-page-3.svg"
                  alt="Cardapio"
                  width={25}
                  height={17}
                  className="mb-3 h-auto object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#F6B23C]">
                Acompanhe o pedido
              </h3>
              <p className="text-[#9E9E9E]">
                Você pode ver como seu pedido esta em tempo real em status.
              </p>
            </div>
            <div className="rounded-2xl bg-[#ffe3cf40] px-5 py-10 pb-15">
              <div className="w-25">
                <Image
                  src="/card-landing-page-4.svg"
                  alt="Cardapio"
                  width={24}
                  height={17}
                  className="mb-3 h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#F65C5C]">
                Pronto, meu rei!
              </h3>
              <p className="text-[#9E9E9E]">
                Pague na hora, na maior facilidade. Facil para você e para o
                restaurante.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

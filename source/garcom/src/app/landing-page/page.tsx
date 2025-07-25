import Image from 'next/image';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LandingPage() {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 pt-29 pb-8">
          <section className="mb-8 w-full">
            <Image
              src="/banner-landing-page.png"
              alt="Landing Page Banner"
              width={1400}
              height={501}
              className="h-auto w-full object-contain"
            />
          </section>
          <section className="mb-8 w-full">
            <Image
              src="/garçom2.png"
              alt="Imagem do garçom"
              width={362.83}
              height={384.81}
              className="h-auto"
            />
            <div>
              <h2 className="font-poppins font- text-[#F65C5C] uppercase">
                A gente entende a sua correria
              </h2>
              <p>
                Aqui é simples. Você abre o cardápio do restaurante, escolhe o
                que quer, faz seu pedido e… pronto! O pessoal da cozinha recebe
                na hora. Você paga quando receber, em dinheiro, cartão, pix ou
                do jeito que combinar. Rápido, direto e sem dor de cabeça.
              </p>
            </div>
            <div>
              <Image
                src="/agua_de_coco.svg"
                alt="Ícone da água de coco"
                width={29}
                height={28.98}
                className="h-auto"
              />
              <h3 className="font-poppins text-[#F65C5C] uppercase">
                Qualidade supimpa
              </h3>
              <p>
                Parceiros de confiança para garantir que tudo chegue do jeitinho
                que você espera.
              </p>
            </div>
            <div>
              <Image
                src="/taça.svg"
                alt="Ícone de taça"
                width={24}
                height={28.98}
                className=""
              />
              <h3 className="text-[#F65C5C]">Uma experiência digna</h3>
              <p>
                No fim das contas, o que a gente quer é te ouvir dizer: "Ô,
                Garçom… capricha aí!"
              </p>
            </div>
          </section>
          <section>
            <h2>Como funciona?</h2>
          </section>
        </main>
        <Footer />
      </>
    );
    }
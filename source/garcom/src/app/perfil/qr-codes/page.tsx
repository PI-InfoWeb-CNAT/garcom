"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CardQRCode } from "./CardQRCode";
import { useMesas } from "./useMesas";
import { ArrowDownToLine } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function QRcodes() {
  const mainClass =
    "!pt-35 flex flex-col items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  const { mesas, carregando, erro, recarregar } = useMesas();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Header />
      <main className={mainClass}>
        <div className="no-print flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold text-[#F65C5C]">
            QR Codes das Mesas
          </h1>
          <button
            onClick={reactToPrintFn}
            className="cursor-pointer rounded-sm bg-[#F65C5C] px-4 py-2 text-white transition-colors hover:bg-[#E54747]"
            disabled={carregando || mesas.length === 0}
          >
            Imprimir QR Codes
            <ArrowDownToLine className="ml-1 inline" />
          </button>
        </div>

        {!carregando && mesas.length > 0 && (
          <div className="no-print mt-2 mb-4 w-full rounded-lg">
            <h3 className="mb-2 font-semibold text-[#757575]">
              Total de mesas: {mesas.length}
            </h3>
          </div>
        )}

        {carregando && (
          <div className="no-print w-full py-8 text-center">
            <p className="text-gray-500">Carregando QR codes das mesas...</p>
          </div>
        )}

        {erro && (
          <div className="no-print w-full py-8 text-center">
            <p className="text-red-500">{erro}</p>
            <button
              onClick={recarregar}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        <div ref={contentRef}>
          <div className="mt-4 mb-6 hidden print:block">
            <h1 className="text-center text-2xl font-bold text-black">
              QR Codes das Mesas
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Total de mesas: {mesas.length}
            </p>
          </div>

          {!carregando && !erro && mesas.length > 0 && (
            <div className="grid w-full grid-cols-3 gap-7 md:grid-cols-3 lg:grid-cols-5">
              {mesas.map((mesa) => (
                <CardQRCode key={mesa.id} mesa={mesa} />
              ))}
            </div>
          )}
        </div>

        {!carregando && !erro && mesas.length === 0 && (
          <div className="no-print w-full py-8 text-center">
            <p className="text-gray-500">Nenhuma mesa cadastrada</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

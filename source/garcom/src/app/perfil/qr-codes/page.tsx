"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CardQRCode } from "./CardQRCode";
import { useMesas } from "./useMesas";
import { ArrowDownToLine } from "lucide-react";

export default function QRcodes() {
  const mainClass =
    "!pt-35 flex flex-col items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  const { mesas, carregando, erro, recarregar } = useMesas();

  const handleDownloadAll = () => {
    console.log("Baixando todos os QR codes...");
    // Implementar lógica para download em lote
  };

  return (
    <>
      <Header />
      <main className={mainClass}>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold text-[#F65C5C]">
            QR Codes das Mesas
          </h1>
          <button
            onClick={handleDownloadAll}
            className="rounded-sm bg-[#F65C5C] cursor-pointer px-4 py-2 text-white transition-colors hover:bg-[#E54747]"
          >
            Fazer download
            <ArrowDownToLine className="ml-1 inline" />
          </button>
        </div>

        {/* Informações */}
        {!carregando && mesas.length > 0 && (
          <div className="mt-2 mb-4 w-full rounded-lg">
            <h3 className="mb-2 font-semibold text-[#757575]">
              Total de mesas: {mesas.length}
            </h3>
          </div>
        )}

        {/* Estados de carregamento e erro */}
        {carregando && (
          <div className="w-full py-8 text-center">
            <p className="text-gray-500">Carregando QR codes das mesas...</p>
          </div>
        )}

        {erro && (
          <div className="w-full py-8 text-center">
            <p className="text-red-500">{erro}</p>
            <button
              onClick={recarregar}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid de QR Codes */}
        {!carregando && !erro && mesas.length > 0 && (
          <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {mesas.map((mesa) => (
              <CardQRCode key={mesa.id} mesa={mesa} />
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {!carregando && !erro && mesas.length === 0 && (
          <div className="w-full py-8 text-center">
            <p className="text-gray-500">Nenhuma mesa cadastrada</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

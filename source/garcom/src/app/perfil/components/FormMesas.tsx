"use client";

import { useEffect, useState } from "react";

export function FormMesas({ restauranteId }: { restauranteId: string }) {
  const [mesasAtuais, setMesasAtuais] = useState<number>(0);
  const [mesasOriginais, setMesasOriginais] = useState<number>(0);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    async function fetchMesas() {
      const res = await fetch("/api/mesa");
      const data = await res.json();
      setMesasAtuais(data.length);
      setMesasOriginais(data.length);
    }
    fetchMesas();
  }, []);

  const alterarMesa = (delta: number) => {
    setMesasAtuais((prev) => Math.max(0, prev + delta));
  };

  const sincronizarMesas = async () => {
    const diferenca = mesasAtuais - mesasOriginais;

    if (diferenca > 0) {
      for (let i = 0; i < diferenca; i++) {
        await fetch("/api/mesa", {
          method: "POST",
          body: JSON.stringify({
            numero: `${mesasOriginais + i + 1}`,
            ocupada: false,
            restaurante_id: restauranteId,
          }),
        });
      }
    } else if (diferenca < 0) {
      const res = await fetch("/api/mesa");
      const mesas = await res.json();
      const mesasParaExcluir = mesas.slice(mesasAtuais);
      for (const mesa of mesasParaExcluir) {
        await fetch(`/api/mesa?id=${mesa.id}`, {
          method: "DELETE",
        });
      }
    }

    setMesasOriginais(mesasAtuais);
    setMensagemSucesso("Mesas atualizadas com sucesso!");

    setTimeout(() => {
      setMensagemSucesso("");
    }, 3000);
  };
  return (
    <form className="bg-[#FFF1C2] flex justify-between flex-col rounded-[11.01px] p-5 pl-8 pr-8 min-w-[213px] min-h-[125px] w-full"
            onSubmit={(e) => {
            e.preventDefault();
            sincronizarMesas();
        }}
        >
        <p className="!text-[22px] font-medium text-[#303030]">Mesas cadastradas</p>

        {mensagemSucesso && (
          <p className="text-green-600 text-sm font-medium mb-2">
          {mensagemSucesso}
        </p>
        )}

        <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-4 justify-center">
                <button type="button"
                  onClick={() => alterarMesa(-1)}
                  className="cursor-pointer pb-[4px] min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">–
                </button>

                <input
                  type="number"
                  readOnly
                  className="text-center text-[32px] ml-[12px] w-[49px] font-bold text-[#303030]"
                  value={mesasAtuais}
                />

                <button type="button"
                  onClick={() => alterarMesa(1)}
                  className="cursor-pointer min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full bg-[#FFC300] flex items-center justify-center text-[2em] text-[#303030]">+
                </button>
              </div>
              <button type="submit"
                disabled={mesasAtuais === mesasOriginais}
                className={`text-black text-base rounded-lg font-normal py-1 px-3 text-[20px] cursor-pointer transition-all
                  ${
                    mesasAtuais === mesasOriginais
                      ? "bg-[#afafaf] cursor-not-allowed"
                      : "bg-[#FFC300] hover:bg-[#e6b000]"
                  }`}
              >
                Salvar
              </button>
        </div>
    </form>
  );
}

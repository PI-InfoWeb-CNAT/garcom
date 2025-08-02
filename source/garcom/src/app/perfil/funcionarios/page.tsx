"use client";
import { CiSearch } from "react-icons/ci";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useFuncionarios } from "./useFuncionarios";
import { ListaFuncionarios } from "./ListaFuncionarios";
import { FormularioFuncionario } from "./FormularioFuncionario";

export default function Page() {
  const mainClass =
    "!pt-35 flex flex-row items-start min-h-screen bg-white p-7 md:p-36 !pb-0 mt-10";

  const {
    funcionarios,
    novoFuncionario,
    setNovoFuncionario,
    carregando,
    editandoId,
    dadosEdicao,
    setDadosEdicao,
    adicionarFuncionario,
    excluirFuncionario,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
  } = useFuncionarios();

  return (
    <>
      <Header />
      <main className={mainClass}>
        <div className="items-left flex-1 sm:pr-3 md:pr-20">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#E55F4B]">Funcionários</h2>
            <div>
              <div className="text-end">
                <h3 className="text-sm text-[#757575]">Funcionários</h3>
                <p className="!text-xl !font-medium text-[#757575]">
                  {funcionarios.length}
                </p>
              </div>
            </div>
          </div>

          <ListaFuncionarios
            funcionarios={funcionarios}
            carregando={carregando}
            editandoId={editandoId}
            dadosEdicao={dadosEdicao}
            setDadosEdicao={setDadosEdicao}
            onIniciarEdicao={iniciarEdicao}
            onSalvarEdicao={salvarEdicao}
            onCancelarEdicao={cancelarEdicao}
            onExcluir={excluirFuncionario}
          />
        </div>

        {/* borda */}
        <div className="mx-8 w-px self-stretch bg-[#E55F4B]"></div>

        <FormularioFuncionario
          novoFuncionario={novoFuncionario}
          setNovoFuncionario={setNovoFuncionario}
          carregando={carregando}
          onAdicionar={adicionarFuncionario}
        />
      </main>
      <Footer />
    </>
  );
}

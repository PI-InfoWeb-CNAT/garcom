"use client";

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
        <div className="items-left min-h-full flex-1 pr-30">
          <div className="mb-10 flex flex-row items-center justify-between">
            <h2 className="mb-10 text-2xl font-bold text-red-400">
              Lista de Funcionários
            </h2>
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
        <div className="mx-8 w-px self-stretch bg-[#F55774]"></div>

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

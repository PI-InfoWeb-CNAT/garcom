import CadastroForm from "../components/cadastro-form";
import Image from "next/image";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[40%_60%]">
      <div className="scrollbar-thin scrollbar-thumb-[#f65c5c] scrollbar-thumb-rounded-full scrollbar-track-transparent flex h-full flex-col justify-center overflow-y-auto px-8 py-8 sm:px-16 md:px-24">
        <div className="mb-6 flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={90} height={20} />
          <Link href="/">
            <Image
              width={30}
              height={30}
              src="/seta-voltar.svg"
              alt="Voltar"
              className="h-8 w-8 cursor-pointer"
            />
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="font-poppins text-[2.5em] font-semibold text-[#E55F4B]">
            Registrar
          </h1>
          <p className="font-poppins text-[1.2em] font-medium text-[#9E9E9E]">
            Coração de mãe sempre cabe mais um!
          </p>
        </div>

        <CadastroForm />

        <p className="font-poppins mt-4 text-[1em] font-medium text-[#9E9E9E]">
          Já possui uma conta?{" "}
          <Link
            href="/auth/entrar"
            className="font-poppins font-medium text-[#f65c5c] hover:underline"
          >
            Entre!
          </Link>
        </p>
      </div>

      <div className="m-6 hidden items-center justify-center rounded-[40px] bg-[#f65c5c] md:flex">
        <Image
          src="/garcom-ilustracao.png"
          alt="Garçom"
          width={2000}
          height={2000}
          className="h-auto w-[70%] object-contain"
        />
      </div>
    </div>
  );
}

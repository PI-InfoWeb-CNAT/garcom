import { NextResponse } from "next/server";
import { getDados } from "@/app/auth/getDados/page";

export async function GET() {
  const dados = await getDados();
  if (!dados) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }
  return NextResponse.json(dados);
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { restaurante } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Campos obrigatórios
    const { user_id, cnpj, nome } = body;
    if (!user_id || !cnpj || !nome) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 },
      );
    }
    const insertData: any = {};
    for (const key of [
      "user_id",
      "cnpj",
      "nome",
      "descricao",
      "foto_perfil",
      "foto_banner",
      "endereco_id"
    ]) {
      if (body[key] !== undefined) insertData[key] = body[key];
    }
    try {
      await db.insert(restaurante).values(insertData);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error?.code === "23505" && error?.constraint === "restaurante_cnpj_unique") {
        return NextResponse.json({ error: "O CNPJ já está cadastrado." }, { status: 400 });
      }
      console.error("Erro na API restaurante:", error);
      return NextResponse.json(
        { error: "Erro interno do servidor." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Erro na API restaurante:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    let result;
    if (id) {
      result = await db.select().from(restaurante).where(eq(restaurante.id, id));
      if (!result.length) {
        return NextResponse.json({ error: "Restaurante não encontrado." }, { status: 404 });
      }
      return NextResponse.json(result[0]);
    } else {
      result = await db.select().from(restaurante);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
    }
    const updateData: any = {};
    for (const key of [
      "user_id",
      "cnpj",
      "nome",
      "descricao",
      "foto_perfil",
      "foto_banner",
      "endereco_id"
    ]) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }
    const result = await db.update(restaurante).set(updateData).where(eq(restaurante.id, id));
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
    }
    await db.delete(restaurante).where(eq(restaurante.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar restaurante:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

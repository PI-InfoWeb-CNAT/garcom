import { NextResponse } from "next/server";
import { db } from "@/db";
import { restaurante } from "@/db/schema";
import { endereco } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, cnpj} = body;


    if (!user_id || !cnpj) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 },
      );
    }

    const insertData: any = {};
    for (const key of [
      "user_id",
      "cnpj",
      "descricao",
      "foto_perfil",
      "foto_banner",
      "endereco_id",
    ]) {
      if (body[key] !== undefined) insertData[key] = body[key];
    }

    try {
      await db.insert(restaurante).values(insertData);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.log("Erro capturado na inserção restaurante:", error);

      const sqlError = error?.cause || error;

      if (
        sqlError?.code === "23505" && 
        sqlError?.constraint === "restaurante_cnpj_unique"
      ) {
        return NextResponse.json(
          { error: "O CNPJ já está cadastrado." },
          { status: 409 }, 
        );
      }

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
    const user_id = searchParams.get("user_id");
    let result;
    if (id) {
      result = await db
        .select()
        .from(restaurante)
        .where(eq(restaurante.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Restaurante não encontrado." },
          { status: 404 },
        );
      }
      const restauranteData = result[0];
      let enderecoData = null;
      if (restauranteData.endereco_id) {
        const enderecoResult = await db
          .select()
          .from(endereco)
          .where(eq(endereco.id, restauranteData.endereco_id));
        enderecoData = enderecoResult[0] || null;
      }

      const { horarioFuncionamento } = await import("@/db/schema/horarioFuncionamento");
      const horarios = await db
        .select()
        .from(horarioFuncionamento)
        .where(eq(horarioFuncionamento.restaurante_id, restauranteData.id));
      return NextResponse.json({ ...restauranteData, endereco: enderecoData, horarios });
    } else if (user_id) {
      result = await db
        .select()
        .from(restaurante)
        .where(eq(restaurante.user_id, user_id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Restaurante não encontrado para este usuário." },
          { status: 404 },
        );
      }
      const restauranteData = result[0];
      let enderecoData = null;
      if (restauranteData.endereco_id) {
        const enderecoResult = await db
          .select()
          .from(endereco)
          .where(eq(endereco.id, restauranteData.endereco_id));
        enderecoData = enderecoResult[0] || null;
      }
      // Buscar horários de funcionamento
      const { horarioFuncionamento } = await import("@/db/schema/horarioFuncionamento");
      const horarios = await db
        .select()
        .from(horarioFuncionamento)
        .where(eq(horarioFuncionamento.restaurante_id, restauranteData.id));
      return NextResponse.json({ ...restauranteData, endereco: enderecoData, horarios });
    } else {
      result = await db.select().from(restaurante);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
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
      "descricao",
      "foto_perfil",
      "foto_banner",
      "endereco_id",
    ]) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }
    const result = await db
      .update(restaurante)
      .set(updateData)
      .where(eq(restaurante.id, id));
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
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
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
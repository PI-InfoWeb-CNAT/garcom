import { NextResponse } from "next/server";
import { db } from "@/db";
import { horarioFuncionamento } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(horarioFuncionamento).values(body);
    return NextResponse.json({ success: true });
  } catch (error) {
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
    const restaurante_id = searchParams.get("restaurante_id");
    let result;
    if (id) {
      result = await db
        .select()
        .from(horarioFuncionamento)
        .where(eq(horarioFuncionamento.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Horário não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (restaurante_id) {
      result = await db
        .select()
        .from(horarioFuncionamento)
        .where(eq(horarioFuncionamento.restaurante_id, restaurante_id));
      return NextResponse.json(result);
    } else {
      result = await db.select().from(horarioFuncionamento);
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
    }
    await db
      .update(horarioFuncionamento)
      .set(rest)
      .where(eq(horarioFuncionamento.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
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
    await db
      .delete(horarioFuncionamento)
      .where(eq(horarioFuncionamento.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

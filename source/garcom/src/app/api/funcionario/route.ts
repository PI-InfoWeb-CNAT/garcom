import { NextResponse } from "next/server";
import { db } from "@/db";
import { funcionario } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    await db.insert(funcionario).values(rest);
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
    const user_id = searchParams.get("user_id");
    const restaurante_id = searchParams.get("restaurante_id");
    let result;
    if (id) {
      result = await db
        .select()
        .from(funcionario)
        .where(eq(funcionario.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Funcionário não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (user_id) {
      result = await db
        .select()
        .from(funcionario)
        .where(eq(funcionario.user_id, user_id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Funcionário não encontrado para este usuário." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (restaurante_id) {
      result = await db
        .select()
        .from(funcionario)
        .where(eq(funcionario.restaurante_id, restaurante_id));
      return NextResponse.json(result);
    } else {
      result = await db.select().from(funcionario);
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
    await db.update(funcionario).set(rest).where(eq(funcionario.id, id));
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
    await db.delete(funcionario).where(eq(funcionario.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

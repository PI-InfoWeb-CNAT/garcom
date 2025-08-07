import { NextResponse } from "next/server";
import { db } from "@/db";
import { categoria } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(categoria).values(body);
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
    const restauranteId = searchParams.get("restaurante_id");
    let result;
    if (id) {
      result = await db.select().from(categoria).where(eq(categoria.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Categoria não encontrada." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (restauranteId) {
      result = await db
        .select()
        .from(categoria)
        .where(eq(categoria.restaurante_id, restauranteId));
      if (!result.length) {
        return NextResponse.json(
          { error: "Nenhuma categoria encontrada para este restaurante." },
          { status: 404 },
        );
      }
      return NextResponse.json(result);
    } else {
      result = await db.select().from(categoria);
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
    await db.update(categoria).set(rest).where(eq(categoria.id, id));
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
    await db.delete(categoria).where(eq(categoria.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

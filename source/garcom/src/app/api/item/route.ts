import { NextResponse } from "next/server";
import { db } from "@/db";
import { item } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(item).values(body);
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
    const categoriaId = searchParams.get("categoria_id");
    let result;
    if (id) {
      result = await db.select().from(item).where(eq(item.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Item não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (categoriaId) {
      result = await db
        .select()
        .from(item)
        .where(eq(item.categoria_id, categoriaId));
      if (!result.length) {
        return NextResponse.json(
          { error: "Nenhum item encontrado para esta categoria." },
          { status: 404 },
        );
      }
      return NextResponse.json(result);
    } else {
      result = await db.select().from(item);
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
    await db.update(item).set(rest).where(eq(item.id, id));
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
    await db.delete(item).where(eq(item.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

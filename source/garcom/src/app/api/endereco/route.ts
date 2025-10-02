import { NextResponse } from "next/server";
import { db } from "@/db";
import { endereco } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    const [novoEndereco] = await db.insert(endereco).values(rest).returning();
    return NextResponse.json({ success: true, id: novoEndereco.id });
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
    let result;
    if (id) {
      result = await db.select().from(endereco).where(eq(endereco.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Endereço não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else {
      result = await db.select().from(endereco);
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
    await db.update(endereco).set({ ...rest }).where(eq(endereco.id, id));
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
    await db.delete(endereco).where(eq(endereco.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { pedido } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[API PEDIDO] Body recebido:", body);
    const { id, ...rest } = body;
    await db.insert(pedido).values(rest);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API PEDIDO] Erro ao inserir pedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const mesa_id = searchParams.get("mesa_id");
    const status = searchParams.get("status");
    let result;

    if (id) {
      result = await db.select().from(pedido).where(eq(pedido.id, id));
      if (!result.length) {
        return NextResponse.json(
          { error: "Pedido não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (mesa_id && status) {
      result = await db.select().from(pedido).where(
        and(eq(pedido.mesa_id, mesa_id), eq(pedido.status, status))
      );
      return NextResponse.json(result);
    } else {
      result = await db.select().from(pedido);
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
    await db.update(pedido).set(rest).where(eq(pedido.id, id));
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
    await db.delete(pedido).where(eq(pedido.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

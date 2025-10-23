import { NextResponse } from "next/server";
import { db } from "@/db";
import { itemPedido } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { item } from "@/db/schema/item";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(itemPedido).values(body);
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
    const pedido_id = searchParams.get("pedido_id") ?? undefined;
    const item_id = searchParams.get("item_id") ?? undefined;
    let result;
    if (typeof pedido_id === "string" && typeof item_id === "string") {
      // buscar itemPedido específico e incluir nome do item
      result = await db
        .select({
          pedido_id: itemPedido.pedido_id,
          item_id: itemPedido.item_id,
          quantidade: itemPedido.quantidade,
          observacao: itemPedido.observacao,
          item_nome: item.nome,
        })
        .from(itemPedido)
        .leftJoin(item, eq(itemPedido.item_id, item.id))
        .where(
          and(
            eq(itemPedido.pedido_id, pedido_id),
            eq(itemPedido.item_id, item_id),
          ),
        );
      if (!result.length) {
        return NextResponse.json(
          { error: "ItemPedido não encontrado." },
          { status: 404 },
        );
      }
      return NextResponse.json(result[0]);
    } else if (typeof pedido_id === "string") {
      // buscar todos os itens do pedido com nome do item
      result = await db
        .select({
          pedido_id: itemPedido.pedido_id,
          item_id: itemPedido.item_id,
          quantidade: itemPedido.quantidade,
          observacao: itemPedido.observacao,
          item_nome: item.nome,
        })
        .from(itemPedido)
        .leftJoin(item, eq(itemPedido.item_id, item.id))
        .where(eq(itemPedido.pedido_id, pedido_id));
      return NextResponse.json(result);
    } else {
      // retornar todos os registros (sem join)
      result = await db.select().from(itemPedido);
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
    const { pedido_id, item_id, ...rest } = body;
    if (typeof pedido_id !== "string" || typeof item_id !== "string") {
      return NextResponse.json(
        { error: "pedido_id e item_id obrigatórios." },
        { status: 400 },
      );
    }
    await db
      .update(itemPedido)
      .set(rest)
      .where(
        and(
          eq(itemPedido.pedido_id, pedido_id),
          eq(itemPedido.item_id, item_id),
        ),
      );
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
    const pedido_id = searchParams.get("pedido_id") ?? undefined;
    const item_id = searchParams.get("item_id") ?? undefined;
    if (typeof pedido_id !== "string" || typeof item_id !== "string") {
      return NextResponse.json(
        { error: "pedido_id e item_id obrigatórios." },
        { status: 400 },
      );
    }
    await db
      .delete(itemPedido)
      .where(
        and(
          eq(itemPedido.pedido_id, pedido_id),
          eq(itemPedido.item_id, item_id),
        ),
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}

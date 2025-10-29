import { NextResponse } from "next/server";
import { db } from "@/db";
import { itemPedido, item } from "@/db/schema"; 
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📦 POST /api/itemPedido body recebido:", body);

    const { pedido_id, item_id, quantidade, observacao } = body;

    if (!pedido_id || !item_id || !quantidade) {
      return NextResponse.json(
        { error: "Campos obrigatórios: pedido_id, item_id e quantidade." },
        { status: 400 }
      );
    }

    // Inserção (ajuste os nomes dos campos conforme seu schema)
    await db.insert(itemPedido).values({
      pedido_id,
      item_id,
      quantidade: Number(quantidade),
      observacao: observacao ?? null,
    });

    console.log("✅ Item inserido com sucesso!");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Erro no POST /api/itemPedido:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor", details: String(error.message) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pedidoId = searchParams.get("pedido_id");

    if (!pedidoId) {
      return NextResponse.json(
        { error: "O parâmetro pedido_id é obrigatório." },
        { status: 400 }
      );
    }

    const resultadoDoJoin = await db
      .select()
      .from(itemPedido)
      .leftJoin(item, eq(itemPedido.item_id, item.id))
      .where(eq(itemPedido.pedido_id, pedidoId));

    const itensFormatados = resultadoDoJoin.map(res => ({
      pedido_id: res.item_pedido.pedido_id,
      item_id: res.item_pedido.item_id,
      quantidade: res.item_pedido.quantidade,
      observacao: res.item_pedido.observacao,
      item_cardapio: {
        id: res.item?.id,
        nome: res.item?.nome,
        descricao: res.item?.descricao,
        foto: res.item?.foto,
        preco_unitario: res.item?.preco_unitario,
      },
    }));

    return NextResponse.json(itensFormatados);

  } catch (error) {
    console.error("Erro no GET de itemPedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
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
    const pedidoId = searchParams.get("pedido_id");
    const itemId = searchParams.get("item_id");

    if (!pedidoId || !itemId) {
      return NextResponse.json(
        { error: "Os parâmetros pedido_id e item_id são obrigatórios para deletar." },
        { status: 400 }
      );
    }

    await db
      .delete(itemPedido)
      .where(
        and(
          eq(itemPedido.pedido_id, pedidoId),
          eq(itemPedido.item_id, itemId),
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no DELETE de itemPedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { item } from '@/db/schema';
import { eq } from 'drizzle-orm';

// PUT - Atualizar item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dados = await request.json();
    const { nome, descricao, valor, imagem, categoria_id } = dados;
    const { id } = params;

    if (!nome) {
      return NextResponse.json(
        { error: 'Nome do item é obrigatório' },
        { status: 400 }
      );
    }

    if (!categoria_id) {
      return NextResponse.json(
        { error: 'Categoria é obrigatória' },
        { status: 400 }
      );
    }

    if (!valor || valor <= 0) {
      return NextResponse.json(
        { error: 'Valor deve ser maior que zero' },
        { status: 400 }
      );
    }

    const itemAtualizado = await db
      .update(item)
      .set({
        nome,
        descricao: descricao || '',
        preco_unitario: valor.toString(),
        foto: imagem || '/comidateste.jpg',
        categoria_id,
      })
      .where(eq(item.id, id))
      .returning();

    if (itemAtualizado.length === 0) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }

    // Converter para o formato esperado pelo frontend
    const itemFormatado = {
      id: itemAtualizado[0].id,
      nome: itemAtualizado[0].nome,
      descricao: itemAtualizado[0].descricao || '',
      valor: parseFloat(itemAtualizado[0].preco_unitario || '0'),
      imagem: itemAtualizado[0].foto,
      categoria_id: itemAtualizado[0].categoria_id,
      id_restaurante: 1
    };

    return NextResponse.json(itemFormatado);
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar item' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const itemExcluido = await db
      .delete(item)
      .where(eq(item.id, id))
      .returning();

    if (itemExcluido.length === 0) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Item excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir item' },
      { status: 500 }
    );
  }
}

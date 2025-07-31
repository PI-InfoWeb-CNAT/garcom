import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categoria } from '@/db/schema';
import { eq } from 'drizzle-orm';

// PUT - Atualizar categoria
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dados = await request.json();
    const { nome } = dados;
    const { id } = params;

    if (!nome) {
      return NextResponse.json(
        { error: 'Nome da categoria é obrigatório' },
        { status: 400 }
      );
    }

    const categoriaAtualizada = await db
      .update(categoria)
      .set({ nome })
      .where(eq(categoria.id, id))
      .returning();

    if (categoriaAtualizada.length === 0) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(categoriaAtualizada[0]);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir categoria
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const categoriaExcluida = await db
      .delete(categoria)
      .where(eq(categoria.id, id))
      .returning();

    if (categoriaExcluida.length === 0) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir categoria' },
      { status: 500 }
    );
  }
}

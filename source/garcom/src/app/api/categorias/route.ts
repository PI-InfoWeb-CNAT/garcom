import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categoria } from '@/db/schema';

// GET - Buscar todas as categorias
export async function GET() {
  try {
    const categorias = await db.select().from(categoria);
    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    );
  }
}

// POST - Criar nova categoria
export async function POST(request: NextRequest) {
  try {
    const dados = await request.json();
    const { nome, restaurante_id } = dados;

    if (!nome) {
      return NextResponse.json(
        { error: 'Nome da categoria é obrigatório' },
        { status: 400 }
      );
    }

    // Se não há restaurante_id, usar um UUID padrão ou criar um
    const restauranteIdFinal = restaurante_id || "210b0a36-b898-44a2-8e63-e236eccfaffa";

    const novaCategoria = await db.insert(categoria).values({
      nome,
      restaurante_id: restauranteIdFinal,
    }).returning();

    return NextResponse.json(novaCategoria[0]);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    );
  }
}

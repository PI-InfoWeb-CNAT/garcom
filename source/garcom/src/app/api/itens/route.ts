import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { item } from '@/db/schema';

// GET - Buscar todos os itens
export async function GET() {
  try {
    const itens = await db.select().from(item);
    
    // Converter os dados para o formato esperado pelo frontend
    const itensFormatados = itens.map(itemDb => ({
      id: itemDb.id,
      nome: itemDb.nome,
      descricao: itemDb.descricao || '',
      valor: parseFloat(itemDb.preco_unitario || '0'),
      imagem: itemDb.foto,
      categoria_id: itemDb.categoria_id,
      id_restaurante: 1 // Por enquanto hardcoded
    }));
    
    return NextResponse.json(itensFormatados);
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens' },
      { status: 500 }
    );
  }
}

// POST - Criar novo item
export async function POST(request: NextRequest) {
  try {
    const dados = await request.json();
    const { nome, descricao, valor, imagem, categoria_id } = dados;

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

    const novoItem = await db.insert(item).values({
      nome,
      descricao: descricao || '',
      preco_unitario: valor.toString(),
      foto: imagem || '/comidateste.jpg',
      categoria_id,
    }).returning();

    // Converter para o formato esperado pelo frontend
    const itemFormatado = {
      id: novoItem[0].id,
      nome: novoItem[0].nome,
      descricao: novoItem[0].descricao || '',
      valor: parseFloat(novoItem[0].preco_unitario || '0'),
      imagem: novoItem[0].foto,
      categoria_id: novoItem[0].categoria_id,
      id_restaurante: 1
    };

    return NextResponse.json(itemFormatado);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    return NextResponse.json(
      { error: 'Erro ao criar item' },
      { status: 500 }
    );
  }
}

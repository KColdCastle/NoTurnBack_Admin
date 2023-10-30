import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../lib/db';
import { Category } from '@prisma/client';

export async function GET(req: NextRequest, context: { params: any }) {
  let category = context.params.category;
  console.log('category', category);
  let selectedCategory;
  if (category === 'beauty') {
    selectedCategory = Category.beauty;
  } else if (category === 'hobby') {
    selectedCategory = Category.hobby;
  } else if (category === 'digital') {
    selectedCategory = Category.digital;
  } else if (category === 'sport') {
    selectedCategory = Category.sport;
  } else if (category === 'car') {
    selectedCategory = Category.car;
  } else {
    selectedCategory = Category.etc;
  }

  try {
    const result = await prisma.post.findMany({
      where: { category: selectedCategory },
      orderBy: {
        create_date: 'desc',
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ status: 500 });
  }
}
export async function POST(req: NextRequest) {
  return new Response('OK');
}
export async function PUT() {
  return null;
}
export async function DELETE() {
  return null;
}

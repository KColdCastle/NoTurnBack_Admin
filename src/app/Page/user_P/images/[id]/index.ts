import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest, context: { params: any }) {
  // 이미지만 가져오는 서버
  let id = context.params.id;
  const result = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      images: true,
    },
  });

  return NextResponse.json(result);
}

// import prisma from '../../../lib/db';
// import { NextResponse, NextRequest } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     console.log('여김 됨?');
//     const report = await prisma.report.findMany({
//       // orderBy: {
//       //   create_date: 'desc',
//       // },
//     });
//     console.log('report', report);
//     return NextResponse.json({ result: report }, { status: 200 });
//   } catch {
//     return NextResponse.json({ result: '로그인실패' }, { status: 500 });
//   }
// }

import { PrismaClient } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const report = await prisma.report.findMany();
    return res.status(200).json(report);
  }
  // 여기에 POST 메서드 등을 처리하는 로직도 추가할 수 있습니다.
};

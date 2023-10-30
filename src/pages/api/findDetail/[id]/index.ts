import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let findId = req.query.id as string;

  // 타입 검사를 통해 보안을 강화할 수 있습니다.
  if (typeof findId !== 'string') {
    return res.status(400).json({ result: 'Invalid ID' });
  }

  let temp = [];
  try {
    const detailData = await prisma.post.findUnique({
      where: {
        id: findId,
      },
      select: {
        id: true,
        email: true,
        title: true,
        content: true,
        starting_price: true,
        endDate: true,
      },
    });

    if (!detailData) {
      return res.status(404).json({ result: 'Not Found' });
    }

    const nickname = await prisma.profile.findMany({
      where: {
        email: detailData.email,
      },
      select: {
        nickname: true,
      },
    });
    temp.push({ post: detailData });
    temp.push(nickname[0]);

    return res.status(200).json({ result: temp });
  } catch {
    return res.status(500).json({ result: 'ERROR' });
  }
}

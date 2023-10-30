import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = req.query.id as string;

  // 타입 검사를 통해 보안을 강화할 수 있습니다.
  if (typeof id !== 'string') {
    return res.status(400).json({ result: 'Invalid ID' });
  }

  try {
    const result = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        images: true,
      },
    });

    if (!result) {
      return res.status(404).json({ result: 'Not Found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ result: 'ERROR', error });
  }
}

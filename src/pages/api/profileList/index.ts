import { PrismaClient } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const profiles = await prisma.profile.findMany();
    // 오직 nickname만을 가져옴
    const nicknames = profiles.map((profile) => profile);
    return res.status(200).json(nicknames);
  }
  // 여기에 POST 메서드 등을 처리하는 로직도 추가할 수 있습니다.
};

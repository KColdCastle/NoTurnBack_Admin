import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 요청 메소드 확인
  if (req.method !== 'GET') {
    res.status(405).send({ error: 'Method Not Allowed', status: 405 });
    return;
  }

  // 간단한 응답 전송
  res.status(200).json({ status: 'alive' });
}

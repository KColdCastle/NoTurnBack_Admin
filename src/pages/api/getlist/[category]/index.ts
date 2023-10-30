import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/db';
import { Category } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return await handleGET(req, res);
    case 'POST':
      return await handlePOST(req, res);
    case 'PUT':
      return await handlePUT(req, res);
    case 'DELETE':
      return await handleDELETE(req, res);
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  let category = req.query.category as string;
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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ status: 500 });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send('OK');
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  res.status(501).send('Not Implemented'); // 501 Not Implemented 혹은 다른 적절한 응답
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  res.status(501).send('Not Implemented'); // 501 Not Implemented 혹은 다른 적절한 응답
}

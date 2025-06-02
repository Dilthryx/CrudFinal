import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, description, price, stock, imageUrl } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          imageUrl: imageUrl || 'https://via.placeholder.com/150',
        },
      });

      res.status(200).json(product);
    } catch {
      res.status(500).json({ error: 'Error al crear producto' });
    }
  } else {
    res.status(405).end();
  }
}

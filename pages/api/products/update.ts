import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { id, name, description, price, stock, imageUrl } = req.body;

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          imageUrl,
        },
      });

      res.status(200).json(updatedProduct);
    } catch {
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  } else {
    res.status(405).end();
  }
}

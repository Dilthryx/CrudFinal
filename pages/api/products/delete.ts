import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      await prisma.product.delete({
        where: { id },
      });

      res.status(200).json({ message: 'Producto eliminado' });
    } catch {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  } else {
    res.status(405).end();
  }
}

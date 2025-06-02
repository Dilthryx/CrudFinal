import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

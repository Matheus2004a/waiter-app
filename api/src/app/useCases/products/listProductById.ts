import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ message: 'Nenhum produto encontrado' });
    }

    res.send(product);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

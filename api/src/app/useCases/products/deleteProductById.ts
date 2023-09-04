import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function deleteProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.send({ message: 'Produto deletado com sucesso' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

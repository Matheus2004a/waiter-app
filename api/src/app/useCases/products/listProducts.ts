import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProducts(req: Request, res:Response) {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

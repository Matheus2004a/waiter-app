import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    if (orders.length <= 0) {
      return res.status(401).send({ message: 'Nenhum pedido encontrado' });
    }

    res.send(orders);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

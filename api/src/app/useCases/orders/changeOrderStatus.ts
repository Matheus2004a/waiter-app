import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const statusAvaiable = ['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status);

    if (!statusAvaiable) {
      return res.status(400).send({
        message: 'Status deve ser: WAITING, IN_PRODUCTION, DONE'
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

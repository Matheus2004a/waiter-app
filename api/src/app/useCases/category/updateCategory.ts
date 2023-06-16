import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function updateCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { icon, name } = req.body;

    const newData = {
      icon,
      name
    };

    const categoryUpdated = await Category.findByIdAndUpdate(categoryId, { $set: newData });
    res.status(202).send(categoryUpdated);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

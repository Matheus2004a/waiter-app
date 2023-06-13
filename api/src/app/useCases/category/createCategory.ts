import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const category = await Category.create({ icon, name });
    res.status(201).send(category);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

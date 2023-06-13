import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

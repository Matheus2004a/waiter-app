import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).send({ message: 'Categoria não encontrada' });
    }

    res.status(202).send({ message: 'Categoria deletada com sucesso' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

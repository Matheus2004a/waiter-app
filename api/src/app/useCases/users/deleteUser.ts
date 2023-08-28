import { Request, Response } from 'express';

import { Users } from '../../models/Users';

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    res.status(202).send({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

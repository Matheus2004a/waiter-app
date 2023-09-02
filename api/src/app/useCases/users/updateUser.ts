import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { Users } from '../../models/Users';

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.findByIdAndUpdate(id, {
      name, email, password: hashedPassword, role
    });

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    res.status(202).send({ message: 'Usuário atualizado com sucesso' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

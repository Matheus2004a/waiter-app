import { Request, Response } from 'express';

import { Users } from '../../models/Users';

export async function listAll(req: Request, res: Response) {
  try {
    const users = await Users.find();

    res.send(users);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export async function listById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await Users.findOne({
      _id: id
    });

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    res.send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { Users } from '../../models/Users';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
  } catch (error: any) {
    if (error.message.startsWith('E11000')) {
      return res.status(409).send({ message: 'Usuário já cadastrado' });
    }

    res.status(500).send({ message: error.message });
  }
}

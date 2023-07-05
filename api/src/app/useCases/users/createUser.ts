import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { Users } from '../../models/Users';

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (error: any) {
    if (error.message.startsWith('E11000')) {
      return res.status(409).send({ message: 'Usuário já cadastrado' });
    }

    res.status(500).send({ message: error.message });
  }
}

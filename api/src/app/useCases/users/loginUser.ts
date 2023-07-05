import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Users } from '../../models/Users';

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      email,
    });

    if (!user) {
      return res.status(401).send({ message: 'Falha de autenticação' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: 'Senha incorreta. Tente novamente' });
    }

    const payload = {
      id: user._id,
      email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30min' });

    res.status(202).send({
      message: 'Usuário autenticado com sucesso',
      token
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

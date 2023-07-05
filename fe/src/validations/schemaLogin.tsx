import { z } from 'zod';

export const schemaLogin = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
});

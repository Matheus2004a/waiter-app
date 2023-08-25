import { z } from 'zod';

export const schemaRegister = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  role: z.string().nonempty('Tipo do usuário é obrigatório'),
});

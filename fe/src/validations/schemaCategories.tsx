import { z } from 'zod';

export const schemaCategories = z.object({
  icon: z.string()
    .nonempty('Emoji é obrigatório')
    .refine((value) => value.trim(), {
      message: 'Espaço em branco não é permitido'
    }),
  name: z.string()
    .nonempty('Categoria é obrigatória')
    .refine((value) => value.trim(), {
      message: 'Espaço em branco não é permitido'
    }),
});

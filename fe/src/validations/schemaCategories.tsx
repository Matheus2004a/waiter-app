import { z } from 'zod';

export const schemaCategories = z.object({
  icon: z.string().nonempty('Emoji é obrigatório').min(1, 'Apenas um caracter é aceito'),
  name: z.string().nonempty('Categoria é obrigatória')
});

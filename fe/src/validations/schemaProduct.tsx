import { z } from 'zod';

import { schemaCategories } from './schemaCategories';

export const schemaProduct = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatório').min(110),
  price: z.number(),
  category: z.string().nonempty(),
  ingredients: z.array(schemaCategories).nullable()
});

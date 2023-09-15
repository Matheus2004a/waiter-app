import { z } from 'zod';

import { schemaCategories } from './schemaCategories';

const acceptedTypesImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schemaProduct = z.object({
  imagePath: z
    .any()
    .refine((files) => files?.length === 1, 'Imagem é obrigatória.')
    .refine(
      (files) => acceptedTypesImage.includes(files?.[0]?.type),
      'Apenas arquivos .jpg, .jpeg, .png and .webp são aceitos.'
    ),
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatório').max(110),
  price: z.number(),
  category: z.string().nonempty(),
  ingredients: z.array(schemaCategories).nullable()
});

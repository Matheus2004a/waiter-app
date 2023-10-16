import { z } from 'zod';

import { schemaCategories } from './schemaCategories';

const acceptedTypesImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schemaProduct = z.object({
  imagePath: z
    .any()
    .refine((file) => !file, 'Imagem é obrigatória.')
    .refine(
      (file) => acceptedTypesImage.includes(file?.type),
      'Apenas arquivos .jpg, .jpeg, .png and .webp são aceitos.'
    ),
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatório').max(110),
  category: z.string().nonempty(),
  ingredients: z.array(schemaCategories).nullable()
});

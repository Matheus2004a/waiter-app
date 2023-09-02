import CategoriesServices from '../services/CategoriesServices';
import { Category } from '../types/Categories';

async function deleteCategory({ _id }: Category) {
  const categoryDeleted = await CategoriesServices.delete(_id);

  return categoryDeleted;
}

async function updateCategory(data: Category) {
  const categoryUpdated = await CategoriesServices.update(data);

  return categoryUpdated;
}

export { deleteCategory, updateCategory };


import { api } from './api';

import { FormDataCategory } from '../types/Categories';

class CategoriesServices {
  async listAll() {
    const { data } = await api.get('/categories');

    return data;
  }

  async create(dataCategory: FormDataCategory) {
    const { data } = await api.post('/categories', dataCategory);

    return data;
  }

  async update(dataCategory: FormDataCategory) {
    const { data } = await api.put('/categories', dataCategory);

    return data;
  }

  async delete(categoryId: string) {
    const { data } = await api.delete(`/categories/${categoryId}`);

    return data;
  }
}

export default new CategoriesServices();


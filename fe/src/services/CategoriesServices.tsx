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
}

export default new CategoriesServices();


import { api } from './api';

class CategoriesServices {
  async listAll() {
    const { data } = await api.get('/categories');

    return data;
  }
}

export default new CategoriesServices();


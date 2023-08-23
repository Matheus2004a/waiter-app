import { api } from './api';

class ProductServices {
  async listAll() {
    const { data } = await api.get('/products');

    return data;
  }
}

export default new ProductServices();


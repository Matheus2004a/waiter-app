import { api } from './api';

import { Product } from '../types/Product';

class ProductServices {
  async listAll() {
    const { data } = await api.get<Product[]>('/products');

    return data;
  }
}

export default new ProductServices();


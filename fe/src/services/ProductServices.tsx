import { api } from './api';

import { Product } from '../types/Product';

class ProductServices {
  async listAll() {
    const { data } = await api.get('/products');

    return data;
  }

  async create(dataProduct: Product) {
    const { data } = await api.post('/products', dataProduct);

    return data;
  }

  async delete(_id: string) {
    const { data } = await api.delete(`/products/${_id}`);

    return data;
  }
}

export default new ProductServices();


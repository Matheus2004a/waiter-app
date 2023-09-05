import { api } from './api';


class ProductServices {
  async listAll() {
    const { data } = await api.get('/products');

    return data;
  }

  async delete(_id: string) {
    const { data } = await api.delete(`/products/${_id}`);

    return data;
  }
}

export default new ProductServices();


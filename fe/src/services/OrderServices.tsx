import { api } from './api';

class OrderServices {
  async listAll(){
    const { data } = await api.get('/orders');

    return data;
  }
}

export default new OrderServices();

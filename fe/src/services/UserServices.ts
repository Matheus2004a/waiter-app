import { api } from './api';

class UserServices {
  async listAll() {
    const { data } = await api.get('/users');

    return data;
  }
}

export default new UserServices();

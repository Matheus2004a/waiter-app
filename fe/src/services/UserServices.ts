import { api } from './api';

import { Users } from '../types/Users';

class UserServices {
  async listAll() {
    const { data } = await api.get('/users');

    return data;
  }

  async create(dataUser: Users) {
    const { data } = await api.post('/users', dataUser);

    return data;
  }

  async delete(_id: string) {
    const { data } = await api.delete(`/users/${_id}`);

    return data;
  }
}

export default new UserServices();

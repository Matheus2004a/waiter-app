import { api } from './api';

import { FormData } from '../types/Login';
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

  async login(dataUser: FormData) {
    const { data } = await api.post('/login', dataUser);

    return data;
  }

  async update({ _id, name, email, password, role }: Users) {
    const { data } = await api.patch(`/users/${_id}`, { name, email, password, role });

    return data;
  }

  async delete(_id: string) {
    const { data } = await api.delete(`/users/${_id}`);

    return data;
  }
}

export default new UserServices();

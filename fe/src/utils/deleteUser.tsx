import UserServices from '../services/UserServices';
import { Users } from '../types/Users';

export async function deleteUser({ _id }: Users) {
  const userDeleted = await UserServices.delete(_id);

  return userDeleted;
}

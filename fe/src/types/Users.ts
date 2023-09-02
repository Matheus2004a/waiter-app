import { ModalProps } from './Modal';

export interface Users {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

export type TableUsersProps = ModalProps & {
  data: Users
}

import { ModalProps } from './Modal';

export interface Category {
  _id: string,
  name: string,
  icon: string,
}

export interface FormDataCategory {
  icon: string;
  name: string;
}

export type CategoryProps = ModalProps & {
  item: Category
};

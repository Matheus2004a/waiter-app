import { ModalProps } from './Modal';

export interface Category {
  _id: string,
  name: string,
  icon: string,
}

export type Ingredient = Omit<Category, '_id'> & Record<'id', string>

export type CategoryProps = ModalProps & {
  item: Category
};

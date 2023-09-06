import { Category } from './Categories';

export interface Product {
  _id: string;
  name: string;
  description: string;
  ingredients: Category[];
  imagePath: string;
  price: number;
  category: string;
}

import { Ingredient } from './Categories';

export interface Product {
  _id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  imagePath: string;
  price: number;
  category: string;
}

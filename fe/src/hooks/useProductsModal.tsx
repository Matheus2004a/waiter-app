import { useContext } from 'react';
import { ProductContext } from '../contexts/Modal/ProductContext';

export default function useProductsModal() {
  return useContext(ProductContext);
}

import { createContext, useCallback, useState } from 'react';

import { Product } from '../../types/Product';

interface ProductContextProps {
  isModalVisible: {
    newProduct: boolean,
    updateProduct: boolean,
    deleteProduct: boolean,
  };
  productSelected: Product;
  handleModalVisible: (key: string, value: boolean, item?: Product) => void;
}

export const ProductContext = createContext({} as ProductContextProps);

interface ProductProviderProps {
  children: React.ReactNode;
}

export default function ProductProvider({ children }: ProductProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState({
    newProduct: false,
    updateProduct: false,
    deleteProduct: false,
  });

  const [productSelected, setProductSelected] = useState({} as Product);

  const handleModalVisible = useCallback((key: string, value: boolean, item?: Product) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    if (item) setProductSelected(item);
  }, []);

  return (
    <ProductContext.Provider value={{
      isModalVisible,
      productSelected,
      handleModalVisible
    }}>
      {children}
    </ProductContext.Provider>
  );
}

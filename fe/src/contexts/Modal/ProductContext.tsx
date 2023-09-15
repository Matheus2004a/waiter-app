import { createContext, useCallback, useState } from 'react';

import { Product } from '../../types/Product';

interface ProductContextProps {
  isModalVisible: {
    newProduct: boolean,
    updateProduct: boolean,
    deleteProduct: boolean,
    newIngredients: boolean,
  };
  productSelected: Product;
  previewUrl: string;
  handleModalVisible: (key: string, value: boolean, item?: Product) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    newIngredients: false,
  });

  const [productSelected, setProductSelected] = useState({} as Product);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleModalVisible = useCallback((key: string, value: boolean, item?: Product) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    if (item) setProductSelected(item);
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <ProductContext.Provider value={{
      isModalVisible,
      productSelected,
      previewUrl,
      handleModalVisible,
      handleFileChange
    }}>
      {children}
    </ProductContext.Provider>
  );
}

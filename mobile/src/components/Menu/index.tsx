import { FlatList } from 'react-native';

import { formatCurrency } from '../../utils/formatCurrency';
import { products } from '../../mocks/products';

import { Text } from '../Text';
import { ProductContainer, Image, ProductDetails, Separator, AddToCartButton } from './styles';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { Product } from '../../types/Product';

export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <Image
              source={{ uri: product.imagePath }}
            />

            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color='#666666' style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text weight='600'>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}

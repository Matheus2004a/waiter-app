import { FlatList, Modal } from 'react-native';

import { Text } from '../Text';
import { Product } from '../../types/Product';
import { Close } from '../Icons/Close';

import {
  CloseButton, Footer, FooterContainer, Header, Image,
  Ingredient, IngredientsContainer, ModalBody, PriceContainer
} from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

interface ProductModal {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModal) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image source={{ uri: product.imagePath }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={18} weight='600'>{product.name}</Text>
          <Text color='#666666' style={{ marginTop: 16 }}>{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text color='#66666' weight='600'>Ingredients</Text>

            <FlatList
              data={product.ingredients}
              style={{ marginTop: 16 }}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#66666'>{ingredient.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666666'>Preço</Text>
            <Text size={18} weight='600'>{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}

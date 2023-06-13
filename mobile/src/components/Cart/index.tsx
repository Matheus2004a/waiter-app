import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';

import { Text } from '../Text';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';

import { Item, ProductContainer, Actions, Image, Summary, TotalContainer } from './styles';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

export function Cart({ cartItems, onAdd, onDecrement }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleCheckOrder() {
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onCheckOrder={handleCheckOrder}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          style={{ marginBottom: 20, maxHeight: 150 }}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image source={{ uri: cartItem.product.imagePath }} />

                <Text>{cartItem.quantity}x</Text>

                <View>
                  <Text size={14} weight='600'>{cartItem.product.name}</Text>
                  <Text color='#666666' style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </View>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666666'>Total</Text>
              <Text size={18} weight='600'>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}

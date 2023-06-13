import { FlatList, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';

import { Text } from '../Text';

import { Item, ProductContainer, Actions, Image, Summary, TotalContainer } from './styles';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
  return (
    <>
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
                <TouchableOpacity>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity>
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
              <Text size={18} weight='600'>{formatCurrency(120)}</Text>
            </>
          ) : (
            <Text color='#999999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button disabled={cartItems.length === 0}>Confirmar pedido</Button>
      </Summary>
    </>
  );
}

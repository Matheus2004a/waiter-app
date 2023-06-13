import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

import { products as mockProducts } from '../mocks/products';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

import { Container, CategoriesContainer, MenuContainer, Footer, CenteredContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [products] = useState<Product[]>(mockProducts);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return [...prevState, {
          quantity: 1,
          product,
        }];
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: newCartItems[itemIndex].quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      // Remove item from cart
      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      // Decrement quantity item on cart
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color='#D73035' size='large' />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products}
                />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />

                <Text color='#666666' style={{ marginTop: 24 }}>
                  Nenhum produto foi encontrado!
                </Text>
              </CenteredContainer>
            )}
          </>
        )}

        <Footer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </Footer>
      </Container>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}

import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import useProductsModal from '../../hooks/useProductsModal';
import CategoriesServices from '../../services/CategoriesServices';
import ProductServices from '../../services/ProductServices';

import TableProducts from '../../components/Table/TableProducts';
import TableCategories from '../../components/Table/components/TableCategories';
import { ModalIngredients } from './components/ModalIngredients';
import { ModalRegister } from './components/ModalRegister';
import { ModalRemove } from './components/ModalRemove';

import { Flex, Header } from '../History/styles';
import { MenuItem, Nav } from './styles';

import menu from '../../assets/images/menu.svg';

export default function Products() {
  const [isActive, setIsActive] = useState('product');

  const [products, categories] = useQueries({
    queries: [
      {
        queryKey: ['products'],
        queryFn: ProductServices.listAll,
      },
      {
        queryKey: ['categories'],
        queryFn: CategoriesServices.listAll
      }
    ]
  });

  const methods = useForm();

  const { isModalVisible } = useProductsModal();

  return (
    <FormProvider {...methods}>
      <ModalRemove isVisible={isModalVisible.deleteProduct} />
      <ModalRegister
        isVisible={isModalVisible.newProduct}
        categories={categories.data}
      />
      <ModalIngredients isVisible={isModalVisible.newIngredients} />

      <main>

        <Header>
          <div>
            <figure>
              <img src={menu} alt="icon-menu" />
              <figcaption>
                <h3>Cardápio</h3>
              </figcaption>
            </figure>

            <p>Gerencie os produtos do seu estabelecimento</p>
          </div>
        </Header>

        <Flex>
          <Nav>
            <ul>
              <MenuItem
                isActive={isActive === 'product'}
                onClick={() => setIsActive('product')}>
                Produtos
              </MenuItem>
              <MenuItem
                isActive={isActive === 'category'}
                onClick={() => setIsActive('category')}>
                Categorias
              </MenuItem>
            </ul>
          </Nav>
        </Flex>

        <TableProducts
          data={products.data}
          isChecked={isActive === 'product'}
          isLoading={products.isLoading}
        />

        <TableCategories
          data={categories.data}
          isChecked={isActive === 'category'}
          isLoading={categories.isLoading}
        />
      </main>
    </FormProvider>
  );
}

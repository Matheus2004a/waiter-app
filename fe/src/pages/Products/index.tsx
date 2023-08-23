import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

import ProductServices from '../../services/ProductServices';

import TableProducts from '../../components/Table/TableProducts';

import { Flex, Header } from '../History/styles';
import { MenuItem, Nav } from './styles';

import menu from '../../assets/images/menu.svg';
import TableCategories from '../../components/Table/TableCategories';
import CategoriesServices from '../../services/CategoriesServices';

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

  return (
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
        isVisible={isActive === 'product'}
        isLoading={products.isLoading}
      />

      <TableCategories
        data={categories.data}
        isVisible={isActive === 'category'}
        isLoading={categories.isLoading}
      />
    </main>
  );
}

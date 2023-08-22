import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ProductServices from '../../services/ProductServices';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

import Button from '../../components/Button';

import { Image, TableCustom, TdFlex, Thead } from '../../components/Table/styles';
import { Flex, Header } from '../History/styles';
import { MenuItem, Nav } from './styles';

import edit from '../../assets/images/edit.svg';
import menu from '../../assets/images/menu.svg';
import trash from '../../assets/images/trash.svg';

function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.target as HTMLImageElement;
  img.src = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
}

export default function Products() {
  const [isActive, setIsActive] = useState('products');

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ProductServices.listAll
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
              isActive={isActive === 'products'}
              onClick={() => setIsActive('products')}>
              Produtos
            </MenuItem>
            <MenuItem
              isActive={isActive === 'categories'}
              onClick={() => setIsActive('categories')}>
              Categorias
            </MenuItem>
          </ul>
        </Nav>
      </Flex>

      <Flex>
        <div>
          <h3>Produtos</h3>
          <strong>{data?.length}</strong>
        </div>

        <Button type='button'>Novo produto</Button>
      </Flex>

      {isLoading && <h4>Carregando...</h4>}

      <TableCustom>
        <Thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td>
                <Image
                  src={`${api.defaults.baseURL}/uploads/${item.imagePath}`}
                  alt="image-product"
                  onError={handleImageFallback}
                />
              </td>
              <td>{item.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <TdFlex>
                <button>
                  <img src={edit} alt="icon-edit" />
                </button>
                <button>
                  <img src={trash} alt="icon-trash" />
                </button>
              </TdFlex>
            </tr>
          ))}
        </tbody>
      </TableCustom>
    </main>
  );
}

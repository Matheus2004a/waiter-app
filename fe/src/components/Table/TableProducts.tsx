import { api } from '../../services/api';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';

import Button from '../Button';
import { Spinner } from '../Spinner';

import { Flex } from '../../pages/History/styles';
import { Image, TableCustom, TdFlex, Thead } from './styles';

import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';

interface TableProductsProps {
  data: Product[];
  isVisible: boolean;
  isLoading: boolean;
}

function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.target as HTMLImageElement;
  img.src = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
}

export default function TableProducts({ data, isVisible, isLoading }: TableProductsProps) {
  if (!isVisible) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Flex>
        <div>
          <h3>Produtos</h3>
          <strong>{data.length}</strong>
        </div>

        <Button type='button'>Novo produto</Button>
      </Flex>

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
          {data.map((item) => (
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
    </>
  );
}

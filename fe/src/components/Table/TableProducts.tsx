import useProductsModal from '../../hooks/useProductsModal';
import { api } from '../../services/api';
import { Product } from '../../types/Product';
import { handleImageFallback } from '../../utils/fallbackImg';
import { formatCurrency } from '../../utils/formatCurrency';

import Button from '../Button';
import { Spinner } from '../Spinner';

import { Flex } from '../../pages/History/styles';
import { Image, TableCustom, TdFlex, Thead } from './styles';

import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';

interface TableProductsProps {
  data: Product[];
  isChecked: boolean;
  isLoading: boolean;
}

export default function TableProducts({ data, isChecked, isLoading }: TableProductsProps) {
  if (!isChecked) return null;

  if (isLoading) return <Spinner />;

  const { isModalVisible, handleModalVisible } = useProductsModal();

  return (
    <>
      <Flex>
        <div>
          <h3>Produtos</h3>
          <strong>{data.length}</strong>
        </div>

        <Button
          type='button'
          onClick={()=> handleModalVisible('newProduct', !isModalVisible.newProduct)}
        >
          Novo produto
        </Button>
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
                <Button>
                  <img src={edit} alt="icon-edit" />
                </Button>
                <Button
                  onClick={() => handleModalVisible(
                    'deleteProduct',
                    !isModalVisible.deleteProduct,
                    item
                  )}>
                  <img src={trash} alt="icon-trash" />
                </Button>
              </TdFlex>
            </tr>
          ))}
        </tbody>
      </TableCustom>
    </>
  );
}

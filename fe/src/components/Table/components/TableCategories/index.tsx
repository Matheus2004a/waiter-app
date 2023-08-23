import { useCallback, useState } from 'react';
import { Category } from '../../../../types/Categories';

import { Spinner } from '../../../Spinner';
import { ModalCategories } from '../ModalCategories';

import { Flex } from '../../../../pages/History/styles';
import { TableCustom, TdFlex, Thead } from '../../styles';

import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';

interface TableCategoriesProps {
  data: Category[];
  isVisible: boolean;
  isLoading: boolean;
}

export default function TableCategories({ data, isVisible, isLoading }: TableCategoriesProps) {
  if (!isVisible) return null;

  if (isLoading) return <Spinner />;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisible = useCallback(() => {
    setIsModalVisible((prevState) => !prevState ? true : false);
  }, []);

  return (
    <>
      <ModalCategories
        isModalVisible={isModalVisible}
        onModalVisible={handleModalVisible}
      />

      <Flex>
        <div>
          <h3>Categorias</h3>
          <strong>{data.length}</strong>
        </div>

        <button onClick={handleModalVisible}>
          Nova categoria
        </button>
      </Flex>

      <TableCustom>
        <Thead>
          <tr>
            <th>Emoji</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                {item.icon}
              </td>
              <td>{item.name}</td>
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

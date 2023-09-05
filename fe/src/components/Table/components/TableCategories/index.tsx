import { useCallback, useState } from 'react';
import { Category } from '../../../../types/Categories';

import { Spinner } from '../../../Spinner';
import { ModalCategories } from '../ModalCategories';

import { Flex } from '../../../../pages/History/styles';
import { TableCustom, TdFlex, Thead } from '../../styles';

import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';
import { ModalDeleteCategory } from '../ModalDeleteCategory';
import { ModalEditCategory } from '../ModalEditCategory';

interface TableCategoriesProps {
  data: Category[];
  isChecked: boolean;
  isLoading: boolean;
}

export default function TableCategories({ data, isChecked, isLoading }: TableCategoriesProps) {
  if (!isChecked) return null;

  if (isLoading) return <Spinner />;

  const [isModalVisible, setIsModalVisible] = useState({
    newCategory: false,
    editCategory: false,
    deleteCategory: false,
  });

  const [categorySelected, setCategorySelected] = useState({} as Category);

  const handleModalVisible = useCallback((key: string, value: boolean) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  function handleItem(key: string, value: boolean, item: Category) {
    handleModalVisible(key, value);

    setCategorySelected(item);
  }

  return (
    <>
      <ModalCategories
        isModalVisible={isModalVisible.newCategory}
        onModalVisible={handleModalVisible}
      />

      <ModalEditCategory
        isModalVisible={isModalVisible.editCategory}
        onModalVisible={handleModalVisible}
        item={categorySelected}
      />

      <ModalDeleteCategory
        isModalVisible={isModalVisible.deleteCategory}
        onModalVisible={handleModalVisible}
        item={categorySelected}
      />

      <Flex>
        <div>
          <h3>Categorias</h3>
          <strong>{data.length}</strong>
        </div>

        <button onClick={() => handleModalVisible('newCategory', !isModalVisible.newCategory)}>
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
                <button
                  onClick={() => handleItem('editCategory', !isModalVisible.editCategory, item)}
                >
                  <img src={edit} alt="icon-edit" />
                </button>
                <button
                  onClick={() => handleItem('deleteCategory', !isModalVisible.deleteCategory, item)}
                >
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

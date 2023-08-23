import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import CategoriesServices from '../../../../services/CategoriesServices';
import { Category, FormDataCategory } from '../../../../types/Categories';
import { schemaCategories } from '../../../../validations/schemaCategories';

import Button from '../../../Button';
import Modal from '../../../Modal';
import { Spinner } from '../../../Spinner';

import { Flex } from '../../../../pages/History/styles';
import { TableCustom, TdFlex, Thead } from '../../styles';
import { Fieldset, Form } from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';

interface TableCategoriesProps {
  data: Category[];
  isVisible: boolean;
  isLoading: boolean;
}

async function submitData(data: FormDataCategory) {
  const newCategory = await CategoriesServices.create(data);

  return newCategory;
}

export default function TableCategories({ data, isVisible, isLoading }: TableCategoriesProps) {
  if (!isVisible) return null;

  if (isLoading) return <Spinner />;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataCategory>({
    resolver: zodResolver(schemaCategories)
  });

  return (
    <>
      <Modal isVisible={isModalVisible}>
        <header>
          <h2>Nova Categoria</h2>

          <button onClick={() => setIsModalVisible(false)}>
            <img src={closeIcon} alt="icon-close" />
          </button>
        </header>

        <Form onSubmit={handleSubmit(submitData)}>
          <Fieldset isInvalid={errors.icon}>
            <label htmlFor="emoji">Emoji</label>
            <input
              type="text"
              id="emoji"
              placeholder='Ex: 🧀'
              {...register('icon')}
            />
            {errors.icon &&
              <span>{errors.icon.message}</span>
            }
          </Fieldset>

          <Fieldset isInvalid={errors.name}>
            <label htmlFor="category">Nome da categoria</label>
            <input
              type="text"
              id="category"
              placeholder='Ex: Lanches'
              {...register('name')}
            />
            {errors.name &&
              <span>{errors.name.message}</span>
            }
          </Fieldset>

          <Button type='submit'>
            Salvar Alterações
          </Button>
        </Form>
      </Modal>

      <Flex>
        <div>
          <h3>Categorias</h3>
          <strong>{data.length}</strong>
        </div>

        <button onClick={() => setIsModalVisible(true)}>
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

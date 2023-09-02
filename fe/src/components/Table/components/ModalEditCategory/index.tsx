import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CategoryProps, FormDataCategory } from '../../../../types/Categories';
import { updateCategory } from '../../../../utils/actionsCategories';
import { schemaCategories } from '../../../../validations/schemaCategories';

import Button from '../../../Button';
import Modal from '../../../Modal';
import { Spinner } from '../../../Spinner';

import { Flex } from '../../../../pages/History/styles';
import { Fieldset, Form } from '../../../Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

export function ModalEditCategory({ isModalVisible, onModalVisible, item }: CategoryProps) {
  if (!isModalVisible) return null;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataCategory>({
    defaultValues: {
      icon: item.icon,
      name: item.name
    },
    resolver: zodResolver(schemaCategories),
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success('Categoria atualizada com sucesso');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('categories');
    }
  });

  function onSubmit(data: FormDataCategory) {
    const newCategory = { ...data, _id: item._id };

    mutate(newCategory);
  }

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Editar Categoria</h2>

        <Button
          type='button'
          onClick={() => onModalVisible('editCategory', !isModalVisible)}
        >
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset isInvalid={errors.icon}>
          <label htmlFor="emoji">Emoji</label>
          <input
            type="text"
            id="emoji"
            placeholder='Ex: 🧀'
            {...register('icon')}
          />
          {errors.icon && <span>{errors.icon.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.name}>
          <label htmlFor="category">Nome da categoria</label>
          <input
            type="text"
            id="category"
            placeholder='Ex: Lanches'
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </Fieldset>

        <Flex style={{ justifyContent: 'flex-end', margin: 0 }}>
          <Button
            type='reset'
            onClick={() => onModalVisible('editCategory', !isModalVisible)}
          >
            Excluir Categoria
          </Button>
          <Button
            type='submit'
            isDisabled={isDisableButton || isLoading}
          >
            {isLoading ? <Spinner /> : 'Salvar Alterações'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

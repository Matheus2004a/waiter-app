import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CategoriesServices from '../../../../services/CategoriesServices';
import { FormDataCategory } from '../../../../types/Categories';
import { ModalProps } from '../../../../types/Modal';
import { schemaCategories } from '../../../../validations/schemaCategories';

import Button from '../../../Button';
import Modal from '../../../Modal';
import { Spinner } from '../../../Spinner';

import { Flex } from '../../../../pages/History/styles';
import { Fieldset, Form } from '../../../Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

async function createCategory(data: FormDataCategory) {
  const newCategory = await CategoriesServices.create(data);

  return newCategory;
}

export function ModalCategories({ isModalVisible, onModalVisible }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataCategory>({
    resolver: zodResolver(schemaCategories)
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: (data) => {
      toast.success(data.message);
      onModalVisible('newCategory', !isModalVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('categories');
    }
  });

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Nova Categoria</h2>

        <Button
          type='button'
          onClick={() => onModalVisible('newCategory', !isModalVisible)}
        >
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Form onSubmit={handleSubmit((data) => mutate(data))}>
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

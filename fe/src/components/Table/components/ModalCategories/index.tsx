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

  const createCategoryMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    }
  });

  async function onSubmit(data: FormDataCategory) {
    try {
      // Executar a mutação passando os dados necessários
      const newCategory = await createCategoryMutation.mutateAsync(data);

      toast.success(newCategory.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Nova Categoria</h2>

        <button onClick={onModalVisible}>
          <img src={closeIcon} alt="icon-close" />
        </button>
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

        <Flex style={{ justifyContent: 'flex-end', margin: 0 }}>
          <Button
            type='submit'
            isDisabled={isDisableButton || createCategoryMutation.isLoading}
          >
            {createCategoryMutation.isLoading ? <Spinner /> : 'Salvar Alterações'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

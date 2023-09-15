import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CategoryProps, FormDataCategory } from '../../../../types/Categories';

import Button from '../../../Button';
import Modal from '../../../Modal';
import { Spinner } from '../../../Spinner';

import { Content, Footer, Form } from '../../../Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import { Paragraph } from '../../../../pages/Users/components/ModalDelete/styles';
import { deleteCategory } from '../../../../utils/actionsCategories';

export function ModalDeleteCategory({ isModalVisible, onModalVisible, item }: CategoryProps) {
  if (!isModalVisible) return null;

  const {
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataCategory>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteCategory, {
    onSuccess: (data) => {
      toast.success(data.message);
      onModalVisible('deleteCategory', !isModalVisible);
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
        <h2>Excluir Categoria</h2>

        <Button onClick={() => onModalVisible('deleteCategory', !isModalVisible)}>
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Paragraph>Tem certeza que deseja excluir a categoria?</Paragraph>

      <Form onSubmit={handleSubmit(() => mutate(item))}>
        <Content>
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </Content>

        <Footer>
          <Button
            type='reset'
            onClick={() => onModalVisible('deleteCategory', !isModalVisible)}>
            Manter Categoria
          </Button>
          <Button
            type='submit'
            isDisabled={isDisableButton || isLoading}
          >
            {isLoading ? <Spinner /> : 'Excluir categoria'}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

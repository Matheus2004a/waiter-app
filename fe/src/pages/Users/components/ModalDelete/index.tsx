import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import UserServices from '../../../../services/UserServices';
import { ModalProps } from '../../../../types/Modal';
import { Users } from '../../../../types/Users';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

import { Fieldset, Form } from '../../../../components/Form/styles';
import { Footer, Paragraph } from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

async function createUser({ _id }: Users) {
  const newCategory = await UserServices.delete(_id);

  return newCategory;
}

export function ModalDelete({ isModalVisible, onModalVisible }: ModalProps) {
  const { register, handleSubmit } = useForm<Users>({
    defaultValues: {
      name: 'Fulano de Tal',
      email: 'fulano@gmail.com'
    }
  });

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  async function onSubmit(data: Users) {
    try {
      const deletedUser = await deleteUserMutation.mutateAsync(data);

      toast.success(deletedUser.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Excluir Usuário</h2>

        <button onClick={onModalVisible}>
          <img src={closeIcon} alt="icon-close" />
        </button>
      </header>

      <Paragraph>Tem certeza que deseja excluir o usuário?</Paragraph>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            disabled
            {...register('name')}
          />
        </Fieldset>

        <Fieldset>
          <label htmlFor="email">Nome da categoria</label>
          <input
            type="text"
            id="email"
            disabled
            {...register('email')}
          />
        </Fieldset>

        <Footer>
          <button
            type='button'
            onClick={onModalVisible}
          >
            Manter Usuário
          </button>
          <Button type='submit'>Excluir Usuário</Button>
        </Footer>
      </Form>
    </Modal>
  );
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import UserServices from '../../../../services/UserServices';
import { TableUsersProps, Users } from '../../../../types/Users';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

import { Fieldset, Form } from '../../../../components/Form/styles';
import { Footer, Paragraph } from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import { Spinner } from '../../../../components/Spinner';

async function deleteUser({ _id }: Users) {
  const userDeleted = await UserServices.delete(_id);

  return userDeleted;
}

export function ModalDelete({ data, isModalVisible, onModalVisible }: TableUsersProps) {
  if (!isModalVisible) return null;

  const { register, handleSubmit } = useForm<Users>({
    defaultValues: {
      name: data.name,
      email: data.email
    }
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      onModalVisible('deleteUser', !isModalVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('users');
    }
  });

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Excluir Usuário</h2>

        <Button onClick={() => onModalVisible('deleteUser', !isModalVisible)}>
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Paragraph>Tem certeza que deseja excluir o usuário?</Paragraph>

      <Form onSubmit={handleSubmit(() => mutate(data))}>
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
          <Button
            type='button'
            onClick={() => onModalVisible('deleteUser', !isModalVisible)}
          >
            Manter Usuário
          </Button>
          <Button type='submit' isDisabled={isLoading}>
            {isLoading ? <Spinner /> : 'Excluir Usuário'}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

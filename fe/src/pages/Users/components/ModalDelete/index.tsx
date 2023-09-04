import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useModal from '../../../../hooks/useModal';
import { Users } from '../../../../types/Users';
import { deleteUser } from '../../../../utils/deleteUser';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { Fieldset, Form } from '../../../../components/Form/styles';
import { Footer, Paragraph } from './styles';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import closeIcon from '../../../../assets/images/close-icon.svg';

export function ModalDelete({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  const { handleModalVisible, userSelected } = useModal();

  const { register, handleSubmit } = useForm<Users>({
    defaultValues: {
      name: userSelected.name,
      email: userSelected.email
    }
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      handleModalVisible('deleteUser', !isVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('users');
    }
  });

  return (
    <Modal isVisible={isVisible}>
      <header>
        <h2>Excluir Usuário</h2>

        <Button onClick={() => handleModalVisible('deleteUser', !isVisible)}>
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Paragraph>Tem certeza que deseja excluir o usuário?</Paragraph>

      <Form onSubmit={handleSubmit(() => mutate(userSelected))}>
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
            onClick={() => handleModalVisible('deleteUser', !isVisible)}
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

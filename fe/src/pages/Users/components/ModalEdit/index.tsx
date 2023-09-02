import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import UserServices from '../../../../services/UserServices';
import { TableUsersProps, Users } from '../../../../types/Users';
import { schemaRegister } from '../../../../validations/schemaRegister';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { Fieldset, Footer, Form, RadioGroup } from '../../../../components/Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

async function updateUser(data: Users) {
  const newUser = await UserServices.update(data);

  return newUser;
}

export function ModalEdit({ data, isModalVisible, onModalVisible }: TableUsersProps) {
  if (!isModalVisible) return null;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Users>({
    defaultValues: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    resolver: zodResolver(schemaRegister)
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      onModalVisible('updateUser', !isModalVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Editar Usuário</h2>

        <Button
          type='button'
          onClick={() => onModalVisible('updateUser', !isModalVisible)}
        >
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Form onSubmit={handleSubmit((newData) => mutate({ ...newData, _id: data._id }))}>
        <Fieldset isInvalid={errors.name}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="emoji"
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.password}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.role}>
          <legend>Tipo</legend>

          <RadioGroup>
            <div>
              <input
                type="radio"
                id="admin"
                value="Admin"
                {...register('role')}
              />
              <label htmlFor="admin">Admin</label>
            </div>

            <div>
              <input
                type="radio"
                id="waiter"
                value="Garçom"
                {...register('role')}
              />
              <label htmlFor="waiter">Garçom</label>
            </div>
          </RadioGroup>
          {errors.role && <span>{errors.role.message}</span>}
        </Fieldset>

        <Footer>
          <Button
            type='submit'
            isDisabled={isDisableButton || isLoading}
            hasChildren
          >
            {isLoading ? <Spinner /> : 'Salvar Alterações'}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

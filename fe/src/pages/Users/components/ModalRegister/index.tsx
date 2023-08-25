import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import UserServices from '../../../../services/UserServices';
import { ModalProps } from '../../../../types/Modal';
import { Users } from '../../../../types/Users';
import { schemaRegister } from '../../../../validations/schemaRegister';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { Fieldset, Form, RadioGroup } from '../../../../components/Form/styles';
import { Flex } from '../../../History/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

async function createUser(data: Users) {
  const newUser = await UserServices.create(data);

  return newUser;
}

export function ModalRegister({ isModalVisible, onModalVisible }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Users>({
    resolver: zodResolver(schemaRegister)
  });

  const queryClient = useQueryClient();

  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  async function onSubmit(data: Users) {
    try {
      const newUser = await createUserMutation.mutateAsync(data);

      toast.success(newUser.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isModalVisible}>
      <header>
        <h2>Novo Usuário</h2>

        <button onClick={onModalVisible}>
          <img src={closeIcon} alt="icon-close" />
        </button>
      </header>

      <Form onSubmit={handleSubmit(onSubmit)}>
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

          <Flex style={{ justifyContent: 'flex-start', gap: '32px' }}>
            <RadioGroup>
              <label htmlFor="admin">
                <input
                  type="radio"
                  id="admin"
                  value="Admin"
                  {...register('role')}
                />
                Admin
              </label>

              <label htmlFor="waiter">
                <input
                  type="radio"
                  id="waiter"
                  value="Garçom"
                  {...register('role')}
                />
                Garçom
              </label>
            </RadioGroup>
          </Flex>
          {errors.role && <span>{errors.role.message}</span>}
        </Fieldset>

        <Flex style={{ margin: 0 }}>
          <Button
            type='submit'
            isDisabled={isDisableButton || createUserMutation.isLoading}
          >
            {createUserMutation.isLoading ? <Spinner /> : 'Cadastrar usuário'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import UserServices from '../../../../services/UserServices';
import { Users } from '../../../../types/Users';
import { schemaRegister } from '../../../../validations/schemaRegister';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { Fieldset, Form, RadioGroup } from '../../../../components/Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import useModal from '../../../../hooks/useModal';
import useVisiblePassword from '../../../../hooks/useVisiblePassword';

async function createUser(data: Users) {
  const newUser = await UserServices.create(data);

  return newUser;
}

export function ModalRegister({ isVisible }: { isVisible: boolean }) {
  const { handleModalVisible } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Users>({
    resolver: zodResolver(schemaRegister)
  });

  const { visiblePassword, handleVisiblePassword, eyeStatus } = useVisiblePassword();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      toast.success(data.message);
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
    <Modal isVisible={isVisible}>
      <header>
        <h2>Novo Usuário</h2>

        <Button
          type='button'
          onClick={() => handleModalVisible('newUser', !isVisible)}
        >
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Form onSubmit={handleSubmit((data) => mutate(data))}>
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
            type={visiblePassword}
            id="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <span onClick={handleVisiblePassword} className='eye'>
            {eyeStatus}
          </span>
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

        <Button
          type='submit'
          isDisabled={isDisableButton || isLoading}
          hasChildren
        >
          {isLoading ? <Spinner /> : 'Cadastrar usuário'}
        </Button>
      </Form>
    </Modal>
  );
}

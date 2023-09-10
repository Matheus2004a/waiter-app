import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import UserServices from '../../services/UserServices';
import { FormData } from '../../types/Login';

import infoError from '../../assets/images/info.svg';

import { ErrorMessage } from './style';

interface LoginDataProps {
  token: string;
}

async function loginUser(dataUser: FormData) {
  const login = await UserServices.login(dataUser);

  return login;
}

export default function useLogin(setError: UseFormSetError<FormData>) {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: submitLogin, isLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: (data: LoginDataProps) => {
      signin(data.token);
      navigate('/orders');
      queryClient.invalidateQueries('login');
    },
    onError(error: AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        return setError('password', {
          message: 'Falha ao fazer login. Tente novamente mais tarde'
        });
      }

      setError('password', { message: error.response?.data?.message });
    },
  });

  function renderErrorMessage(message: string | undefined) {
    return (
      <ErrorMessage>
        <img src={infoError} alt="icon-error" />
        <span>{message}</span>
      </ErrorMessage>
    );
  }

  return {
    isLoading,
    submitLogin,
    renderErrorMessage,
  };
}

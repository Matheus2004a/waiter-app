import { useCallback, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { api } from '../../services/api';
import { FormData } from '../../types/Login';

import infoError from '../../assets/images/info.svg';

import { ErrorMessage } from './style';

interface LoginDataProps {
  token: string,
}

export default function useLogin(setError: UseFormSetError<FormData>) {
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState('password');

  const navigate = useNavigate();
  const { signin } = useAuth();

  function handleVisiblePassword() {
    setVisiblePassword((prevState) => prevState === 'password' ? 'text' : 'password');
  }

  const submitLogin = useCallback(async (dataUser: FormData) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<LoginDataProps>('/login', dataUser);

      signin(data.token);
      navigate('/orders');
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        return setError('password', {
          message: 'Falha ao fazer login. Tente novamente mais tarde'
        });
      }

      const { data, status } = error.response;

      if (status === 401) {
        setError('password', { message: data.message });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    visiblePassword,
    handleVisiblePassword,
    submitLogin,
    renderErrorMessage,
  };
}

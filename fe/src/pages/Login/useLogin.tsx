import { useCallback, useState } from 'react';
import { api } from '../../services/api';

import { FormData } from '../../types/Login';

import infoError from '../../assets/images/info.svg';
import { ErrorMessage } from './style';

export default function useLogin(setError: any) {
  const [visiblePassword, setVisiblePassword] = useState('password');

  function handleVisiblePassword() {
    setVisiblePassword((prevState) => prevState === 'password' ? 'text' : 'password');
  }

  const submitLogin = useCallback(async (dataUser: FormData) => {
    try {
      const { data } = await api.post('/login', dataUser);

      localStorage.setItem('token', data.token);
    } catch (error: any) {
      const { data, status } = error.response;

      if (status === 401) {
        setError('password', { message: data.message });
      }
    }
  }, []);

  function renderErrorMessage(message: string) {
    return (
      <ErrorMessage>
        <img src={infoError} alt="icon-error" />
        <span>{message}</span>
      </ErrorMessage>
    );
  }

  return {
    visiblePassword,
    handleVisiblePassword,
    submitLogin,
    renderErrorMessage,
  };
}

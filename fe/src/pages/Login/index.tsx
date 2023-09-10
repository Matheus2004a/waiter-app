import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormData } from '../../types/Login';
import { schemaLogin } from '../../validations/schemaLogin';
import useLogin from './useLogin';

import { Spinner } from '../../components/Spinner';
import { Container, Fieldset, Form, SectionWelcome, StyledButton } from './style';

import useVisiblePassword from '../../hooks/useVisiblePassword';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
  });

  const {
    isLoading, submitLogin, renderErrorMessage
  } = useLogin(setError);

  const { visiblePassword, handleVisiblePassword, eyeStatus } = useVisiblePassword();

  const isDisabledButton = Object.keys(errors).length > 0;

  return (
    <Container>
      <SectionWelcome>
        <h4>Bem-vindo(a) ao</h4>
        <p><strong>Waiter</strong>App</p>
      </SectionWelcome>

      <Form onSubmit={handleSubmit((data) => submitLogin(data))}>
        <Fieldset isInvalid={errors.email}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder='Seu e-mail de acesso'
            id='email'
            {...register('email')}
          />
          {errors.email &&
            <span className='feedback-error'>
              {renderErrorMessage(errors.email?.message)}
            </span>
          }
        </Fieldset>

        <Fieldset isInvalid={errors.password}>
          <label htmlFor="password">Senha</label>
          <input
            type={visiblePassword}
            placeholder='Informe sua senha'
            id='password'
            {...register('password')}
          />
          {errors.password &&
            <span className='feedback-error'>
              {renderErrorMessage(errors.password?.message)}
            </span>
          }

          <span onClick={handleVisiblePassword} className='eye'>
            {eyeStatus}
          </span>
        </Fieldset>

        <StyledButton
          type='submit'
          disabled={isDisabledButton || isLoading}
        >
          {isLoading ? <Spinner /> : 'Fazer Login'}
        </StyledButton>
      </Form>
    </Container>
  );
}

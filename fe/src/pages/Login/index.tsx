import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaLogin } from '../../validations/schemaLogin';
import { FormData } from '../../types/Login';

import { Container, Fieldset, Form, SectionWelcome, StyledButton } from './style';

import eye from '../../assets/images/eye.svg';
import eyeHidden from '../../assets/images/eye-hidden.svg';
import useLogin from './useLogin';

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
    visiblePassword, handleVisiblePassword,
    submitLogin, renderErrorMessage
  } = useLogin(setError);

  const isDisabledButton = Object.keys(errors).length > 0;

  return (
    <Container>
      <SectionWelcome>
        <h4>Bem-vindo(a) ao</h4>
        <p><strong>Waiter</strong>App</p>
      </SectionWelcome>

      <Form onSubmit={handleSubmit(submitLogin)}>
        <Fieldset isInvalid={errors.email?.message}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder='Seu e-mail de acesso'
            id='email'
            {...register('email')}
          />
          {errors.email &&
            <span className='feedback-error'>
              {renderErrorMessage(errors.email.message)}
            </span>
          }
        </Fieldset>

        <Fieldset isInvalid={errors.password?.message}>
          <label htmlFor="password">Senha</label>
          <input
            type={visiblePassword}
            placeholder='Informe sua senha'
            id='password'
            {...register('password')}
          />
          {errors.password &&
            <span className='feedback-error'>
              {renderErrorMessage(errors.password.message)}
            </span>
          }

          <span onClick={handleVisiblePassword} className='eye'>
            {visiblePassword === 'text' && <img src={eyeHidden} alt="icon-eye-hidden" />}
            {visiblePassword === 'password' && <img src={eye} alt="icon-eye" />}
          </span>
        </Fieldset>

        <StyledButton
          type="submit"
          disabled={isDisabledButton}
        >
          Fazer Login
        </StyledButton>
      </Form>
    </Container>
  );
}

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaLogin } from '../../validations/schemaLogin';

import { Container, Fieldset, Form, SectionWelcome, StyledButton } from './style';

import eye from '../../assets/images/eye.svg';
import eyeHidden from '../../assets/images/eye-hidden.svg';

type FormData = {
  email: string;
  password: string;
}

export default function Login() {
  const [visiblePassword, setVisiblePassword] = useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
  });

  function handleVisiblePassword() {
    setVisiblePassword((prevState) => prevState === 'password' ? 'text' : 'password');
  }

  function submitLogin(data: FormData) {
    console.log(data);
  }

  const isDisabledButton = Object.keys(errors).length > 0 || isLoading;

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
          {errors.email && <span className='feedback-error'>{errors.email.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.password?.message}>
          <label htmlFor="password">Senha</label>
          <input
            type={visiblePassword}
            placeholder='Informe sua senha'
            id='password'
            {...register('password')}
          />
          {errors.password && <span className='feedback-error'>{errors.password.message}</span>}

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

import Button from '../../components/Button';

import { Container, Fieldset, Form, SectionWelcome } from './style';

import eye from '../../assets/images/eye.svg';

export default function Login() {
  return (
    <Container>
      <SectionWelcome>
        <h4>Bem-vindo(a) ao</h4>
        <p><strong>Waiter</strong>App</p>
      </SectionWelcome>

      <Form>
        <Fieldset>
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder='Seu e-mail de acesso' id='email' />
        </Fieldset>

        <Fieldset>
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder='Informe sua senha' id='password' />

          <span>
            <img src={eye} alt="icon-eye" />
          </span>
        </Fieldset>

        <Button type="submit">Fazer Login</Button>
      </Form>
    </Container>
  );
}

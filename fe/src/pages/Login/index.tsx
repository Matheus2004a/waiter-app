import Button from '../../components/Button';

import { Container } from './style';

export default function Login() {
  return (
    <Container>
      <h3>Bem-vindo(a) ao</h3>
      <h1><strong>WaiterApp</strong></h1>

      <form action="">
        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder='Seu e-mail de acesso' id='email' />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Senha</label>
          <input type="email" placeholder='Informe sua senha' id='password' />
        </fieldset>

        <Button>Fazer Login</Button>
      </form>
    </Container>
  );
}

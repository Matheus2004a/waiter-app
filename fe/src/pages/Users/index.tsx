import { Flex, Header } from '../History/styles';

import users from '../../assets/images/users.svg';

export default function Users() {
  return (
    <main>
      <Header>
        <div>
          <figure>
            <img src={users} alt="icon-users" />
            <figcaption>
              <h3>Usuário</h3>
            </figcaption>
          </figure>

          <p>Cadastre e gerencie seus usuários</p>
        </div>
      </Header>

      <Flex>
        <h3>Usuários</h3>
      </Flex>
    </main>
  );
}

import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import UserServices from '../../services/UserServices';

import { Flex, Header } from '../History/styles';

import { TableUsers } from '../../components/Table/components/TableUsers';

import users from '../../assets/images/users.svg';
import { ModalRegister } from './components/ModalRegister';

export default function Users() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisible = useCallback(() => {
    setIsModalVisible((prevState) => !prevState);
  }, []);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: UserServices.listAll
  });

  return (
    <>
      <ModalRegister
        isModalVisible={isModalVisible}
        onModalVisible={handleModalVisible}
      />

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
          <div>
            <h3>Usuários</h3>
            <strong>{data?.length}</strong>
          </div>

          <button onClick={handleModalVisible}>Novo usuário</button>
        </Flex>

        <TableUsers data={data} />
      </main>
    </>
  );
}

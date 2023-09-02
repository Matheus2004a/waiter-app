import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import UserServices from '../../services/UserServices';
import { Users as UsersType } from '../../types/Users';

import { TableUsers } from '../../components/Table/components/TableUsers';
import { ModalDelete } from './components/ModalDelete';
import { ModalRegister } from './components/ModalRegister';

import { Flex, Header } from '../History/styles';

import users from '../../assets/images/users.svg';
import Button from '../../components/Button';

export default function Users() {
  const [isModalVisible, setIsModalVisible] = useState({
    newUser: false,
    deleteUser: false,
  });

  const [userSelected, setUserSelected] = useState({} as UsersType);

  const handleModalVisible = useCallback((key: string, value: boolean, item?: UsersType) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    if (item) setUserSelected(item);
  }, []);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: UserServices.listAll
  });

  return (
    <>
      <ModalRegister
        isModalVisible={isModalVisible.newUser}
        onModalVisible={handleModalVisible}
      />

      <ModalDelete
        data={userSelected}
        isModalVisible={isModalVisible.deleteUser}
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

          <Button
            type='button'
            onClick={() => handleModalVisible('newUser', !isModalVisible.newUser)}
          >
            Novo usuário
          </Button>
        </Flex>

        <TableUsers
          data={data}
          isModalVisible={isModalVisible.deleteUser}
          onModalVisible={handleModalVisible}
        />
      </main>
    </>
  );
}

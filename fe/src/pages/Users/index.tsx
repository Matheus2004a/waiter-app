import { useQuery } from '@tanstack/react-query';

import useModal from '../../hooks/useModal';
import UserServices from '../../services/UserServices';

import { TableUsers } from '../../components/Table/components/TableUsers';
import { ModalDelete } from './components/ModalDelete';
import { ModalEdit } from './components/ModalEdit';
import { ModalRegister } from './components/ModalRegister';

import { Header } from '../History/styles';

import users from '../../assets/images/users.svg';

export default function Users() {
  const { isModalVisible } = useModal();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: UserServices.listAll
  });

  return (
    <>
      <ModalRegister isVisible={isModalVisible.newUser} />
      <ModalEdit isVisible={isModalVisible.updateUser} />
      <ModalDelete isVisible={isModalVisible.deleteUser} />

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

        <TableUsers data={data} />
      </main>
    </>
  );
}

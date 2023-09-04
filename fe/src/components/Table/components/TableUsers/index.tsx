import useModal from '../../../../hooks/useModal';
import { Users } from '../../../../types/Users';

import Button from '../../../Button';

import { Flex } from '../../../../pages/History/styles';
import { TableCustom, TdFlex, Thead } from '../../styles';

import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';

export function TableUsers({ data }: { data: Users[] }) {
  const { isModalVisible, handleModalVisible } = useModal();

  return (
    <>
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

      <TableCustom>
        <Thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <TdFlex>
                <Button
                  onClick={() => handleModalVisible('updateUser', !isModalVisible.updateUser, item)}
                >
                  <img src={edit} alt="icon-edit" />
                </Button>
                <Button
                  onClick={() => handleModalVisible('deleteUser', !isModalVisible.deleteUser, item)}
                >
                  <img src={trash} alt="icon-trash" />
                </Button>
              </TdFlex>
            </tr>
          ))}
        </tbody>
      </TableCustom>
    </>
  );
}

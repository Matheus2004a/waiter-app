import { Users } from '../../../../types/Users';

import Button from '../../../Button';

import { TableCustom, TdFlex, Thead } from '../../styles';

import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';
import { ModalProps } from '../../../../types/Modal';

type TableUsersProps = ModalProps & {
  data: Users[]
}

export function TableUsers({ data, isModalVisible, onModalVisible }: TableUsersProps) {
  return (
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
              <Button>
                <img src={edit} alt="icon-edit" />
              </Button>
              <Button
                onClick={() => onModalVisible('deleteUser', !isModalVisible, item)}
              >
                <img src={trash} alt="icon-trash" />
              </Button>
            </TdFlex>
          </tr>
        ))}
      </tbody>
    </TableCustom>
  );
}


import { TableCustom, TdFlex, Thead } from '../../styles';

import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';
import { Users } from '../../../../types/Users';

interface TableUsersProps {
  data: Users[]
}

export function TableUsers({ data }: TableUsersProps) {
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
              <button>
                <img src={edit} alt="icon-edit" />
              </button>
              <button>
                <img src={trash} alt="icon-trash" />
              </button>
            </TdFlex>
          </tr>
        ))}
      </tbody>
    </TableCustom>
  );
}

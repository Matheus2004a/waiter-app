import { icons } from '../../components/Sidebar/icons';

import { formatDate } from '../../utils/formatDate';
import useOrders from '../Orders/useOrders';

import { Actions, TableCustom, Thead } from '../../components/Table/styles';
import { Flex, Header } from './styles';

import eye from '../../assets/images/eye.svg';
import trash from '../../assets/images/trash.svg';

export function History() {
  const { orders } = useOrders();

  return (
    <main>
      <Header>
        <div>
          <figure>
            <img src={icons[1].path} alt={icons[1].title} />
            <figcaption>
              <h3>{icons[1].title}</h3>
            </figcaption>
          </figure>

          <p>Visualize pedidos anteriores</p>
        </div>
      </Header>

      <Flex>
        <h3>Pedidos</h3>
        <strong>{orders.length}</strong>
      </Flex>

      <TableCustom>
        <Thead>
          <tr>
            <th>Mesa</th>
            <th>Data</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.table}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{order.status}</td>
              <Actions>
                <button>
                  <img src={eye} alt="icon-eye" />
                </button>

                <button>
                  <img src={trash} alt="icon-trash" />
                </button>
              </Actions>
            </tr>
          ))}
        </tbody>
      </TableCustom>
    </main>
  );
}

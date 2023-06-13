import { OrdersBoard } from './components/OrdersBoard';
import { Order } from '../../types/Order';

import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '6483fdbf4c051c8b16690574',
    table: '3',
    status: 'WAITING',
    products: [
      {
        _id: '6483ec573accb32bfdea84dd',
        quantity: 1,
        product: {
          name: 'Bolo',
          price: 20,
          imagePath: 'https://assets.unileversolutions.com/recipes-v2/67405.jpg'
        }
      }
    ]
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={orders}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={orders}
      />
    </Container>
  );
}

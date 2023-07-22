import useOrders from './useOrders';

import Sidebar from '../../components/Sidebar';
import { icons } from '../../components/Sidebar/icons';
import { OrdersBoard } from './components/OrdersBoard';

import { ButtonRefreshDay, Container, ContainerOrders, Header } from './styles';

import refresh from '../../assets/images/refresh.svg';

export function Orders() {
  const { waiting, inProduction, done, handleCancelOrder, handleOrderStatusChange } = useOrders();

  return (
    <Container>
      <Sidebar />

      <main>
        <Header>
          <div>
            <figure>
              <img src={icons[0].path} alt={icons[0].title} />
              <figcaption>
                <h3>{icons[0].title}</h3>
              </figcaption>
            </figure>

            <p>Acompanhe os pedidos dos clientes</p>
          </div>

          <ButtonRefreshDay>
            <img src={refresh} alt="icon-refresh" />
            <span>Reiniciar o dia</span>
          </ButtonRefreshDay>
        </Header>

        <ContainerOrders>
          <OrdersBoard
            icon="🕑"
            title="Fila de espera"
            orders={waiting}
            onCancelOrderBoard={handleCancelOrder}
            onOrderStatusChange={handleOrderStatusChange}
          />
          <OrdersBoard
            icon="👩‍🍳"
            title="Em produção"
            orders={inProduction}
            onCancelOrderBoard={handleCancelOrder}
            onOrderStatusChange={handleOrderStatusChange}
          />
          <OrdersBoard
            icon="✅"
            title="Pronto"
            orders={done}
            onCancelOrderBoard={handleCancelOrder}
            onOrderStatusChange={handleOrderStatusChange}
          />
        </ContainerOrders>
      </main>
    </Container>
  );
}

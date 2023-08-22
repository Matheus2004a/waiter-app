import { useState } from 'react';

import useOrders from './useOrders';

import Modal from '../../components/Modal';
import { icons } from '../../components/Sidebar/icons';
import { Footer } from './components/OrderModal/styles';
import { OrdersBoard } from './components/OrdersBoard';

import { ButtonRefreshDay, ContainerOrders, ContentModal, Header } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import refresh from '../../assets/images/refresh.svg';

export function Orders() {
  const {
    waiting, inProduction, done,
    handleCancelOrder, handleOrderStatusChange,
  } = useOrders();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Modal isVisible={isModalVisible}>
        <header>
          <figure>
            <img src={refresh} alt="icon-refresh" />
            <figcaption>
              <h2>Reiniciar o dia</h2>
            </figcaption>
          </figure>

          <button onClick={() => setIsModalVisible(false)}>
            <img src={closeIcon} alt="icon-close" />
          </button>
        </header>

        <ContentModal>
          <p>Ao reiniciar o dia, todos os pedidos serão arquivados no status atual.</p>
          <p>Deseja reiniciar o dia?</p>
        </ContentModal>

        <Footer>
          <button
            type='reset'
            onClick={() => setIsModalVisible(false)}
          >
            Não, continuar pedidos
          </button>
          <button type='button'>Sim, reiniciar o dia</button>
        </Footer>
      </Modal>

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

          <ButtonRefreshDay onClick={() => setIsModalVisible(true)}>
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
    </>
  );
}

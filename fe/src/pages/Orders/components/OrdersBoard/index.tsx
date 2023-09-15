import { useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../../../../types/Order';
import { OrderModal } from '../OrderModal';

import Button from '../../../../components/Button';
import { api } from '../../../../services/api';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrderBoard: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrderBoard,
  onOrderStatusChange
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    try {
      setIsLoading(true);

      const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

      await api.patch(`/orders/${selectedOrder?._id}`, { status });
      toast.success(`O pedido da Mesa ${selectedOrder?.table} teve o status alterado`);
      onOrderStatusChange(selectedOrder!._id, status);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    try {
      setIsLoading(true);
      await api.delete(`/orders/${selectedOrder?._id}`);
      toast.success(`O pedido da Mesa ${selectedOrder?.table} foi cancelado`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }

    onCancelOrderBoard(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onOrderStatusChange={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 &&
        <OrdersContainer>
          {orders.map((order) => (
            <Button
              key={order._id}
              type='button'
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </Button>
          ))}
        </OrdersContainer>
      }
    </Board>
  );
}

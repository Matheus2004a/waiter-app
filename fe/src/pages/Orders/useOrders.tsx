import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Order } from '../../types/Order';

import { api } from '../../services/api';

export default function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders((prevState) => [...prevState, order]);
    });
  }, []);

  async function getOrders() {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? { ...order, status } : order
    )));
  }

  return {
    orders,
    waiting,
    inProduction,
    done,
    handleCancelOrder,
    handleOrderStatusChange,
  };
}

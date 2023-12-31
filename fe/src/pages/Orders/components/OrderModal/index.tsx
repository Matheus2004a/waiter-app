import { useEffect } from 'react';

import { api } from '../../../../services/api';
import { Order } from '../../../../types/Order';

import closeIcon from '../../../../assets/images/close-icon.svg';

import { formatCurrency } from '../../../../utils/formatCurrency';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Footer, OrderContainerItem, OrderDetails } from './styles';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onOrderStatusChange: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onOrderStatusChange,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const statusOrder = {
    WAITING: {
      icon: '🕑',
      name: 'Fila de espera',
      label: 'Iniciar produção',
    },
    IN_PRODUCTION: {
      icon: '👩‍🍳',
      name: 'Em produção',
      label: 'Finalizar pedido',
    },
    DONE: {
      icon: '✅',
      name: 'Pronto',
    }
  };

  const total = order.products.reduce((accumulator, { product, quantity }) => {
    return accumulator + (product.price * quantity);
  }, 0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const statusBoards = statusOrder[order.status];

  return (
    <Modal isVisible={visible}>
      <header>
        <strong>Mesa {order.table}</strong>

        <Button onClick={onClose}>
          <img src={closeIcon} alt="close-icon" />
        </Button>
      </header>

      <div className="status-container">
        <small>Status do Pedido</small>

        <figure>
          <span>{statusBoards && statusBoards.icon}</span>
          <strong>{statusBoards && statusBoards.name}</strong>
        </figure>
      </div>

      <OrderDetails>
        <small>Itens</small>

        <OrderContainerItem>
          {order.products.map(({ _id, product, quantity }) => (
            <figure className='item' key={_id}>
              <img
                src={`${api.defaults.baseURL}/uploads/${product.imagePath}`}
                alt={product.name}
              />
              <span className='quantity'>{quantity}x</span>
              <div className='product-details'>
                <strong>{product.name}</strong>
                <small>{formatCurrency(product.price)}</small>
              </div>
            </figure>
          ))}
        </OrderContainerItem>

        <div className="total">
          <p>Total</p>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </OrderDetails>

      <Footer isOrderDone={order.status === 'DONE'}>
        <Button
          type='reset'
          onClick={onCancelOrder}
          disabled={isLoading}
        >
          Cancelar Pedido
        </Button>
        {order.status !== 'DONE' && (
          <Button
            type='button'
            disabled={isLoading}
            onClick={onOrderStatusChange}
          >
            {order.status === 'WAITING' ?
              <span>Iniciar produção</span>
              : (
                <span>Concluir pedido</span>
              )
            }
          </Button>
        )}
      </Footer>
    </Modal>
  );
}

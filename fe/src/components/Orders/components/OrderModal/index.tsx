import { Fragment, useEffect } from 'react';

import { Footer, ModalBody, OrderDetails, Overlay } from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import { Order } from '../../../../types/Order';
import { formatCurrency } from '../../../../utils/formatCurrency';

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
    },
    IN_PRODUCTION: {
      icon: '👩‍🍳',
      name: 'Em produção',
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

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button onClick={onClose}>
            <img src={closeIcon} alt="close-icon" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>

          <figure>
            <span>{statusOrder[order.status] && statusOrder[order.status].icon}</span>
            <strong>{statusOrder[order.status] && statusOrder[order.status].name}</strong>
          </figure>
        </div>

        <OrderDetails>
          <small>Itens</small>

          {order.products.map(({ _id, product, quantity }) => (
            <Fragment key={_id}>
              <figure className='item'>
                <img
                  src={`https://ff90-2804-431-c7da-f95b-5d41-3ce-1a8a-77f5.sa.ngrok.io/uploads/${product.imagePath}`}
                  alt={product.name}
                />
                <span className='quantity'>{quantity}x</span>
                <div className='product-details'>
                  <strong>{product.name}</strong>
                  <small>{formatCurrency(product.price)}</small>
                </div>
              </figure>
            </Fragment>
          ))}

          <div className="total">
            <p>Total</p>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Footer isOrderDone={order.status === 'DONE'}>
          <button
            type='reset'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
          {order.status !== 'DONE' && (
            <button
              type='button'
              disabled={isLoading}
              onClick={onOrderStatusChange}
            >
              Concluir pedido
            </button>
          )}
        </Footer>
      </ModalBody>
    </Overlay>
  );
}

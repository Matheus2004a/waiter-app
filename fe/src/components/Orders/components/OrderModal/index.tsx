import { Fragment, useEffect } from 'react';

import { Footer, ModalBody, OrderDetails, Overlay } from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import { Order } from '../../../../types/Order';
import { formatCurrency } from '../../../../utils/formatCurrency';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: OrderModalProps) {
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
                <img src={product.imagePath} alt={product.name} />
                <span className='quantity'>{quantity}x</span>
                <div className='product-details'>
                  <strong>{product.name}</strong>
                  <small>{formatCurrency(product.price)}</small>
                </div>
              </figure>

              <div className="total">
                <p>Total</p>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </Fragment>
          ))}
        </OrderDetails>

        <Footer>
          <button type='reset'>Cancelar Pedido</button>
          <button type='button'>Concluir pedido</button>
        </Footer>
      </ModalBody>
    </Overlay>
  );
}

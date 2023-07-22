import styled from 'styled-components';

interface Props {
  isOrderDone: boolean;
}

export const OrderDetails = styled.section`
  margin-top: 2rem;

  > small {
    font-size: 14px;
    opacity: 0.8;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;

    & + .item {
      margin-top: 1rem;
    }

    .quantity {
      display: block;
      font-size: 14px;
      color: #999999;
      margin-top: -1.5rem;
    }

    .product-details {
      display: grid;

      small {
        margin-top: 4px;
      }
    }
  }

  .item img {
    width: 48px;
    height: 40px;
    border-radius: 6px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
`;

export const OrderContainerItem = styled.div`
  max-height: 160px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #D73035;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 5px;
  }
`;

export const Footer = styled.footer<Props>`
  display: flex;
  justify-content: ${({ isOrderDone }) => isOrderDone ? 'center' : 'space-between'} ;
  margin-top: 2rem;

  button {
    font-weight: bold;

    &[type="reset"] {
      color: #D73035;
    }

    &[type="button"] {
      width: 234px;
      background-color: #D73035;
      border-radius: 44px;
      color: #FFFFFF;
      padding: 14px 28px;
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.div`
  width: 480px;
  background: #fff;
  padding: 32px;
  border-radius: 8px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 24px;
    }
  }

  > button {
    line-height: 0;
  }

  button {
    border: none;
    background: transparent;
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    figure {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
`;

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

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
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
`;
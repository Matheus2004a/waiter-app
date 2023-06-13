import styled from 'styled-components';

export const Board = styled.div`
  width: 384px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 4px;
    gap: 4px;
    padding: 40px 0px;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 14px;
      color: #666666;
    }

    & + button {
      margin-top: 24px;
    }
  }
`;

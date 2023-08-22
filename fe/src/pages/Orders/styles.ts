import styled from 'styled-components';

export const ContentModal = styled.div`
  font-weight: 500;
  margin-top: 48px;

  p {
    text-align: center;
  }

  p:last-child {
    margin-top: 16px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 48px;

  p {
    margin-top: 16px;
    color: var(--gray-400, #666);
    font-weight: 500;
  }
`;

export const ContainerOrders = styled.section`
  max-width: 1050px;
  display: flex;
  gap: 32px;
`;

export const ButtonRefreshDay = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  color: var(--brand-red, #D73035);
  gap: 8px;

  span {
    font-weight: bold;
  }
`;

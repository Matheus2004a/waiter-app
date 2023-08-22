import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  strong {
    background: var(--gray-20, rgba(204, 204, 204, 0.20));
    padding: 4px 8px;
    border-radius: 4px;
  }

  button {
    color: var(--brand-red, #D73035);
    font-weight: 600;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 48px;

  figure {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin-top: 16px;
    color: var(--gray-400, #666);
    font-weight: 500;
  }
`;

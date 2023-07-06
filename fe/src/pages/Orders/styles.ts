import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  justify-content: center;
  gap: 32px;

  figure {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ButtonRefreshDay = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  color: var(--brand-red, #D73035);
  gap: 8px;
`;

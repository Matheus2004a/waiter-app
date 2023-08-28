import styled from 'styled-components';

export const Paragraph = styled.p`
  text-align: center;
  font-weight: 500;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button:first-child {
    background: transparent;
    color: var(--brand-red, #D73035);
  }
`;

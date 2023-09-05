import styled from 'styled-components';

export const Paragraph = styled.p`
  text-align: center;
  font-weight: 500;
`;

export const ContainerProduct = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  img {
    width: 158px;
    height: 123px;
    border-radius: 10px 0 0 10px;
  }

  figcaption {
    width: 192px;
    display: grid;
    gap: 12px;
    padding: 1rem;
    height: 100%;
    border: 1px solid var(--gray-200, #CCC);
    border-radius: 0 10px 10px 0;
  }
`;

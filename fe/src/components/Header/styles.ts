import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  background-color: #D73035;
  padding: 2rem 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1216px;

  h1, h2 {
    color: #fff;
  }

  h2 {
    margin-top: 6px;
    opacity: 0.9;
    font-weight: 400;
    font-size: 1rem;
  }
`;

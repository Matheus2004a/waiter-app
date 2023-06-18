import styled, { keyframes } from 'styled-components';

interface ContainerProps {
  fadeOut: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutTest = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #D73035;
  animation: ${({ fadeOut }) => fadeOut ? fadeOutTest : fadeIn} 500ms ease-in;
  opacity: ${({ fadeOut }) => fadeOut ? 0 : 1};
`;

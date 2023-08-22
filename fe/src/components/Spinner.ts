import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
`;

import styled, { css } from 'styled-components';

export const StyleButton = styled.button<{ hasChildren?: boolean }>`
  ${({ hasChildren }) => hasChildren && css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

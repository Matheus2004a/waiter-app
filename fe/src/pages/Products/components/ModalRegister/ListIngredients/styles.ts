import styled from 'styled-components';

export const List = styled.ul`
  margin-top: 24px;
  overflow-y: auto;
  display: grid;
  gap: 4px;
  max-height: 200px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.30);
  padding: 1rem;
`;

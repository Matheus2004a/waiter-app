import styled from 'styled-components';

export const TableCustom = styled.table`
  display: grid;
  width: 100%;
  border-radius: 7px;
  border: 1px solid var(--gray-40, rgba(204, 204, 204, 0.40));

  td, th {
    padding: 1rem;
  }

  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  tbody tr {
    border-top: 1px solid var(--gray-40, rgba(204, 204, 204, 0.40));;
  }
`;

export const Thead = styled.thead`
  background: rgba(204, 204, 204, 0.20);
`;

export const Image = styled.img`
  width: 48px;
  height: 32px;
  border-radius: 4px;
`;

export const TdFlex = styled.td`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Actions = styled.td`
  display: flex;
  align-items: center;
  gap: 32px;
`;

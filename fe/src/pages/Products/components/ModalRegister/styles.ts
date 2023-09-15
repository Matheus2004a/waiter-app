import styled, { css } from 'styled-components';
import { Content, Form } from '../../../../components/Form/styles';

export const GridCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FormGrid = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 50%);
`;

export const TagCategory = styled(Content)`
  border: 0.75px solid transparent;
  align-items: center;

  input[type="radio"]:checked {
    border: 0.75px solid var(--brand-red, #D73035);
  }
`;

export const ContainerPreview = styled.div`
  background: var(--gray-100, #FAFAFA);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #CCC);
`;

export const PreviewImg = styled.img<{ isEmpty?: boolean }>`
  ${({ isEmpty }) => isEmpty && css`
    width: 24px !important;
    height: 24px !important;
  `}

  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeaderIngredient = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

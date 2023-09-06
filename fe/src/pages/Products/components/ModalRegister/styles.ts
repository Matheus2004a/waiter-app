import styled from 'styled-components';
import { Form } from '../../../../components/Form/styles';

export const GridCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
`;

export const FormGrid = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 47%);
`;

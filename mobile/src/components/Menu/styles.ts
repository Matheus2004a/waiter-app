import styled from 'styled-components/native';

export const ProductContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const Image = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
`;

export const ProductDetails = styled.View`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background: #CCCCCC4D;
  margin: 24px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;

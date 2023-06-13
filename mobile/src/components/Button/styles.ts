import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 14px 28px;
  background: ${({ disabled }) => disabled ? '#CCCCCC' : '#D73035'};
  border-radius: 44px;
  justify-content: center;
  align-items: center;
`;

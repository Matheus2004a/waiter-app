import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0 ,0.6);
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 24px;
`;

export const ModalBody = styled.View`
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.View`
  margin-top: 32px;
`;

export const Input = styled.TextInput`
  border-radius: 8px;
  border: 1px solid #999999;
  padding: 16px;
  margin-bottom: 24px;
`;

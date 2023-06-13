import { StatusBar } from 'react-native';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background: #fafafa;
  flex: 1;
`;

export const CategoriesContainer = styled.View`
  height: 63px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  height: 50px;
`;

export const Footer = styled.View`
  min-height: 110px;
  padding: 16px 24px;
`;

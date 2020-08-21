import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 150}px;
  margin-top: 50px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #2BC4DA;
  font-family: 'RobotoSlab-Medium';
  margin: 0px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0%;
  background: #fff;
  border-top-width: 1px;
  border-color: #2BC4DA;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSignInText = styled.Text`
  color: #2BC4DA;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

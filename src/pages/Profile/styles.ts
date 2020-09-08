import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 150}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #131313;
  font-family: 'RobotoSlab-Medium';
  margin: 0px 0 24px;
  text-align: left;
  margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;


export const UserAvatarButton = styled(RectButton)`
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

import styled from 'styled-components/native'
import { Provider } from './index'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
flex: 1;
`;

export const Header = styled.View`
padding: 24px;
background: #fff;
flex-direction: row;
justify-content: space-between;
align-items: center;
border-bottom-width: 2px;
border-bottom-color: #131313;
`;

export const HeaderTitle = styled.Text`
color: #131313;
font-size: 20px;
font-family: 'RobotoSlab-Regular';
line-height: 28px;
`;

export const UserName = styled.Text`
color: #18CBC1;
font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity`
margin-left: 10px;
`;

export const UserAvatar = styled.Image`
width: 56px;
height: 56px;
border-radius: 28px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>)`
  padding: 32px 0px 10px 0px;
  `;


export const ProviderContainer = styled(RectButton)`
background: #f7f7f7;
border-radius: 10px;
padding: 20px;
margin-bottom: 16px;
flex-direction: row;
align-items: center;
`;

export const ProviderAvatar = styled.Image`
width: 72px;
height: 72px;
border-radius: 36px;
`;

export const ProviderInfo = styled.View`
flex: 1;
margin-left: 20px;
`;

export const ProviderName = styled.Text`
font-family: 'RobotoSlab-Medium';
font-size: 18px;
color: #131313;
`;

export const ProviderMeta = styled.View`
flex-direction: row;
align-items: center;
margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
margin-left: 8px;
color: #999591;
font-family: 'RobotoSlab-Medium';
`;

export const ProvidersListTitle = styled.Text`
font-size: 24px;
margin-bottom: 24px;
margin-left: 20px;
color: #2BC4DA;
font-family: 'RobotoSlab-Medium';
`;

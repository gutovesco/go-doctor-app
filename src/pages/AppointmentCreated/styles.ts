import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
padding: 0 24px;
`

export const Title = styled.Text`
font-size: 32px;
color: #131313;
font-family: 'RobotoSlab-Medium';
margin-top: 28px;
text-align: center;
`

export const Description = styled.Text`
font-size: 18px;
color: #999591;
font-family: 'RobotoSlab-Regular';
margin-top: 18px;
text-align: center;
margin-bottom: 18px;
`

export const OkButtonText = styled.Text`
font-size: 16px;
color: #f4ede8;
font-family: 'RobotoSlab-Regular';
`

export const OkButton = styled(RectButton)`
height: 46px;
background: #18CBC1;
border-radius: 10px;
align-items: center;
margin: 0 15px;
justify-content: center;
width: 90%;
`

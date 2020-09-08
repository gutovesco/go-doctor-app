import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList, ProvidersListTitle, ProviderContainer, ProviderAvatar, ProviderInfo, ProviderName, ProviderMeta, ProviderMetaText } from './styles'
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import profile from '../../assets/profile.png'

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [signOut])

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate])

  const defaultImage = 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>
            Bem-vindo, {"\n"}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => signOut()}>
              <Text style={{color: '#131313', fontSize: 17}}>Sair</Text>
            </TouchableOpacity>
            <ProfileButton onPress={navigateToProfile}>
              <UserAvatar source={{ uri: user.avatar_url ? user.avatar_url : defaultImage }}></UserAvatar>
            </ProfileButton>
          </View>

        </Header>

        <ProvidersList data={providers} keyExtractor={(provider) => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Médicos</ProvidersListTitle>
          }
          renderItem={({ item }) => (
            <RectButton
              style={{
                borderRadius: 10, width: '90%', alignSelf: 'center', padding: 20, backgroundColor: '#fff', alignItems: 'center', marginBottom: 16, flexDirection: 'row', shadowColor: "#000", shadowOffset: {
                  width: 0,
                  height: 5,
                }, shadowOpacity: 0.36, shadowRadius: 6.68, elevation: 11,
              }}
              onPress={() => navigateToCreateAppointment(item.id)}>
                {console.log(item.avatar_url)}
              <ProviderAvatar source={{ uri: item.avatar_url }}></ProviderAvatar>

              <ProviderInfo>
                <ProviderName>{item.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#18CBC1" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#18CBC1" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>

              </ProviderInfo>
            </RectButton>
          )}
        ></ProvidersList>
      </Container>


    </>
  );
};

export default Dashboard;

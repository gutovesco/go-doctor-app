import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform, Alert, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Section,
  SectionTitle,
  SectionContent,
  Schedule,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from './styles'
import api from '../../services/api';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns'

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation()
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [selectedProvider, setSelectedProvider] = useState(providerId)
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id)
  }, [])

  const toggleDateTimePicker = useCallback(() => {
    setShowDateTimePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDateTimePicker(false)
    }

    if (date) {
      setSelectedDate(date)
    }

  }, [])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  const morningAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour < 12).map(({ hour, available }) => {
      return {
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }
    })
  }, [availability])

  const handleCreateAppointment = useCallback(async () => {
    console.log('aaaaaaaaaa')
    try{
      const date = new Date(selectedDate)

      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      })

      console.log('appointment criado')

      navigate('AppointmentCreated', {date: date.getTime()})
    }catch(err){
      Alert.alert('Erro ao criar agendamento', 'Ocorreu um erro ao criar o agendamento, tente novamente.')
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider])

  const afternoonAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour >= 12).map(({ hour, available }) => {
      return {
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }
    })
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Médicos</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }}></UserAvatar>
      </Header>
      <ScrollView>

        <ProvidersListContainer>
          <ProvidersList data={providers} keyExtractor={provider => provider.id} horizontal showsHorizontalScrollIndicator={false}
            renderItem={({ item: provider }) => (
              <RectButton
                style={{
                  borderRadius: 5, paddingRight: 10, marginTop: 10, marginBottom: 10, backgroundColor: provider.id === selectedProvider ? '#18CBC1' : '#fff', alignItems: 'center', marginRight: 16, flexDirection: 'row', shadowColor: "#131313",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
                onPress={() => handleSelectProvider(provider.id)}>
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName>{provider.name}</ProviderName>
              </RectButton>
            )} />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={toggleDateTimePicker}>
            <OpenDatePickerButtonText>Abrir o calendario</OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDateTimePicker && (<DateTimePicker mode="date" onChange={handleDateChanged} value={selectedDate} display="calendar" textColor="#f4ede8" />)}
        </Calendar>

        <Schedule>
          <Text style={{ marginLeft: 20, marginBottom: 15, fontSize: 19 }}>Escolha o horário</Text>
          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <TouchableOpacity
                onPress={() => handleSelectHour(hour)}
                style={{
                  padding: 12, backgroundColor: available && selectedHour !== hour ? '#fff' : selectedHour === hour && available === true ? '#18CBC1' : '#e7e7e7', marginRight: 10, marginBottom: 5, marginTop: 5, borderRadius: 10, shadowColor: "#e7e7e7",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.62,
                  elevation: 4,
                }} key={hourFormatted}>
                  <HourText>{hourFormatted}</HourText>
                </TouchableOpacity>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
                <TouchableOpacity
                onPress={() => handleSelectHour(hour)}
                style={{
                  padding: 12, backgroundColor: available && selectedHour !== hour ? '#fff' : selectedHour === hour && available === true ? '#18CBC1' : '#e7e7e7', marginRight: 10, marginBottom: 5, marginTop: 5, borderRadius: 10, shadowColor: "#e7e7e7",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.62,
                  elevation: 4,
                }} key={hourFormatted}>
                  <HourText>{hourFormatted}</HourText>
                </TouchableOpacity>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={() => handleCreateAppointment()}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </ScrollView>
    </Container>
  );
};

export default CreateAppointment;


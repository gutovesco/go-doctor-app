import React, { useMemo } from 'react';
import { Container, Title, Description, OkButton, OkButtonText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { useRoute, useNavigation } from '@react-navigation/native';
import {format} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { View } from 'react-native';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { navigate } = useNavigation()
  const {params} = useRoute()

  const routeParams = params as RouteParams

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {locale: ptBr})
  }, [routeParams.date])

  return (
    <Container>
      <View style={{width: 110, height: 110, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,}}>
        <Icon name="check" size={80} color="#04d361" />
      </View>
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={() => navigate('Dashboard')}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;

import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles.js';
import { Header, Footer, RemediosHome } from '../../Layout.js';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiService.js';

export default function HomeScreen({ navigation }) {
  const [schedules, setSchedules] = useState([]);

  const proximasDosagens = async () => {
    const response = await apiClient.get('/v1/Medicine/GetUnadministeredSchedulings');
    const dezPrimeiros = response.data.slice(0, 10);

    console.log('Resposta da API:', response.data);

    setSchedules(dezPrimeiros);
  };

  useEffect(() => {
    proximasDosagens();
  }, []);

  return (
    <View style={styles.containerMenu}>
      <View style={styles.content}>
        <Text style={styles.homeTitle}>Bem vindo!</Text>
        <View style={styles.container}>
          <Text style={styles.basicLabel}>Próximas Dosagens</Text>
          <ScrollView style={styles.basicScroll}>
            <View style={styles.sectionContainer}>
              {schedules.length > 0 ? (
                schedules.map((schedule, index) => (
                  <RemediosHome
                    key={index}
                    nome={schedule.medicineName}
                    horario={`${schedule.hour}:${schedule.minute < 10 ? '0' + schedule.minute : schedule.minute}`}
                  />
                ))
              ) : (
                <Text>Nenhuma dosagem pendente</Text>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <View style={styles.mensalidadeHome}>
              <Text style={styles.basicLabel}>Assinatura Ativa!</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserArea')}
              style={styles.homeButton}>
              <Text style={styles.basicButtonText}>Área do Usuário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}

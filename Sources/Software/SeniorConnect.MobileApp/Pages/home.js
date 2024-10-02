import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles.js';
import { Header, Footer, RemediosHome } from '../Layout.js';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.containerMenu}>
      <View style={styles.content}>
        <Text style={styles.homeTitle}>Bem vindo!</Text>
        <View style={styles.container}>
          <Text style={styles.basicLabel}>Próximas Dosagens</Text>
          <ScrollView style={styles.basicScroll}>
            <View style={styles.sectionContainer}>
              <RemediosHome nome="Medicamento 1" horario="1:00" />
              <RemediosHome nome="Medicamento 2" horario="2:00" />
              <RemediosHome nome="Medicamento 3" horario="3:00" />
              <RemediosHome nome="Medicamento 4" horario="4:00" />
              <RemediosHome nome="Medicamento 5" horario="5:00" />
            </View>
          </ScrollView>
        </View>
        <Text style={styles.basicLabel}>Assinatura</Text>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <View style={styles.mensalidadeHome}>
              <Text style={styles.basicLabel}>Mensalidade em Dia!</Text>
            </View>
            <Text style={styles.basicLabel}>Status: </Text>
            <Text style={styles.basicLabel}>[ativo]</Text>
            <Text style={styles.basicLabel}>Válido até:</Text>
            <Text style={styles.basicLabel}>[15/09/24]</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.homeButton}>
              <Text style={styles.basicButtonText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}

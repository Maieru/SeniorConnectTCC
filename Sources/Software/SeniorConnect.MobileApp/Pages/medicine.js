import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles.js';
import { Header, Footer, RemediosMedicine } from '../Layout.js';

//apenas para teste da tela, em um futuro, medicamentos deve ser preenchido por uma requisição da api x 
const medicamentos = [
  { id: 1, nome: 'Medicamento 1', horario: '08:00' },
  { id: 2, nome: 'Medicamento 2', horario: '12:00' },
  { id: 3, nome: 'Medicamento 3', horario: '18:00' },
  { id: 4, nome: 'Medicamento 4', horario: '20:00' },
  { id: 5, nome: 'Medicamento 5', horario: '22:00' },
  { id: 6, nome: 'Medicamento 6', horario: '23:00' },
];


export default function MedicineScreen({ navigation }) {
  return (
    <View style={styles.containerMenu}>
      <Header title="Medicamentos" navigation={navigation} />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewMedicine')}
          style={styles.medicineButton}>
          <Text style={styles.basicButtonText}>Novo Medicamento</Text>
        </TouchableOpacity>
        <ScrollView style={styles.basicScroll}>
          <View style={styles.sectionContainer}>
            {medicamentos.map(med => (
              <RemediosMedicine
                key={med.id}
                nome={med.nome}
                horario={med.horario}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}
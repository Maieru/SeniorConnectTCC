import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles.js';
import { Header, Footer, RemediosMedicine } from '../Layout.js';

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
            <RemediosMedicine nome="Medicamento 1" />
            <RemediosMedicine nome="Medicamento 2" />
            <RemediosMedicine nome="Medicamento 3" />
            <RemediosMedicine nome="Medicamento 4" />
            <RemediosMedicine nome="Medicamento 5" />
            <RemediosMedicine nome="Medicamento 6" />
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}
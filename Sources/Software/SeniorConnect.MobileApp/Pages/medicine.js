import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles.js';
import { Header, Footer, RemediosMedicine } from '../Layout.js';
import apiClient from '../services/apiService.js';
import { useEffect, useState } from 'react';

export default function MedicineScreen({ navigation }) {
  const [medicamentos, setMedicamentos] = useState([]);

  async function listaMedicamentos() {
    const response = await apiClient.get("/v1/Medicine/GetAllFromSubscription?subscriptionId=" + apiClient.getSubscription());
    setMedicamentos(response.data);
  }

  const newMedicamentoModel = {
    id: null,
    name: '',
  };

  useEffect(() => {
    const fetchData = async () => {
      await listaMedicamentos();
    }
    fetchData();

    return () => { }; //É feio, é estranho.... mas funciona. Juro que tirando isso morre
  }, []
  )

  return (
    <View style={styles.containerMenu}>
      <Header title="Medicamentos" navigation={navigation} />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewMedicine', { medicine: newMedicamentoModel })}
          style={styles.medicineButton}>
          <Text style={styles.basicButtonText}>Novo Medicamento</Text>
        </TouchableOpacity>
        <ScrollView style={styles.basicScroll}>
          <View style={styles.sectionContainer}>
            {medicamentos.map(med => {
              return (<RemediosMedicine
                id={med.id}
                nome={med.name}
                navigation={navigation}
                medicine={med}
              />
              )
            })}
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}
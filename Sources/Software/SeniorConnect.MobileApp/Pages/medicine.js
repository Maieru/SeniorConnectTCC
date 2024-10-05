import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import styles from '../styles.js';
import { useFocusEffect } from '@react-navigation/native';
import { Header, Footer, RemediosMedicine } from '../Layout.js';
import apiClient from '../services/apiService.js';
import React, { useEffect, useState } from 'react';

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

  async function deleteMedicamento(id) {
    try {
      await apiClient.delete("/v1/Medicine/Delete?medicineId=" + id);
      await listaMedicamentos();

      Alert.alert("Sucesso", "Medicamento excluído com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o medicamento.");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await listaMedicamentos();
    }
    fetchData();

    return () => { }; //É feio, é estranho.... mas funciona. Juro que tirando isso morre
  }, []
  )

  useFocusEffect(
    React.useCallback(() => {
      const fetchMedicamentos = async () => {
        await listaMedicamentos();
      };
      fetchMedicamentos();
    }, [])
  );

  return (
    <View style={styles.containerMenu}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Novo Medicamento', { medicine: newMedicamentoModel })}
          style={styles.medicineButton}>
          <Text style={styles.basicButtonText}>Novo Medicamento</Text>
        </TouchableOpacity>
        <ScrollView style={styles.basicScroll}>
          <View style={styles.sectionContainer}>
            {medicamentos.map(med => {
              return (
              <RemediosMedicine
                key={med.id}
                id={med.id}
                nome={med.name}
                navigation={navigation}
                medicine={med}
                onDelete={deleteMedicamento}
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
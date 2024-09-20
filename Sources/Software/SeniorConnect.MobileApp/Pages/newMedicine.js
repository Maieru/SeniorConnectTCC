import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../styles.js';
import { HeaderReturn, Footer, HorariosMedicine } from '../Layout.js';
import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiService.js';
import { useFocusEffect } from '@react-navigation/native';

export default function MedicineScreen({ navigation, route }) {
    const [medicamentoId, setMedicamentoId] = useState();
    const [medicamentoNome, setMedicamentoNome] = useState();
    const [medicamentoDesc, setMedicamentoDesc] = useState();
    const [horarios, setHorarios] = useState([]);

    async function listaHorarios() {
        const response = await apiClient.get("/v1/Scheduling/GetByMedicine?medicineId=" + medicine.id);
        
        if (response && response.data) {
            setHorarios(response.data);
        } else {
            console.log("Por algum motivo, essa api demora, mas não da problema...");
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const fetchHorarios = async () => {
            await listaHorarios();
          };
          fetchHorarios();
        }, [])
      );

    let medicine = {};
    const [entidadeCarregada, setEntidadeCarregada] = useState(false);
    useEffect(() => {
        medicine = route.params.medicine;
        if (!entidadeCarregada) {
            constroiMedicamento();
            listaHorarios();

            setEntidadeCarregada(true);
        }
        return () => { };
    }, []
    )

    const updateMedicamentoModel = {
        id: medicamentoId,
        subscriptionId: apiClient.getSubscription(),
        name: medicamentoNome,
    };

    const createMedicamentoModel = {
        subscriptionId: apiClient.getSubscription(),
        name: medicamentoNome,
    };

    function salvaMedicamento() {
        console.log("medicamentoId: " + medicamentoId);
        if (medicamentoId == null) {
            console.log("Criando Medicamento.")
            apiClient.post('/v1/Medicine/Create', createMedicamentoModel)
            Alert.alert(
                "Salvo!",
                "Medicamento criado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Medicine')
                    }
                ]
            );
        }
        else {
            console.log("Update Medicamento.")
            apiClient.put('/v1/Medicine/Update', updateMedicamentoModel)
            Alert.alert(
                "Salvo!",
                "Medicamento atualizado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Medicine')
                    }
                ]
            );
        }
    }

    function constroiMedicamento() {
        if (medicine != undefined) {
            setMedicamentoId(medicine.id)
            setMedicamentoNome(medicine.name)
            console.log("Id: " + medicine.id);
        }
    }

    function formatarDiasSemana(daysOfWeek) {
        const diasSemanaMap = {
            '0': 'S',
            '1': 'T',
            '2': 'Q',
            '3': 'Q',
            '4': 'S',
            '5': 'S',
            '6': 'D',
        };

        return daysOfWeek.split(',').map(dia => diasSemanaMap[dia]).join(' ');
    }

    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Novo Medicamento" navigation={navigation} returnPage={"Medicine"} />
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.cadastroInput}
                            placeholder="Nome do Medicamento"
                            placeholderTextColor="#888"
                            value={medicamentoNome}
                            onChangeText={setMedicamentoNome}
                        />
                        <TouchableOpacity
                            onPress={() => salvaMedicamento()}
                            style={styles.cadastroButton}>
                            <Text style={styles.basicButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.basicLabel}>Horários</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HorariosMedicine', {medicine: medicamentoId})}
                            style={styles.newMedicineButton}>
                            <Text style={styles.basicButtonText}>Novo Horário/Dosagem</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.basicScroll}>
                            {horarios.map(horario => (
                                <HorariosMedicine
                                    key={horario.id}
                                    horario={`${horario.hour}:${horario.minute < 10 ? '0' + horario.minute : horario.minute}`}
                                    diasSemana={formatarDiasSemana(horario.daysOfWeek)}
                                    id ={horario.id}
                                    medicamentoId={medicamentoId}
                                    navigation={navigation}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
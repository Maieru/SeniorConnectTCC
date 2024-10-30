import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { HeaderReturn, Footer} from '../../Layout.js';
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiService.js';
import { useFocusEffect } from '@react-navigation/native';
import styles from './stylesNewMedicine.js';

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
                        onPress: () => navigation.navigate('Medicamentos')
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
                        onPress: () => navigation.navigate('Medicamentos')
                    }
                ]
            );
        }
    }

    function HorariosMedicine({ horario, diasSemana, id, medicamentoId, navigation }) {
        return (
          <View style={styles.scheduleContainer}>
            <View style={styles.horarioContainer}>
              <Text style={styles.horarioText}>{horario}</Text>
            </View>
            <View style={styles.diasContainer}>
              <View style={styles.diasSemanaContainer}>
                {diasSemana.split('').map((dia, index) => (
                  <Text key={index} style={styles.diaSemana}>{dia}</Text>
                ))}
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Novo Horario', { medicine: medicamentoId, scheduling: id })}
              >
                <Image
                  source={require('../../assets/edit.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.actionButton}
                onPress={async () => await deletaSchedule(id, navigation)}
              >
                <Image
                  source={require('../../assets/delete.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      
      async function deletaSchedule(id) {
        try {
            setHorarios((prevHorarios) => prevHorarios.filter((horario) => horario.id !== id));
            
            await apiClient.delete("/v1/Scheduling/Delete?schedulingId=" + id);
            
            Alert.alert(
                "Feito!",
                "Horário deletado como solicitado!",
                [
                    {
                        text: "OK",
                        onPress: () => listaHorarios() 
                    }
                ]
            );
        } catch {
            Alert.alert(
                "Atenção!",
                "Houve um erro inesperado, favor contatar o grupo!",
                [
                    {
                        text: "OK"
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
            '0': 'D',
            '1': 'S',
            '2': 'T',
            '3': 'Q',
            '4': 'Q',
            '5': 'S',
            '6': 'S',
        };

        return daysOfWeek.split(',').map(dia => diasSemanaMap[dia]).join(' ');
    }

    return (
        <View style={styles.containerMenu}>
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
                {medicamentoId != null && (
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.basicLabel}>Horários</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Novo Horario', { medicine: medicamentoId })}
                            style={styles.newMedicineButton}>
                            <Text style={styles.basicButtonText}>Novo Horário/Dosagem</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.basicScroll}>
                            {horarios.map(horario => (
                                <HorariosMedicine
                                    key={horario.id}
                                    horario={`${horario.hour}:${horario.minute < 10 ? '0' + horario.minute : horario.minute}`}
                                    diasSemana={formatarDiasSemana(horario.daysOfWeek)}
                                    id={horario.id}
                                    medicamentoId={medicamentoId}
                                    navigation={navigation}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
                )}
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
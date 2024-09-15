import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../styles.js';
import { HeaderReturn, Footer, HorariosMedicine } from '../Layout.js';
import { useState, useEffect } from 'react';
import apiClient from '../services/apiService.js';

export default function MedicineScreen({ navigation, route }) {
    const [medicamentoId, setMedicamentoId] = useState();
    const [medicamentoNome, setMedicamentoNome] = useState();
    const [medicamentoDesc, setMedicamentoDesc] = useState();

    let medicine = {};
    const [entidadeCarregada, setEntidadeCarregada] = useState(false);
    useEffect(() => {
        medicine = route.params.medicine;
        if (!entidadeCarregada) {
            constroiMedicamento();
            setEntidadeCarregada(true);
        }

        console.log(medicine.name);

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
        }
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
                            onPress={() => navigation.navigate('NewMedicine')}
                            style={styles.newMedicineButton}>
                            <Text style={styles.basicButtonText}>Novo Horário/Dosagem</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.basicScroll}>
                            <HorariosMedicine horario={"12:00"} />
                            <HorariosMedicine horario={"13:00"} />
                            <HorariosMedicine horario={"14:00"} />
                            <HorariosMedicine horario={"15:00"} />
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
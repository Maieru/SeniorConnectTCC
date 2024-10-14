import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../styles.js';
import stylesScheduling from '../stylesNewScheduling.js';
import { HeaderReturn, Footer, HorariosMedicine } from '../Layout.js';
import { useState, useEffect } from 'react';
import apiClient from '../services/apiService.js';

export default function HorariosMedicineScreen({ navigation, route }) {
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [diasSelecionados, setDiasSelecionados] = useState({
        domingo: false,
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
    });
    const [medicineId, setMedicineId] = useState(0);
    const [schedulingId, setSchedulingId] = useState(0);

    function createSchedulingModel() {
        return {
            active: true,
            medicineId: medicineId,
            hour: hora,
            minute: minuto,
            daysOfWeek: getDaysOfWeekString(),
            subscriptionId: apiClient.getSubscription(),
        };
    }

    function validaCampos() {
        // Validação de Hora
        const horaNum = parseInt(hora, 10);
        const minutoNum = parseInt(minuto, 10);

        if (isNaN(horaNum) || horaNum < 0 || horaNum > 24) {
            Alert.alert(
                "Horário inválido!",
                "A hora deve estar entre 00 e 23.",
                [
                    {
                        text: "OK",
                    }
                ]
            );
            return false;
        }

        if (isNaN(minutoNum) || minutoNum < 0 || minutoNum > 60) {
            Alert.alert(
                "Horário inválido!",
                "Os minutos devem estar entre 00 e 59.",
                [
                    {
                        text: "OK",
                    }
                ]
            );
            return false;
        }

        const diasSelecionadosArray = Object.values(diasSelecionados);
        const algumDiaSelecionado = diasSelecionadosArray.some((dia) => dia === true);

        if (!algumDiaSelecionado) {
            Alert.alert(
                "Nenhum dia selecionado!",
                "Você deve selecionar pelo menos um dia da semana.",
                [
                    {
                        text: "OK",
                    }
                ]
            );
            return false;
        }

        return true;
    }



    function createUpdateSchedulingModel() {
        return {
            id: schedulingId,
            active: true,
            medicineId: medicineId,
            hour: hora,
            minute: minuto,
            daysOfWeek: getDaysOfWeekString(),
            subscriptionId: apiClient.getSubscription(),
        };
    }

    function getDaysOfWeekString() {
        var selectedDaysOfWeek = [];
        let dayCount = 0;

        for (var property in diasSelecionados) {
            if (diasSelecionados[property] != undefined && diasSelecionados[property] == true)
                selectedDaysOfWeek.push(dayCount);

            dayCount++;
        }

        return selectedDaysOfWeek.join(',');
    }

    let medicine;
    let scheduling;
    const [entidadeCarregada, setEntidadeCarregada] = useState(false);
    useEffect(() => {
        if (!entidadeCarregada) {
            medicine = route.params.medicine;
            scheduling = route.params.scheduling;

            setSchedulingId(scheduling);
            setMedicineId(medicine);
            console.log("medicamento:" + medicine);
            console.log("scheduling:" + scheduling);

            setEntidadeCarregada(true);
        }
        return () => { };
    }, []
    )

    function salvaScheduling() {
        console.log(schedulingId)

        if (!validaCampos()) {
            console.log("Campos inválidos");
            return;
        }

        if (schedulingId == undefined) {
            console.log("Criando Scheduling.")
            console.log(createSchedulingModel())
            apiClient.post('/v1/Scheduling/Create', createSchedulingModel())
            Alert.alert(
                "Salvo!",
                "Horário criado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Novo Medicamento')
                    }
                ]
            );
        }
        else {
            console.log("Update Scheduling.")
            console.log(createUpdateSchedulingModel())
            apiClient.put('/v1/Scheduling/Update', createUpdateSchedulingModel())
            Alert.alert(
                "Salvo!",
                "Horário atualizado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Novo Medicamento')
                    }
                ]
            );
        }
    }

    const toggleDia = (dia) => {
        setDiasSelecionados((prev) => ({
            ...prev,
            [dia]: !prev[dia],
        }));
    };

    return (
        <View style={styles.containerMenu}>
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={stylesScheduling.timeContainer}>
                        <TextInput
                            style={stylesScheduling.timeInput}
                            placeholder="HH"
                            value={hora}
                            keyboardType="numeric"
                            maxLength={2}
                            onChangeText={setHora}

                        />
                        <Text style={stylesScheduling.timeSeparator}>:</Text>
                        <TextInput
                            style={stylesScheduling.timeInput}
                            placeholder="MM"
                            value={minuto}
                            keyboardType="numeric"
                            maxLength={2}
                            onChangeText={setMinuto}
                        />
                    </View>
                    <View style={stylesScheduling.daysContainer}>
                        {Object.keys(diasSelecionados).map((dia, index) => (
                            <View key={index} style={stylesScheduling.dayRow}>
                                <TouchableOpacity
                                    style={[stylesScheduling.checkbox, diasSelecionados[dia] && stylesScheduling.checkboxSelected]}
                                    onPress={() => toggleDia(dia)}
                                />
                                <Text style={stylesScheduling.dayLabel}>
                                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={stylesScheduling.saveButton}
                        onPress={() => salvaScheduling()}
                    >
                        <Text style={stylesScheduling.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
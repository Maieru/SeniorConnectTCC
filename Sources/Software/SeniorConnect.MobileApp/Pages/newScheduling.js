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
    const [dosagem, setDosagem] = useState('');
    const [diasSelecionados, setDiasSelecionados] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
    });

    const toggleDia = (dia) => {
        setDiasSelecionados((prev) => ({
            ...prev,
            [dia]: !prev[dia],
        }));
    };

    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Novo Horário" navigation={navigation} returnPage={"NewMedicine"} />
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={stylesScheduling.timeContainer}>
                        <TextInput
                            style={stylesScheduling.timeInput}
                            placeholder="XX"
                            value={hora}
                            keyboardType="numeric"
                            maxLength={2}
                            onChangeText={setHora}
                        />
                        <Text style={stylesScheduling.timeSeparator}>:</Text>
                        <TextInput
                            style={stylesScheduling.timeInput}
                            placeholder="XX"
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
                    <TextInput
                        style={stylesScheduling.input}
                        placeholder="Dosagem"
                        value={dosagem}
                        onChangeText={setDosagem}
                    />
                    <TouchableOpacity style={stylesScheduling.saveButton}>
                        <Text style={stylesScheduling.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
// status.js
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, Modal, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../styles.js';
import style from '../stylesStatus.js';
import { Header, Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';
import { useFocusEffect } from '@react-navigation/native';

export default function StatusScreen({ navigation }) {
    const [medicamentosAssociados, setMedicamentosAssociados] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [gridData, setGridData] = useState(Array(9).fill(null));
    const [showDropdown, setShowDropdown] = useState(false);
    const [deviceId, setDeviceId] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [devicePrimaryKey, setDevicePrimaryKey] = useState('');

    async function listaMedicamentos() {
        const responseGetAllAssociated = await apiClient.get("/v1/Medicine/GetMedicinesAssociatedToDevice?deviceId=" + await apiClient.getDeviceId());
        const medicamentosAssociados = responseGetAllAssociated.data;

        const responseGetMedicine = await apiClient.get("/v1/Medicine/GetAllFromSubscription?subscriptionId=" + apiClient.getSubscription());
        setMedicamentos(responseGetMedicine.data);

        const newGridData = [...gridData];

        medicamentosAssociados.forEach(medicamento => {
            if (medicamento.position !== null && medicamento.position <= 9) {
                newGridData[medicamento.position - 1] = medicamento;
            }
        });
        setMedicamentosAssociados(medicamentosAssociados);
        setGridData(newGridData);
    }

    const handleOutsideClick = () => {
        setSelectedIndex(null);
        setShowDropdown(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await listaMedicamentos();

            const device = await apiClient.getDeviceId();
            const deviceName = await apiClient.getDeviceName();
            const devicePrimaryKey = await apiClient.getDevicePrimaryKey();

            setDeviceId(device);
            setDeviceName(deviceName);
            setDevicePrimaryKey(devicePrimaryKey);
        }
        fetchData();

        return () => { };
    }, []
    )

    async function selecionarMedicamento(medicamento) {
        const position = selectedIndex;
        const newGridData = [...gridData];
        const objetoMedicamento = criarObjetoMedicamento(medicamento, position);
        console.log(objetoMedicamento);

        //está horrendo, ver com o João dps
        apiClient.post(`/v1/Medicine/AssociateToDevice?medicineId=${objetoMedicamento.medicineId}&deviceId=${objetoMedicamento.deviceId}&medicinePosition=${objetoMedicamento.medicinePosition}`);

        newGridData[selectedIndex] = medicamento;
        setGridData(newGridData);
        listaMedicamentos();
    }


    const criarObjetoMedicamento = (medicamento, position) => {
        return {
            medicineId: medicamento.id,
            deviceId: deviceId,
            medicinePosition: position
        };
    };

    const criarObjetoMedicamentoRemoverAssociacao = (medicamento, position) => {
        return {
            medicineId: medicamento.medicineId,
            deviceId: deviceId,
            medicinePosition: position
        };
    };

    const removerAssociacao = async (medicamento) => {
        const position = selectedIndex;
        const objetoMedicamento = criarObjetoMedicamentoRemoverAssociacao(medicamento, position);
        console.log(objetoMedicamento);
        const response = await apiClient.post(`/v1/Medicine/DessasociateFromDevice?medicineId=${objetoMedicamento.medicineId}&deviceId=${objetoMedicamento.deviceId}&medicinePosition=${objetoMedicamento.medicinePosition}`);
        console.log("Associação removida:", response.data);

        const newGridData = [...gridData];
        newGridData[position - 1] = null;
        setGridData(newGridData);
        setShowDropdown(false);
    };

    return (
        <View style={styles.containerMenu}>
            {!deviceId ? (
                <TouchableOpacity
                    style={[styles.statusCadastrarDispositivo]}
                    onPress={() => navigation.navigate('Novo Dispositivo', { createNewDevice: true })}>
                    <Text >Cadastrar Dispositivo</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.content}
                    activeOpacity={1}
                    onPress={handleOutsideClick}
                >
                    <View style={style.gridContainer}>
                        {gridData.map((medicamento, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    style.gridItem,
                                    selectedIndex !== null && selectedIndex !== index ? style.blurredItem : {},
                                ]}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(index);
                                    setShowDropdown(true);
                                }}
                            >
                                <Image
                                    source={require('../assets/medication.png')}
                                    style={style.gridItemImage}
                                />
                                <Text style={style.gridItemText}>
                                    {medicamento ? medicamento.name : '[Remédio]'}
                                </Text>
                                {showDropdown && selectedIndex === index && (
                                    <View style={style.dropdownContainer}>
                                        {gridData[selectedIndex] ? (
                                            <TouchableOpacity
                                                style={style.statusExcluirButton}
                                                onPress={() => removerAssociacao(gridData[selectedIndex])}
                                            >
                                                <Text style={style.statusExcluirButtonText}>Excluir Associação</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <ScrollView style={styles.basicScroll}>
                                                {medicamentos.map((item) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={styles.dropdownItem}
                                                            onPress={() => selecionarMedicamento(item)}
                                                        >
                                                            <Text style={styles.dropdownItemText}>
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </ScrollView>)}
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={[styles.statusCadastrarDispositivo]}
                            onPress={() => navigation.navigate('Novo Dispositivo',
                                {
                                    createNewDevice: false,
                                    deviceName: deviceName,
                                    devicePrimaryKey: devicePrimaryKey
                                })}
                        >
                            <Text>Reconfigurar Conexão</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}

            <Footer navigation={navigation} />
        </View>
    );
}
// status.js
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, Modal, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../styles.js';
import style from '../stylesStatus.js';
import { Header, Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';
import { useFocusEffect } from '@react-navigation/native';


export default function StatusScreen({ navigation, route }) {
    const [medicamentosAssociados, setMedicamentosAssociados] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [gridData, setGridData] = useState(Array(9).fill(null));
    const [showDropdown, setShowDropdown] = useState(false);
    const [deviceId, setDeviceId] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [devicePrimaryKey, setDevicePrimaryKey] = useState('');


    async function listaMedicamentos() {
        if (await apiClient.getDeviceId() == undefined)
            return;

        const responseGetAllAssociated = await apiClient.get("/v1/Medicine/GetMedicinesAssociatedToDevice?deviceId=" + await apiClient.getDeviceId());
        const medicamentosAssociados = responseGetAllAssociated.data;

        const responseGetMedicine = await apiClient.get("/v1/Medicine/GetAllFromSubscription?subscriptionId=" + apiClient.getSubscription());
        setMedicamentos(responseGetMedicine.data);

        const newGridData = [...gridData];

        medicamentosAssociados.forEach(medicamento => {
            if (medicamento.position !== null && medicamento.position < 9) {
                newGridData[medicamento.position] = medicamento;
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
            await constroiTela();
        }
        fetchData();

        return () => { };
    }, []
    )

    async function constroiTela() {

        const device = await apiClient.getDeviceId();
        const deviceName = await apiClient.getDeviceName();
        const devicePrimaryKey = await apiClient.getDevicePrimaryKey();

        setDeviceId(device);
        setDeviceName(deviceName);
        setDevicePrimaryKey(devicePrimaryKey);

    }

    useEffect(() => {
        if (route.params?.update) {
            listaMedicamentos();
            constroiTela();

        }
    }, [route.params?.update]);

    async function selecionarMedicamento(medicamento) {
        const position = selectedIndex;
        const objetoMedicamento = criarObjetoMedicamento(medicamento, position);
        console.log(objetoMedicamento);

        //está horrendo, ver com o João dps
        apiClient.post(`/v1/Medicine/AssociateToDevice?medicineId=${objetoMedicamento.medicineId}&deviceId=${objetoMedicamento.deviceId}&medicinePosition=${objetoMedicamento.medicinePosition}`);

        const newGridData = [...gridData];
        newGridData[position] = {
            ...medicamento,
            medicineId: medicamento.id,
            position: position
        };

        setGridData(newGridData);
        setShowDropdown(false);

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
        newGridData[position] = null;
        await setGridData(newGridData);
        await setShowDropdown(false);
    };

    return (
        <View style={styles.containerMenu}>
            {!deviceId ? (
                <TouchableOpacity
                    style={[styles.statusCadastrarDispositivo]}
                    onPress={() => navigation.navigate('Novo Dispositivo', { createNewDevice: true })}>
                    <Text>Cadastrar Dispositivo</Text>
                </TouchableOpacity>
            ) : (
                <TouchableWithoutFeedback onPress={handleOutsideClick}>
                    <View style={styles.content}>
                        <View style={style.gridContainer}>
                            {[6, 7, 8, 3, 4, 5, 0, 1, 2].map((index) => (
                                <View key={index} style={style.gridItemWrapper}>
                                    <TouchableOpacity
                                        style={[
                                            style.gridItem,
                                            selectedIndex !== null && selectedIndex !== index ? style.blurredItem : {},
                                        ]}
                                        onPress={() => {
                                            setSelectedIndex(index);
                                            setShowDropdown(true);
                                        }}
                                    >
                                        <Image
                                            source={require('../assets/medication.png')}
                                            style={style.gridItemImage}
                                        />
                                        <Text style={style.gridItemText}>
                                            {gridData[index] ? gridData[index].name : '[Remédio]'}
                                        </Text>
                                    </TouchableOpacity>

                                    {showDropdown && selectedIndex === index && (
                                        <View style={[style.dropdownContainer,
                                        {
                                            maxHeight: 200,
                                            top: index <= 6 ? -50 : 50,
                                        }]}>
                                            {gridData[selectedIndex] ? (
                                                <TouchableOpacity
                                                    style={style.statusExcluirButton}
                                                    onPress={() => removerAssociacao(gridData[selectedIndex])}
                                                >
                                                    <Text style={style.statusExcluirButtonText}>Excluir Associação</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <FlatList
                                                    data={medicamentos}
                                                    keyExtractor={(item) => item.id.toString()}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            style={styles.dropdownItem}
                                                            onPress={() => selecionarMedicamento(item)}
                                                        >
                                                            <Text style={styles.dropdownItemText}>
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    style={styles.basicFlatList}
                                                    contentContainerStyle={{ flexGrow: 1 }}
                                                    showsVerticalScrollIndicator={true}
                                                />
                                            )}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
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
                </TouchableWithoutFeedback>
            )}
            <Footer navigation={navigation} />
        </View>
    );
}
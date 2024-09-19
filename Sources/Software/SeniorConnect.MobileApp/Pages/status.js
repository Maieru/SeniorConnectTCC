// status.js
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../styles.js';
import style from '../stylesStatus.js';
import { Header, Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';

export default function StatusScreen({ navigation }) {
    const [medicamentosAssociados, setMedicamentosAssociados] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [gridData, setGridData] = useState(Array(9).fill(null));
    const [showDropdown, setShowDropdown] = useState(false);

    async function listaMedicamentos() {
        const responseGetAllAssociated = await apiClient.get("/v1/Medicine/GetMedicinesAssociatedToDevice?deviceId=2");
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
        }
        fetchData();

        return () => { };
    }, []
    )

    async function selecionarMedicamento(medicamento) {
        const position = selectedIndex + 1;
        const newGridData = [...gridData];
        const objetoMedicamento = criarObjetoMedicamento(medicamento, position);
        console.log(objetoMedicamento);

        //está horrendo, ver com o João dps
        apiClient.post(`/v1/Medicine/AssociateToDevice?medicineId=${objetoMedicamento.medicineId}&deviceId=${objetoMedicamento.deviceId}&medicinePosition=${objetoMedicamento.medicinePosition}`);

        newGridData[selectedIndex] = medicamento;
        setGridData(newGridData);
        await listaMedicamentos();
    }


    const criarObjetoMedicamento = (medicamento, position) => {
        const deviceId = 2;
        return {
            medicineId: medicamento.id,
            deviceId: deviceId,
            medicinePosition: position
        };
    };

    const criarObjetoMedicamentoRemoverAssociacao = (medicamento, position) => {
        const deviceId = 2;
        return {
            medicineId: medicamento.medicineId,
            deviceId: deviceId,
            medicinePosition: position
        };
    };

    const removerAssociacao = async (medicamento) => {
        const position = selectedIndex + 1;
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
            <Header title="Organização" navigation={navigation} />
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
                                    />
                                    {gridData[selectedIndex] && (
                                        <TouchableOpacity
                                            style={style.statusExcluirButton}
                                            onPress={() => removerAssociacao(gridData[selectedIndex])}
                                        >
                                            <Text style={style.statusExcluirButtonText}>Excluir Associação</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
            <Footer navigation={navigation} style={selectedIndex !== null ? style.blurredItem : {}} />
        </View>
    );
}
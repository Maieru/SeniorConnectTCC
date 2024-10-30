import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { HeaderReturn, Footer } from '../../Layout.js'; // Import Header with return button and footer
import styles from './stylesAdherenceReport.js';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiService.js';

export default function AdherenceReportScreen({ navigation }) {
    const [reportData, setReportData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiClient.get("/v1/Report/GetAdhesionReport?subscriptionId=" + apiClient.getSubscription());

            if (response != undefined) {
                setReportData(response.data);
                console.log(JSON.stringify(response.data));
            }
            else {
                console.log('Falha ao recuperar os dados do relatório de adesão');
            }

        }
        fetchData();

        return () => { };
    }, []);

    return (
        <View style={styles.containerMenu}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.reportTitle}>Relatório de Adesão</Text>

                <View style={styles.adherenceStatsContainer}>
                    <View style={styles.adherenceStatRow}>
                        <Text style={styles.adherencePercentage}>{reportData == null ? "XX" : Math.round(reportData.totalAdhesion)}%</Text>
                        <Text style={styles.adherenceDescription}>de doses administradas com sucesso</Text>
                    </View>
                    <View style={styles.adherenceStatRow}>
                        <Text style={styles.adherencePercentage}>{reportData == null ? "XX" : Math.round(reportData.missedDosesPercentage)}%</Text>
                        <Text style={styles.adherenceDescription}>de doses perdidas</Text>
                    </View>
                </View>

                <View style={styles.adherenceSection}>
                    <Text style={styles.adherenceSectionTitle}>Adesão Por Remédio</Text>
                    <ScrollView style={styles.adherenceList}>
                        {
                            reportData == null ? null : reportData.medicinesAdhesion.map((item, index) =>
                            (<View key={index}>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('Detalhes de Adesão', { detalhesDeAdministracao: item });
                                }}>
                                    <View style={styles.adherenceItem}>
                                        <Image
                                            source={require('../../assets/medication.png')}
                                            style={styles.adherenceItemImage}
                                        />
                                        <Text style={styles.adherenceItemText}>{item.medicineName} </Text>
                                        <Text style={styles.adherenceItemPercentage}>{Math.round(item.adhesion)}%</Text>
                                        <Image
                                            source={require('../../assets/setaPraDireita.png')}
                                            style={styles.adherenceItemImage}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}

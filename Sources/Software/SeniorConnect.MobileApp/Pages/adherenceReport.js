import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles.js'; // Import the styles
import { HeaderReturn, Footer } from '../Layout.js'; // Import Header with return button and footer
import stylesAdherenceReport from '../stylesAdherenceReport.js';
import { useEffect, useState } from 'react';
import apiClient from '../services/apiService.js';

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
                <Text style={stylesAdherenceReport.reportTitle}>Relatório de Adesão</Text>

                <View style={stylesAdherenceReport.adherenceStatsContainer}>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : Math.round(reportData.totalAdhesion)}%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses administradas com sucesso</Text>
                    </View>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : Math.round(reportData.missedDosesPercentage)}%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses perdidas</Text>
                    </View>
                </View>

                <View style={stylesAdherenceReport.adherenceSection}>
                    <Text style={stylesAdherenceReport.adherenceSectionTitle}>Adesão Por Remédio</Text>
                    <ScrollView style={stylesAdherenceReport.adherenceList}>
                        {
                            reportData == null ? null : reportData.medicinesAdhesion.map((item, index) =>
                            (<View key={index}>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('Detalhes de Adesão', { detalhesDeAdministracao: item });
                                }}>
                                    <View style={stylesAdherenceReport.adherenceItem}>
                                        <Image
                                            source={require('../assets/medication.png')}
                                            style={stylesAdherenceReport.adherenceItemImage}
                                        />
                                        <Text style={stylesAdherenceReport.adherenceItemText}>{item.medicineName} </Text>
                                        <Text style={stylesAdherenceReport.adherenceItemPercentage}>{Math.round(item.adhesion)}%</Text>
                                        <Image
                                            source={require('../assets/setaPraDireita.png')}
                                            style={stylesAdherenceReport.adherenceItemImage}
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

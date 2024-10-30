import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './styles.js';
import { HeaderReturn, Footer } from '../../Layout.js';
import stylesAdherenceReport from '../adherenceReport/stylesAdherenceReport.js';
import { useEffect, useState } from 'react';

export default function AdherenceReportDetailScreen({ navigation, route }) {
    const [reportData, setReportData] = useState();

    useEffect(() => {
        var detalhesDeAdministracao = route.params.detalhesDeAdministracao;
        console.log("Detalhes de administração: " + JSON.stringify(detalhesDeAdministracao));
        setReportData(detalhesDeAdministracao);
        return () => { };
    }, []);

    return (
        <View style={styles.containerMenu}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={stylesAdherenceReport.reportTitle}>Relatório de Adesão De {reportData == null ? "XX" : reportData.medicineName}</Text>

                <View style={stylesAdherenceReport.adherenceStatsContainer}>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : Math.round(reportData.adhesion)}%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses administradas com sucesso</Text>
                    </View>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : 100 - Math.round(reportData.adhesion)}%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses perdidas</Text>
                    </View>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : reportData.totalSchedulings}</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>agendamentos nos últimos 7 dias</Text>
                    </View>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>{reportData == null ? "XX" : reportData.missedSchedulings.length}</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>agendamentos perdidos nos últimos 7 dias</Text>
                    </View>
                </View>
                {reportData != undefined && reportData.missedSchedulings && reportData.missedSchedulings.length > 0 ?
                    (<View style={stylesAdherenceReport.adherenceSection}>
                        <Text style={stylesAdherenceReport.adherenceSectionTitle}>Agendamentos Perdidos</Text>
                        <ScrollView style={stylesAdherenceReport.adherenceList}>
                            {
                                reportData == null ? null : reportData.missedSchedulings.map((item, index) =>
                                (
                                    <View key={index} style={stylesAdherenceReport.adherenceItem}>
                                        <Text style={stylesAdherenceReport.adherenceItemText}>{item.day}/{item.month}</Text>
                                        <Text style={stylesAdherenceReport.adherenceItemText}>Horário: {String(item.hour).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}</Text>
                                    </View>
                                ))}
                        </ScrollView>
                    </View>) : null}

            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}

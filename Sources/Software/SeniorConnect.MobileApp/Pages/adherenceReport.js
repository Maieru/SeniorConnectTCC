import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles.js'; // Import the styles
import { HeaderReturn, Footer } from '../Layout.js'; // Import Header with return button and footer
import stylesAdherenceReport from '../stylesAdherenceReport.js';

export default function AdherenceReportScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Voltar" returnPage="Reports" navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Title */}
                <Text style={stylesAdherenceReport.reportTitle}>Relatório de Adesão</Text>

                {/* Adherence Statistics */}
                <View style={stylesAdherenceReport.adherenceStatsContainer}>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>XX%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses administradas com sucesso</Text>
                    </View>
                    <View style={stylesAdherenceReport.adherenceStatRow}>
                        <Text style={stylesAdherenceReport.adherencePercentage}>XX%</Text>
                        <Text style={stylesAdherenceReport.adherenceDescription}>de doses perdidas</Text>
                    </View>
                </View>

                {/* Adherence by Medication Section */}
                <View style={stylesAdherenceReport.adherenceSection}>
                    <Text style={stylesAdherenceReport.adherenceSectionTitle}>Adesão Por Remédio</Text>
                    <ScrollView style={stylesAdherenceReport.adherenceList}>
                        {[1, 2, 3, 4].map((item, index) => (
                            <View key={index} style={stylesAdherenceReport.adherenceItem}>
                                <Image
                                    source={require('../assets/medication.png')}
                                    style={stylesAdherenceReport.adherenceItemImage}
                                />
                                <Text style={stylesAdherenceReport.adherenceItemText}>[Medicamento] XX%</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.exportButton} onPress={() => { /* Add export functionality here */ }}>
                    <Text style={styles.exportButtonText}>Exportar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}

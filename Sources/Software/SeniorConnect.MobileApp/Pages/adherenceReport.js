import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles.js'; // Import the styles
import { HeaderReturn, Footer } from '../Layout.js'; // Import Header with return button and footer

export default function AdherenceReportScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Voltar" returnPage="Reports" navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Title */}
                <Text style={styles.reportTitle}>Relatório de Adesão</Text>

                {/* Adherence Statistics */}
                <View style={styles.adherenceStatsContainer}>
                    <View style={styles.adherenceStatRow}>
                        <Text style={styles.adherencePercentage}>XX%</Text>
                        <Text style={styles.adherenceDescription}>de doses administradas com sucesso</Text>
                    </View>
                    <View style={styles.adherenceStatRow}>
                        <Text style={styles.adherencePercentage}>XX%</Text>
                        <Text style={styles.adherenceDescription}>de doses perdidas</Text>
                    </View>
                </View>

                {/* Adherence by Medication Section */}
                <View style={styles.adherenceSection}>
                    <Text style={styles.adherenceSectionTitle}>Adesão Por Remédio</Text>
                    <ScrollView style={styles.adherenceList}>
                        {[1, 2, 3, 4].map((item, index) => (
                            <View key={index} style={styles.adherenceItem}>
                                <Image
                                    source={require('../assets/medication.png')}
                                    style={styles.adherenceItemImage}
                                />
                                <Text style={styles.adherenceItemText}>[Medicamento] XX%</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Export Button */}
                <TouchableOpacity style={styles.exportButton} onPress={() => { /* Add export functionality here */ }}>
                    <Text style={styles.exportButtonText}>Exportar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles.js';
import { Header, Footer } from '../Layout.js';

export default function DosageReportScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <Header title="Relatório de Dosagem" navigation={navigation} returnPage="Reports" />
            <View style={styles.content}>
                <ScrollView style={styles.basicScroll}>
                    <View style={styles.gridContainer}>
                        {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                            <View key={index} style={styles.dayContainer}>
                                <Text style={styles.dayLabel}>{day}</Text>
                                <View style={styles.medicineSlot}>
                                    <Text style={styles.medicineInfo}>[Medicamento 1]</Text>
                                    <Text style={styles.medicineInfo}>Dosagem: HH:MM</Text>
                                </View>
                                <View style={styles.medicineSlot}>
                                    <Text style={styles.medicineInfo}>[Medicamento 2]</Text>
                                    <Text style={styles.medicineInfo}>Dosagem: HH:MM</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

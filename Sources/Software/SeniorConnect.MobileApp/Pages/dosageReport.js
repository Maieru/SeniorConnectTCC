import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { HeaderReturn, Footer } from '../Layout.js';
import styles from '../styles.js';
import stylesDosageReport from '../stylesDosageReport.js';

const { width, height } = Dimensions.get('window');

export default function DosageReportScreen({ navigation }) {

    const days = [
        { day: "Segunda", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Terça", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Quarta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Quinta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Sexta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Sábado", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
        { day: "Domingo", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    ];

    return (
        <View style={styles.containerMenu}>
            {/* HeaderReturn component with back navigation to Reports screen */}
            <HeaderReturn title="Voltar" returnPage="Reports" navigation={navigation} />
            <View style={styles.content}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesDosageReport.scrollContainer}
                >
                    {days.map((dayData, index) => (
                        <View key={index} style={[stylesDosageReport.dayBlock, { width: width * 0.85, height: height * 0.6 }]}>
                            <Text style={stylesDosageReport.dayLabel}>{dayData.day}</Text>
                            {dayData.medications.map((medication, idx) => (
                                <View key={idx} style={stylesDosageReport.medicineSlot}>
                                    <Text style={stylesDosageReport.medicineInfo}>{medication.name}</Text>
                                    <Text style={stylesDosageReport.medicineInfo}>Dosagem: {medication.dosage}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

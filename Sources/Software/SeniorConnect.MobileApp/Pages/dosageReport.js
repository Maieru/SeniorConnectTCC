import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { HeaderReturn, Footer } from '../Layout.js';
import styles from '../styles.js';
import stylesDosageReport from '../stylesDosageReport.js';
import apiClient from '../services/apiService.js';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function DosageReportScreen({ navigation }) {

    const [report, setReport] = useState();
    const [days, setDays] = useState([]);
    // await apiClient.get("/v1/Report/GetWeeklySchedulesReport?subscriptionId=" + apiClient.getSubscription());

    useEffect(() => {
        const fetchData = async () => {
            const data = await constroiData();
            const daysData = await buildDaysData(data);
            setDays(daysData);
        }
        fetchData();

        return () => { }; //É feio, é estranho.... mas funciona. Juro que tirando isso morre
    }, []
    )

    async function getMedicinesByDay(dado, dayOfWeek) {
        if (!dado || !dado.length) return [];

        const daySchedule = dado.find(day => day.dayOfWeek === dayOfWeek);

        if (daySchedule) {
            return daySchedule.scheduledMedicines;
        } else {
            return [];
        }
    }

    async function constroiData() {
        const response = await apiClient.get("/v1/Report/GetWeeklySchedulesReport?subscriptionId=" + apiClient.getSubscription());
        setReport(response.data);
        
        return response.data;
    }

    async function buildDaysData(reportData) {
        const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const daysData = [];

        for (let i = 0; i < 7; i++) {
            const medicines = await getMedicinesByDay(reportData, i);
            const medicationsFormatted = medicines.map(med => ({
                name: med.medicineName,
                dosage: med.medicineTimes.map(time => `${time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute}`).join(", ")
            }));

            daysData.push({
                day: daysOfWeek[i],
                medications: medicationsFormatted
            });
        }

        return daysData;
    }
    {/**    const days = [
    { day: "Segunda", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Terça", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Quarta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Quinta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Sexta", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Sábado", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
    { day: "Domingo", medications: [{ name: "[Medicamento 1]", dosage: "HH:MM" }, { name: "[Medicamento 2]", dosage: "HH:MM" }] },
];*/}


    return (
        <View style={styles.containerMenu}>
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

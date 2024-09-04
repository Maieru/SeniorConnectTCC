import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import styles from '../styles.js';
import { HeaderReturn, Footer, HorariosMedicine } from '../Layout.js';

export default function MedicineScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Novo Medicamento" navigation={navigation} returnPage={"Medicine"} />
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.cadastroInput}
                            placeholder="Nome do Medicamento"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.cadastroInput}
                            placeholder="Descrição"
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity
                            //onPress={} || Modificar em um futuro próximo
                            style={styles.cadastroButton}>
                            <Text style={styles.basicButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.basicLabel}>Horários</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NewMedicine')}
                            style={styles.newMedicineButton}>
                            <Text style={styles.basicButtonText}>Novo Horário/Dosagem</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.basicScroll}>
                            <HorariosMedicine horario={"12:00"} />
                            <HorariosMedicine horario={"13:00"} />
                            <HorariosMedicine horario={"14:00"} />
                            <HorariosMedicine horario={"15:00"} />
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
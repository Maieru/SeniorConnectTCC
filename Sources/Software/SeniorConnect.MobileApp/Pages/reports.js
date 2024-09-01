import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';
import { Header, Footer } from '../Layout.js';

export default function ReportsScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <Header title="Reports" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('DosageReport')}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.basicLabel}>Relatório de Dosagem</Text>
                            <Text style={styles.basicLabel}>
                                Relatório utilizado para se ter visualização de todos os medicamentos tomados em cada dia, além de seus horários e dosagens
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('AdherenceReport')}>
                            <Text style={styles.basicLabel}>Relatório de Adesão</Text>
                            <Text style={styles.basicLabel}>
                                Relatório responsável pela adesão total dos medicamentos do último mês, levando em conta cada medicamento individual
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';
import stylesReports from '../stylesReports.js';
import { Header, Footer } from '../Layout.js';

export default function ReportsScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <View style={styles.content}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Relatorio de Dosagem')}>
                        <View style={stylesReports.sectionContainer}>
                            <Text style={stylesReports.sectionTitle}>Relatório de Dosagem</Text>
                            <View style={stylesReports.divider} />
                            <Text style={stylesReports.sectionDescription}>
                                Relatório utilizado para se ter visualização de todos os medicamentos tomados em cada dia, além de seus horários e dosagens
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Relatorio de Adesão')}>
                        <View style={stylesReports.sectionContainer}>
                            <Text style={stylesReports.sectionTitle}>Relatório de Adesão</Text>
                            <View style={stylesReports.divider} />
                            <Text style={stylesReports.sectionDescription}>
                                Relatório responsável pela adesão total dos medicamentos do último mês, levando em conta cada medicamento individual ou a totalidade das dosagens.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

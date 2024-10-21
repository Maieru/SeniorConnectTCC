import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';
import stylesReports from '../stylesReports.js';
import { Header, Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';

export default function UserAreaScreen({ navigation }) {

    async function deletaUsuario() {
        console.log('Por enquanto não faz nada!');    
    }

    return (
        <View style={styles.containerMenu}>
            <View style={styles.content}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => deletaUsuario()}>
                        <View style={stylesReports.sectionContainer}>
                            <Text style={stylesReports.sectionTitle}>Deletar Usuário</Text>
                            <View style={stylesReports.divider} />
                            <Text style={stylesReports.sectionDescription}>
                                Deletar usuário, conta e todos os vínculos que este id já teve com nosso sistema. Seguindo as normas da LGPD.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

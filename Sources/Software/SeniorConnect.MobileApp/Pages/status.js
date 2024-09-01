import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';
import { Header, Footer } from '../Layout.js';

export default function StatusScreen({ navigation }) {
    return (
        <View style={styles.containerMenu}>
            <Header title="Status" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.gridContainer}>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <View key={index} style={styles.gridItem}>
                            <Image source={require('../assets/medication.png')} style={styles.gridItemImage} />
                            <Text style={styles.gridItemText}>[Remédio]</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        Status: <Text style={styles.statusConnected}>Conectado</Text>
                    </Text>
                    <Text style={styles.statusText}>Última Comunicação: XX/XX/XXXX XX:XX:XX</Text>
                    <Text style={styles.statusText}>Próximo Alerta: XX/XX/XXXX XX:XX:XX</Text>
                </View>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}

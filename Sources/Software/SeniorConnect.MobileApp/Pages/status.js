// status.js
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import styles from '../styles.js'; // Importa os estilos comuns
import stylesStatus from '../stylesStatus.js'; // Importa os estilos específicos
import { Header, Footer } from '../Layout.js';

export default function StatusScreen({ navigation }) {

    const [selectedIndex, setSelectedIndex] = useState(null);
    const medicines = Array.from({ length: 9 }).map((_, index) => `Medicamento ${index + 1}`);

    const handleOutsideClick = () => {
        setSelectedIndex(null);
    };

    return (
        <View style={styles.containerMenu}>
            <Header navigation={navigation} />
            <TouchableOpacity
                style={styles.content}
                activeOpacity={1}
                onPress={handleOutsideClick}
            >
                <View style={stylesStatus.gridContainer}>
                    {medicines.map((name, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                stylesStatus.gridItem,
                                selectedIndex !== null && selectedIndex !== index ? stylesStatus.blurredItem : {},
                            ]}
                            onPress={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(index);
                            }}
                        >
                            <Image
                                source={require('../assets/medication.png')}
                                style={stylesStatus.gridItemImage}
                            />
                            {selectedIndex === index && (
                                <View style={stylesStatus.balloon}>
                                    <Text style={stylesStatus.balloonText}>{name}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={selectedIndex !== null ? [stylesStatus.statusContainer, stylesStatus.blurredItem] : stylesStatus.statusContainer}>
                    <Text style={stylesStatus.statusText}>
                        Status: <Text style={stylesStatus.statusConnected}>Conectado</Text>
                    </Text>
                    <Text style={stylesStatus.statusText}>Última Comunicação: XX/XX/XXXX XX:XX:XX</Text>
                    <Text style={stylesStatus.statusText}>Próximo Alerta: XX/XX/XXXX XX:XX:XX</Text>
                </View>
            </TouchableOpacity>
            <Footer navigation={navigation} style={selectedIndex !== null ? stylesStatus.blurredItem : {}} />
        </View>
    );
}

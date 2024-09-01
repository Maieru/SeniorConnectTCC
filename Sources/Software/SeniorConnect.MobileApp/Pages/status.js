import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import styles from '../styles.js';
import { Header, Footer } from '../Layout.js';

export default function StatusScreen({ navigation }) {
    // State to track the selected medicine index
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Dummy data for medicine names
    const medicines = Array.from({ length: 9 }).map((_, index) => `Medicamento ${index + 1}`);

    // Function to handle outside click and reset the selection
    const handleOutsideClick = () => {
        setSelectedIndex(null);
    };

    return (
        <View style={styles.containerMenu}>
            <Header title="Status" navigation={navigation} />
            {/* Wrapping TouchableOpacity to detect outside clicks */}
            <TouchableOpacity
                style={styles.content}
                activeOpacity={1}
                onPress={handleOutsideClick}
            >
                <View style={styles.gridContainer}>
                    {medicines.map((name, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.gridItem,
                                // Apply blur effect only when an item is selected and it is not the clicked one
                                selectedIndex !== null && selectedIndex !== index ? styles.blurredItem : {},
                            ]}
                            onPress={(e) => {
                                e.stopPropagation(); // Prevent triggering the outside click
                                setSelectedIndex(index); // Set the clicked item as selected
                            }}
                        >
                            <Image
                                source={require('../assets/medication.png')}
                                style={styles.gridItemImage}
                            />
                            {selectedIndex === index && (
                                <View style={styles.balloon}>
                                    <Text style={styles.balloonText}>{name}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Blur the status section when an item is selected */}
                <View style={selectedIndex !== null ? [styles.statusContainer, styles.blurredItem] : styles.statusContainer}>
                    <Text style={styles.statusText}>
                        Status: <Text style={styles.statusConnected}>Conectado</Text>
                    </Text>
                    <Text style={styles.statusText}>Última Comunicação: XX/XX/XXXX XX:XX:XX</Text>
                    <Text style={styles.statusText}>Próximo Alerta: XX/XX/XXXX XX:XX:XX</Text>
                </View>
            </TouchableOpacity>
            {/* Blur the footer when an item is selected */}
            <Footer navigation={navigation} style={selectedIndex !== null ? styles.blurredItem : {}} />
        </View>
    );
}

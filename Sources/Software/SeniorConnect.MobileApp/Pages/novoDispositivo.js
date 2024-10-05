import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import styles from '../styles.js';
import stylesDispositivo from '../stylesNovoDispositivo.js'
import { Footer} from '../Layout.js';
import apiClient from '../services/apiService.js';
import React, {useState } from 'react';

export default function NovoDispositivo({ navigation }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    return (
        <><View style={styles.containerMenu}>
            <View style={styles.content}>
            <TextInput
                    style={stylesDispositivo.input}
                    placeholder="SSID"
                    value={ssid}
                    onChangeText={setSsid}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={stylesDispositivo.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#888"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={stylesDispositivo.button}
                >
                    <Text style={stylesDispositivo.buttonText}>Cadastrar Dispositivo</Text>
                </TouchableOpacity>

            </View>
            <Footer navigation={navigation} />
        </View></>
    )
}
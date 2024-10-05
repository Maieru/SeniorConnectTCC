import styles from '../styles.js';
import stylesDispositivo from '../stylesNovoDispositivo.js'
import { Text, View, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Alert } from 'react-native';
import { Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';
import React, { useState, useEffect } from 'react';
import WifiManager from 'react-native-wifi-reborn';

export default function NovoDispositivo({ navigation, route }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    const SENIOR_CONNECT_DEVICE_SSID = 'SENIOR_CONNECT_DEVICE';

    useEffect(() => {
        if (Platform.OS === 'android') {
            checkLocationPermission();
        }
    }, []);

    const checkLocationPermission = async () => {
        try {
            const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (!hasPermission) {
                requestLocationPermission();
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const connectToWifi = () => {
        const ssid = 'Your_SSID';
        const password = 'Your_Password';

        WifiManager.connectToProtectedSSID(ssid, password, false)
            .then(() => {
                console.log('Connected successfully!');
            })
            .catch((error) => {
                console.log('Connection failed!', error);
            });
    };

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permissão de Localização',
                    message: 'Precisamos da permissão para acessar sua localização para configurar o dispositivo.',
                    buttonNeutral: 'Pergunte Depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Concordar',
                },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permissão de Localização negada');
                navigation.goBack();
            }
        } catch (err) {
            console.warn(err);
        }
    };

    async function cadastrarDispositivo() {
        if (ssid === '' || password === '') {
            Alert.alert('Preencha todos os campos');
            return;
        }

        let deviceInformation = { ssid: ssid, password: password };

        if (route.params.createNewDevice) {
            let response = await apiClient.createNewDevice();
            deviceInformation.deviceName = response.data.deviceName;
            deviceInformation.devicePrimaryKey = response.data.devicePrimaryKey;
        }
        else {
            deviceInformation.deviceName = route.params.deviceName;
            deviceInformation.devicePrimaryKey = route.params.devicePrimaryKey;
        }

        WifiManager.connectToSSID(SENIOR_CONNECT_DEVICE_SSID).then(() => {
            console.log('Connected successfully!');    
        });

        console.log(deviceInformation);
    }

    return (
        <View style={styles.containerMenu}>
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
                    onPress={async () => await cadastrarDispositivo()}
                >
                    <Text style={stylesDispositivo.buttonText}>Cadastrar Dispositivo</Text>
                </TouchableOpacity>

            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
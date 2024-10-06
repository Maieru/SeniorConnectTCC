import styles from '../styles.js';
import stylesDispositivo from '../stylesNovoDispositivo.js'
import { Text, View, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Alert, ScrollView } from 'react-native';
import { Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';
import React, { useState, useEffect } from 'react';
import WifiManager from 'react-native-wifi-reborn';
import axios from 'axios';

export default function NovoDispositivo({ navigation, route }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    const SENIOR_CONNECT_DEVICE_SSID = 'SENIOR_CONNECT_DEVICE';
    const SENIOR_CONNECT_DEVICE_AP_PASSWORD = 'SENIOR_CONNECT_750da811de3d4aa8bd8a78168f21fff9';
    const SENIOR_CONNECT_DEVICE_DEFAULT_IP = "http://192.168.4.1";

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

        await WifiManager.connectToProtectedSSID(SENIOR_CONNECT_DEVICE_SSID, SENIOR_CONNECT_DEVICE_AP_PASSWORD, false, false).then(async () => {
            const formData = new FormData();
            formData.append('ssid', deviceInformation.ssid);
            formData.append('password', deviceInformation.password);
            formData.append('deviceName', deviceInformation.deviceName);
            formData.append('devicePrimaryKey', deviceInformation.devicePrimaryKey);

            console.log(formData);

            await axios.post(`${SENIOR_CONNECT_DEVICE_DEFAULT_IP}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                console.log(response.data);
                navigation.navigate('Dispositivo');
            }).catch(erro => {
                var mensagemErro = ''
                mensagemErro += erro.toString();
        
                if (erro.response)
                    mensagemErro += ' - ' + erro.response.data;
        
                    mensagemErro += ' ---- Detalhes da Requisição ---- ' + JSON.stringify(erro.request);
        
                console.log(mensagemErro);
            });
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
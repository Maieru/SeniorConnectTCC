import styles from '../styles.js';
import stylesDispositivo from '../stylesNovoDispositivo.js'
import {
    Text, View, TouchableOpacity, TextInput,
    Platform, PermissionsAndroid, Alert, ActivityIndicator
} from 'react-native';
import { Footer } from '../Layout.js';
import apiClient from '../services/apiService.js';
import React, { useState, useEffect } from 'react';
import WifiManager from 'react-native-wifi-reborn';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';

export default function NovoDispositivo({ navigation, route }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const SENIOR_CONNECT_DEVICE_SSID = 'SENIOR_CONNECT_DEVICE';
    const SENIOR_CONNECT_DEVICE_AP_PASSWORD = 'SENIOR_CONNECT_750da811de3d4aa8bd8a78168f21fff9';
    const SENIOR_CONNECT_DEVICE_DEFAULT_IP = "http://192.168.4.1";

    useEffect(() => {
        if (Platform.OS === 'android') {
            checkLocationPermission();
        }
        checkWifiConnection();
        checkLocationEnabled();
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

    const checkWifiConnection = () => {
        NetInfo.fetch().then(state => {
            if (!(state.type === 'wifi' && state.isConnected)) {
                Alert.alert('Wi-Fi Desligado', 'Para realizar a configuração de um dispositivo, é necessário que o Wi-Fi e a localização estejam ativas.');
                navigation.goBack();
            }
        });
    };

    const checkLocationEnabled = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão de Localização', 'Permissão de localização negada.');
            navigation.goBack();
            return;
        }

        let locationServicesEnabled = await Location.hasServicesEnabledAsync();
        if (!locationServicesEnabled) {
            Alert.alert('Localização Desligada', 'Para realizar a configuração de um dispositivo, é necessário que o Wi-Fi e a localização estejam ativas.');
            navigation.goBack();
            return;
        }
    };

    async function cadastrarDispositivo() {
        if (ssid === '' || password === '') {
            Alert.alert('Preencha todos os campos');
            return;
        }

        setIsLoading(true);

        let deviceInformation = { ssid, password };

        if (route.params.createNewDevice) {
            let response = await apiClient.createNewDevice();
            deviceInformation.deviceName = response.data.deviceName;
            deviceInformation.devicePrimaryKey = response.data.devicePrimaryKey;
        } else {
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
                navigation.navigate('Dispositivo', { update: true });
            }).catch(erro => {
                var mensagemErro = ''
                mensagemErro += erro.toString();

                if (erro.response)
                    mensagemErro += ' - ' + erro.response.data;

                mensagemErro += ' ---- Detalhes da Requisição ---- ' + JSON.stringify(erro.request);

                console.log(mensagemErro);
            });
        });


        navigation.navigate('Dispositivo', { update: true });


        setIsLoading(false);

    }

    return (
        <View style={stylesDispositivo.containerMenu}>
            <View style={stylesDispositivo.contentWrapper}>
                <View style={stylesDispositivo.content}>
                    <TextInput
                        style={stylesDispositivo.input}
                        placeholder="Nome do Wi-fi"
                        value={ssid}
                        onChangeText={setSsid}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={stylesDispositivo.input}
                        placeholder="Senha do Wi-fi"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={stylesDispositivo.button}
                        onPress={cadastrarDispositivo}
                    >
                        <Text style={stylesDispositivo.buttonText}>Cadastrar Dispositivo</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <Footer navigation={navigation} />


            {isLoading && (
                <View style={stylesDispositivo.overlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={stylesDispositivo.loadingText}>Cadastrando dispositivo...</Text>
                </View>
            )}
        </View>
    );
}

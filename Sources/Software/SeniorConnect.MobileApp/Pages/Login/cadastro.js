import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from './styles.js';
import { HeaderReturn } from '../../Layout.js';
import { useState } from 'react';
import apiClient from '../../services/apiService.js';

export default function CadastroScreen({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');

    async function salva() {
        let objUsuario = {
            username: usuario,
            password: senha,
            email: email,
            name: usuario,
            createNewSubscription: true
        }

        await apiClient.post('/v1/User/Create', objUsuario, true)
            .then(response => {
                if (response.status === 200) {
                    Alert.alert('Usuário cadastrado com sucesso!');
                    navigation.navigate('Login');
                    return;
                }
            })
            .catch(error => {
                if (error.status === 400) {
                    Alert.alert(error.response.data);
                    return;
                }

                Alert.alert('Erro ao cadastrar usuário');
            });
    }

    return (
        <View style={styles.containerMenu}>
            <View style={styles.content}>
                <TextInput
                    style={styles.cadastroInput}
                    placeholder="Usuário"
                    placeholderTextColor="#888"
                    onChangeText={text => setUsuario(text)}
                />
                <TextInput
                    style={styles.cadastroInput}
                    placeholder="Senha"
                    placeholderTextColor="#888"
                    onChangeText={text => setSenha(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.cadastroInput}
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#888"
                    onChangeText={text => setConfirmarSenha(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.cadastroInput}
                    placeholder="E-mail"
                    placeholderTextColor="#888"
                    onChangeText={text => setEmail(text)}
                />
                <TouchableOpacity
                    onPress={async () => await salva()}
                    style={styles.cadastroButton}>
                    <Text style={styles.basicButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
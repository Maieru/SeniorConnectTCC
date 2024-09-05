import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles.js';
import { HeaderReturn } from '../Layout.js';
import { useState } from 'react';
import apiClient from '../services/apiService.js';

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

        await apiClient.post('/v1/User/Create', objUsuario, true).then(response => { console.log(response) }).catch(error => { console.log(error) });
    }

    return (
        <View style={styles.containerMenu}>
            <HeaderReturn title="Cadastro" returnPage="Login" navigation={navigation} />
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
                />
                <TextInput
                    style={styles.cadastroInput}
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#888"
                    onChangeText={text => setConfirmarSenha(text)}
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
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from '../styles.js';
import apiClient from '../services/apiService.js';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');


  async function login() {

    let objUsuario = {
      username: usuario,
      password: senha,
    }

    apiClient.setCredentials(usuario, senha);
    let token = await apiClient.getToken();
 
    if (token != undefined) {
      navigation.navigate('Home')

    }else{
      Alert.alert("Usuário Inválido!")
    }
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginImage}>
        <Image
          style={styles.senniorLogo}
          source={require('../assets/LogoConnect.png')}
        />
      </View>

      <TextInput
        style={styles.basicInput}
        placeholder="Usuário"
        placeholderTextColor="#888"
        onChangeText={text => setUsuario(text)}
      />

      <TextInput
        style={styles.basicInput}
        placeholder="Senha"
        placeholderTextColor="#888"
        onChangeText={text => setSenha(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={() => login()}
        style={styles.basicButton}>
        <Text style={styles.basicButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.basicLabel}>
          Não possui uma conta? <Text style={styles.cadastrar}>Criar Conta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}


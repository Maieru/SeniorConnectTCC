import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles.js';
import apiClient from '../../services/apiService.js';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function login() {
    try {
      let objUsuario = {
        username: usuario,
        password: senha,
      };

      apiClient.setCredentials(usuario, senha);
      let token = await apiClient.getToken();

      if (token) {
        const accepted = await AsyncStorage.getItem(`termsAccepted_${usuario}`);
        console.log('Termos aceitos:', accepted);

        if (accepted === 'true') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('TermsOfUse', { usuario });
        }
      } else {
        Alert.alert('Usuário Inválido!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
    }
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginImage}>
        <Image
          style={styles.senniorLogo}
          source={require('../../assets/LogoConnect.png')}
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

      <TouchableOpacity onPress={login} style={styles.basicButton}>
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
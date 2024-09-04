import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles.js';
import apiService from '../services/apiService.js';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginImage}>
        <Image
          style={styles.senniorLogo}
          source={require('../assets/SenniorConnect.jpeg')}
        />
      </View>

      <TextInput
        style={styles.basicInput}
        placeholder="Usuário"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.basicInput}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
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


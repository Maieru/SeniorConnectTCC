import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from './styles.js';
import {HeaderReturn} from './Layout';

export default function CadastroScreen({ navigation }) {
    return (
    <View style={styles.container}>
        <HeaderReturn title= "Cadastro" returnPage="Login" navigation={navigation}/>
        <View style={styles.spacer}></View>
        <View style={styles.content}>
            <TextInput
                style={styles.basicInput}
                placeholder="Usuário"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.basicInput}
                placeholder="Senha"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.basicInput}
                placeholder="Confirmar Senha"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.basicInput}
                placeholder="E-mail"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.basicInput}
                placeholder="Key de Cadastro"
                placeholderTextColor="#888"
            />
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.cadastroButton}>
            <Text style={styles.basicButtonText}>Salvar</Text>
      </TouchableOpacity>
        </View>
      </View>
    );
}
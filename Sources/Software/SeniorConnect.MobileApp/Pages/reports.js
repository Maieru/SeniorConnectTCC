import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';
import {Header, Footer} from '../Layout.js';

export default function ReportsScreen({ navigation }) {
return(
    <View style={styles.containerMenu}>
        <Header title= "Reports" navigation={navigation}/>
    <View style={styles.content}>

    </View>
        <Footer navigation={navigation}/>
    </View>
)}
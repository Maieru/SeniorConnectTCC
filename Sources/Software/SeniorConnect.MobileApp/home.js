import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';
import {Header, Footer} from './Layout';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.containerMenu}>
        <Header title= "Home/Index" navigation={navigation}/>
        <View style={styles.content}>

        </View>
        <Footer navigation={navigation}/>
      </View>
    )
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicineScreen from './medicine.js';
import HomeScreen from './home.js';
import StatusScreen from './status.js';
import ReportsScreen from './reports.js';
import LoginScreen from './login.js';
import CadastroScreen from './cadastro.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Medicine" component={MedicineScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Status" component={StatusScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Reports" component={ReportsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}
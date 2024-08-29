import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicineScreen from './Pages/medicine.js';
import HomeScreen from './Pages/home.js';
import StatusScreen from './Pages/status.js';
import ReportsScreen from './Pages/reports.js';
import LoginScreen from './Pages/login.js';
import CadastroScreen from './Pages/cadastro.js';

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
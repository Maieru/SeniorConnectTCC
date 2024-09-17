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
import NewMedicineScreen from './Pages/newMedicine.js';
import DosageReportScreen from './Pages/dosageReport.js';
import AdherenceReportScreen from './Pages/adherenceReport.js';
import HorariosMedicineScreen from './Pages/newScheduling.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Medicine" component={MedicineScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Status" component={StatusScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reports" component={ReportsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewMedicine" component={NewMedicineScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DosageReport" component={DosageReportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdherenceReport" component={AdherenceReportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HorariosMedicine" component={HorariosMedicineScreen} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}
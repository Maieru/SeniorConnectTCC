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
import NovoDispositivoScreen from './Pages/novoDispositivo.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5082FE',
            height: 80,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Medicamentos" component={MedicineScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Dispositivo" component={StatusScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Relatorios" component={ReportsScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Novo Medicamento" component={NewMedicineScreen} />
        <Stack.Screen name="Relatorio de Dosagem" component={DosageReportScreen} />
        <Stack.Screen name="Relatorio de Adesão" component={AdherenceReportScreen} />
        <Stack.Screen name="Novo Horario" component={HorariosMedicineScreen} />
        <Stack.Screen name="Novo Dispositivo" component={NovoDispositivoScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
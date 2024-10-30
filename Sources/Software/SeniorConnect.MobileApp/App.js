import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicineScreen from './Pages/Medicine/medicine.js';
import HomeScreen from './Pages/Home/home.js';
import AsignScreen from './Pages/Asign/status.js';
import ReportsScreen from './Pages/Reports/reports.js';
import LoginScreen from './Pages/Login/login.js';
import CadastroScreen from './Pages/Login/cadastro.js';
import NewMedicineScreen from './Pages/Medicine/newMedicine.js';
import DosageReportScreen from './Pages/dosageReport.js';
import AdherenceReportScreen from './Pages/adherenceReport/adherenceReport.js';
import HorariosMedicineScreen from './Pages/newScheduling.js';
import NovoDispositivoScreen from './Pages/novoDispositivo.js';
import AdherenceReportDetailScreen from './Pages/adherenceReportDetail.js';
import TermoDeUsoScreen from './Pages/termoDeUso.js';
import UserAreaScreen from './Pages/userArea.js';


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
        <Stack.Screen name="Dispositivo" component={AsignScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Relatorios" component={ReportsScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Novo Medicamento" component={NewMedicineScreen} />
        <Stack.Screen name="Relatorio de Dosagem" component={DosageReportScreen} />
        <Stack.Screen name="Relatorio de Adesão" component={AdherenceReportScreen} />
        <Stack.Screen name="Novo Horario" component={HorariosMedicineScreen} />
        <Stack.Screen name="Novo Dispositivo" component={NovoDispositivoScreen} />
        <Stack.Screen name="Detalhes de Adesão" component={AdherenceReportDetailScreen} />
        <Stack.Screen name="TermsOfUse" component={TermoDeUsoScreen} options={{ title: 'Termos de Uso' }} />
        <Stack.Screen name="UserArea" component={UserAreaScreen} options={{ title: 'Area do Usuário' }} />
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}
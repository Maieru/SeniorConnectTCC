import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import styles from './styles.js';
import stylesNewMedicine from './stylesNewMedicine.js';
import apiClient from './services/apiService.js';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

function HeaderReturn({ navigation, title, returnPage, }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerImageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(returnPage)}>
          <Image
            source={require('./assets/Footer/arrow.png')}
            style={styles.headerImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}> {title}</Text>
      </View>
    </View>
  )
}

function Header({ title, }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerImageContainer}>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}> {title}</Text>
      </View>
    </View>
  )
}

function RemediosHome({ nome, horario, }) {
  return (<View style={styles.homeMedicineContainer}>
    <Image
      source={require('./assets/medication.png')}
      style={styles.homeItemImage}
    />
    <CheckBox
      //value={teste}
      //onValueChange={} métodoa ser programado
      style={styles.basicCheckbox}
    />
    <Text style={styles.homeMedicineText}>{nome}  </Text>
    <Text style={styles.homeMedicineText}>{horario}</Text>
  </View>
  )
}

function RemediosMedicine({ nome, id, navigation, medicine, onDelete }) {
  return (
    <View style={styles.remediosMedicineContainer}>
      <Image
        source={require('./assets/medication.png')}
        style={styles.homeItemImage}
      />
      <View style={styles.medicineScrollContainerStart}>
        <Text style={styles.homeMedicineText}>{nome}  </Text>
      </View>
      <View style={styles.medicineScrollContainerEnd}>
        <TouchableOpacity
          onPress={async () => await navigation.navigate('Novo Medicamento', { medicine })}
          style={styles.medicineActionsImage}>
          <Image
            source={require('./assets/edit.png')}
            style={styles.footerImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.medicineActionsImage}
          onPress={async () => onDelete(id)}
        >
          <Image
            source={require('./assets/delete.png')}
            style={styles.footerImage} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function HorariosMedicine({ horario, diasSemana, id, medicamentoId, navigation }) {
  return (
    <View style={stylesNewMedicine.scheduleContainer}>
      <View style={stylesNewMedicine.horarioContainer}>
        <Text style={stylesNewMedicine.horarioText}>{horario}</Text>
      </View>
      <View style={stylesNewMedicine.diasContainer}>
        <View style={stylesNewMedicine.diasSemanaContainer}>
          {diasSemana.split('').map((dia, index) => (
            <Text key={index} style={stylesNewMedicine.diaSemana}>{dia}</Text>
          ))}
        </View>
      </View>
      <View style={stylesNewMedicine.actionsContainer}>
        <TouchableOpacity
          style={stylesNewMedicine.actionButton}
          onPress={() => navigation.navigate('Novo Horario', { medicine: medicamentoId, scheduling: id })}
        >
          <Image
            source={require('./assets/edit.png')}
            style={stylesNewMedicine.actionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesNewMedicine.actionButton}
          onPress={async () => await deletaSchedule(id, navigation)}
        >
          <Image
            source={require('./assets/delete.png')}
            style={stylesNewMedicine.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function deletaSchedule(id, navigation) {
  try {
    apiClient.delete("/v1/Scheduling/Delete?schedulingId=" + id)
    Alert.alert(
      "Feito!",
      "Horário deletado como solicitado!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Medicine')
        }
      ]
    );
  } catch {
    Alert.alert(
      "Atenção!",
      "Houve um erro inesperado, favor contatar o grupo!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Medicine')
        }
      ]
    );
  }
}

function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Home')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/home.png')}
            style={styles.footerImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Medicamentos')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/medicine.png')}
            style={styles.footerImage}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Dispositivo')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/agenda.png')}
            style={styles.footerImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Relatorios')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/chart.png')}
            style={styles.footerImage} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export { Header, Footer, HeaderReturn, RemediosHome, RemediosMedicine, HorariosMedicine };
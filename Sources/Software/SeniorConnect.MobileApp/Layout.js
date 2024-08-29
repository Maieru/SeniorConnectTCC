import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,} from 'react-native';
import CheckBox from 'expo-checkbox';
import styles from './styles.js';

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

function MedicineHome({ nome, horario, }) {
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
        onPress={() => navigation.navigate('Medicine')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/medicine.png')}
            style={styles.footerImage}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Status')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/agenda.png')}
            style={styles.footerImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Reports')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/Footer/chart.png')}
            style={styles.footerImage} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export { Header, Footer, HeaderReturn, MedicineHome };
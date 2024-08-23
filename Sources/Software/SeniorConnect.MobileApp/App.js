import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerImageContainer}>
        <TouchableOpacity>
          <Image
              source={require('./assets/Footer/arrow.png')}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}> Home/Index</Text>
        </View>

      </View>
      <View style={styles.content}>
        
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/Footer/home.png')}
              style={styles.footerImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/Footer/medicine.png')}
              style={styles.footerImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/Footer/agenda.png')}
              style={styles.footerImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/Footer/chart.png')}
              style={styles.footerImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
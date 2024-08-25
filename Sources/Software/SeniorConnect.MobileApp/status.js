import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';

export default function StatusScreen({ navigation }) {
return(
<View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImageContainer}>
            <TouchableOpacity>
              <Image
                source={require('./assets/Footer/arrow.png')}
                style={styles.headerImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}> Status</Text>
          </View>

        </View>
        <View style={styles.content}>

        </View>
        <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => navigation.navigate('Home') }>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/Footer/home.png')}
                style={styles.footerImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => navigation.navigate('Medicine') }>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/Footer/medicine.png')}
                style={styles.footerImage}
                />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => navigation.navigate('Status') }>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/Footer/agenda.png')}
                style={styles.footerImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => navigation.navigate('Reports') }>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/Footer/chart.png')}
                style={styles.footerImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
)}
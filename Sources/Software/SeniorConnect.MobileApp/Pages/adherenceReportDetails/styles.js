import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItemWrapper: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurredItem: {
    opacity: 0.3,
  },
  gridItemImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  gridItemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  dropdownContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: 200,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  basicFlatList: {
    width: '100%',
  },
  statusExcluirButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  statusExcluirButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statusCadastrarDispositivo: {
    backgroundColor: '#7DDA58',
    padding: 20,
    margin: 20,
  },
});

export default styles;

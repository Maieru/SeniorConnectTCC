// stylesStatus.js
import { StyleSheet } from 'react-native';

const stylesStatus = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  gridItem: {
    width: '30%',
    height: 100,
    margin: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gridItemImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  blurredItem: {
    opacity: 0.3,
    pointerEvents: 'none',
  },
  balloon: {
    position: 'absolute',
    bottom: 110,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  balloonText: {
    color: '#fff',
    fontSize: 14,
  },
  statusContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  statusConnected: {
    color: 'green',
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 110,
    left: '40%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: 150, // Definir uma altura máxima para permitir a rolagem
    zIndex: 1,
    width: '100%', // Largura para caber corretamente na tela
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
});

export default stylesStatus;

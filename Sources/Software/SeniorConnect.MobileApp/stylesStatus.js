// stylesStatus.js
import { StyleSheet } from 'react-native';

const stylesStatus = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
},
  gridItem: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gridItemWrapper: {
    width: '30%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
    left: '40%',
    top: '100%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    zIndex: 10,
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
  basicFlatList: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 8,
},
});

export default stylesStatus;

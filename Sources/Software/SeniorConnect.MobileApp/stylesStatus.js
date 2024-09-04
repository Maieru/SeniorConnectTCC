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
});

export default stylesStatus;

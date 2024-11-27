import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5082FE',
    paddingVertical: 25,
    width: '100%',
  },
  headerItem: {
    alignItems: 'flex-start',
    width: '69%',
    justifyContent: 'flex-end',
  },
  headerImageContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerImage: {
    width: 40,
    height: 40,
    justifyContent: 'flex-end',
  },
  containerMenu: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5082FE',
    paddingVertical: 30,
  },
  footerItem: {
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 15,
    borderColor: '#fff',
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  footerImage: {
    width: 40,
    height: 40,
  },
  basicButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  basicLabel: {
    color: '#000',
    fontSize: 20,
    alignSelf: 'center',
  },
  homeTitle: {
    color: '#000',
    fontSize: 40,
  },
  homeMedicineContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  homeItemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  homeMedicineText: {
    fontSize: 20,
    color: '#000',
    width: '80%',
  },
  remediosMedicineContainer: {
    backgroundColor: '#ccc',
    padding: 4,
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
  },
  medicineScrollContainerStart: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  medicineScrollContainerEnd: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicineActionsImage: {
    width: 40,
    height: 40,
    marginStart: 2,
  },
  basicScroll: {
    width: '100%',
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 110,
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
    maxHeight: 150,
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
});

export default styles;

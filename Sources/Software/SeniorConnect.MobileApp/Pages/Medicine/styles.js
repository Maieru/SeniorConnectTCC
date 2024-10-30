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
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  basicScroll: {
    width: '100%',
  },
  medicineButton: {
    width: 'auto',
    height: 50,
    backgroundColor: '#9C9EA7',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginStart: 15,
    marginTop: 15,
    padding: 10,
  },
  basicButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  remediosMedicineContainer: {
    backgroundColor: '#ccc',
    padding: 4,
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
  },
  homeMedicineText: {
    fontSize: 20,
    color: '#000',
    width: '45%',
  },
  homeItemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  homeButton: {
    width: '70%',
    height: 50,
    backgroundColor: '#9C9EA7',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
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
  footerImage: {
    width: 40,
    height: 40,
  },
});

export default styles;

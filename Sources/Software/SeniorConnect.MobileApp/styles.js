import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
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
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
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
  headerText: {
    color: 'black',
    fontSize: 25,
  },
  medicineIcons: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    marginStart: 10,
  },
  footerImage: {
    width: 40,
    height: 40,
  },
  medicineActionsImage: {
    width: 40,
    height: 40,
    marginStart: 8,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5082FE',
  },
  loginImage: {
    marginBottom: 40,
    width: '80%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  senniorLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  basicInput: {
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
  },
  cadastroInput: {
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 20,
    width: 300,
    textAlign: 'center',
  },
  basicButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  homeButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#9C9EA7',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  medicineButton: {
    width: 'auto',
    height: 50,
    backgroundColor: '#9C9EA7',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginStart: 15,
    marginTop: 15,
    padding: 10,
  },
  cadastroButton: {
    height: 50,
    width: 300,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
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
  cadastrarText: {
    color: '#00f',
    fontWeight: 'bold',
    fontSize: 20,
  },
  spacer: {
    height: 20,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    height: '100%',
    alignItems: 'center',
  },
  homeMedicineContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  remediosMedicineContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
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
  homeMedicineText: {
    fontSize: 20,
    color: '#000',
  },
  homeItemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  basicCheckbox: {
    alignSelf: 'center',
    marginRight: 10,
  },
  mensalidadeHome: {
    width: '70%',
    backgroundColor: '#7DDA58',
    paddingVertical: 7,
    alignSelf: 'center',
  },
  basicScroll: {
    width: '100%',
  },
  exportButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: '20%',
    marginBottom: 30, // Aumenta o espaço inferior para evitar que o botão fique colado ao footer
  },

  exportButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default styles;

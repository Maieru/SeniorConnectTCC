import { StyleSheet } from 'react-native';

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
  gridItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    position: 'absolute', // To overlay the text on the image
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for text readability
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  blurredItem: {
    opacity: 0.3, // Reduces opacity to blur the item
    pointerEvents: 'none', // Disables interaction with blurred components
  },

  balloon: {
    position: 'absolute',
    bottom: 110, // Positioning the balloon above the medicine
    left: '50%',
    transform: [{ translateX: -50 }], // Centers the balloon horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the balloon
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },

  dayContainer: {
    width: '45%', // Adjust to fit better, allowing for proper spacing
    marginBottom: 15,
    backgroundColor: '#ccc',
    padding: 15, // Increased padding for better spacing
    borderRadius: 10,
    alignItems: 'center',
    minHeight: 150, // Increased height for better content layout
  },

  dayLabel: {
    fontSize: 18, // Increased font size for better readability
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  medicineSlot: {
    width: '100%',
    backgroundColor: '#eee',
    paddingVertical: 10, // Adds vertical padding for spacing
    paddingHorizontal: 5, // Adds horizontal padding for spacing
    marginBottom: 10, // Adds space between slots
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  medicineInfo: {
    fontSize: 16, // Increased font size for readability
    color: '#000',
    textAlign: 'center',
  },


});

export default styles;

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
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
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
  cadastroInput: {
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 20,
    width: 300,
    textAlign: 'center',
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
  newMedicineButton: {
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
  basicScroll: {
    width: '100%',
  },
  scheduleContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  horarioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horarioText: {
    fontSize: 20,
    color: '#000',
  },
  diasContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diasSemanaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  diaSemana: {
    fontSize: 18,
    color: '#000',
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 10,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;

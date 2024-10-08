import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    scheduleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
      },
      horarioContainer: {
        backgroundColor: '#ddd',
        justifyContent: 'flex-start',
        width: '15%',
      },
      diasContainer:{
        backgroundColor: '#ddd',
        alignSelf: 'flex-start',
        width: '50%',
        marginHorizontal: 2,
      },
      actionsContainer:{
        backgroundColor: '#ddd',
        justifyContent: 'flex-start',
        width: '20%',
        flexDirection: 'row',
      },
      horarioText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
      },
      diasSemanaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
      diaSemana: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        width: 15,
      },
      actionButton: {
        marginLeft: 10,
      },
      actionIcon: {
        width: 25,
        height: 25,
      },
    });

export default styles;

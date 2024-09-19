import { StyleSheet, Dimensions } from 'react-native';


const stylesNewScheduling = StyleSheet.create({
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    timeInput: {
        width: 80,
        height: 60,
        backgroundColor: '#ddd',
        textAlign: 'center',
        fontSize: 40,
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 5,
    },
    timeSeparator: {
        fontSize: 40,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    daysContainer: {
        marginBottom: 20,
    },
    dayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 30,
        height: 30,
        backgroundColor: '#ddd',
        marginRight: 10,
        borderRadius: 5,
    },
    checkboxSelected: {
        backgroundColor: '#000',
    },
    dayLabel: {
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 20,
    },
    saveButton: {
        width: '50%',
        height: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default stylesNewScheduling;

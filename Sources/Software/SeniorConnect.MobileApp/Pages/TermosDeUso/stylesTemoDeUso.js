import { StyleSheet } from 'react-native';

const stylesTermoDeUso = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    topicTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: '#000',
    },
    topicNumber: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'justify',
        color: '#555',
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxLabel: {
        fontSize: 18,
        marginLeft: 8,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default stylesTermoDeUso;
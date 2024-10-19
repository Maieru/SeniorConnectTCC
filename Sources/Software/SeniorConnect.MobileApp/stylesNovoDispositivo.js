import { StyleSheet } from 'react-native';

const stylesDispositivo = StyleSheet.create({
    containerMenu: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 20,
        width: 300,
        textAlign: 'center',
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    loadingText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },
});

export default stylesDispositivo;

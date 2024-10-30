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
    homeTitle: {
        color: '#000',
        fontSize: 40,
    },
    container: {
        flex: 1,
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    basicLabel: {
        color: '#000',
        fontSize: 20,
        alignSelf: 'center',
    },
    basicScroll: {
        width: '100%',
    },
    sectionContainer: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    basicButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    mensalidadeHome: {
        width: '70%',
        backgroundColor: '#7DDA58',
        paddingVertical: 7,
        alignSelf: 'center',
        alignItems: 'center',
    }
});

export default styles;
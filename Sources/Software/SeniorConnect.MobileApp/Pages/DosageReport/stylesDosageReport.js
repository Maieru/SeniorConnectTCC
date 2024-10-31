// stylesDosageReport.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const stylesDosageReport = StyleSheet.create({
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
    scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'center',
    },
    dayBlock: {
        width: width * 0.85,
        height: height * 0.6,
        marginHorizontal: (width - width * 0.85) / 2,
        backgroundColor: '#f0f0f0',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    medicineSlot: {
        width: '100%',
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medicineInfo: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    medicineScroll: {
        flexGrow: 1,
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 10,
    },
});

export default stylesDosageReport;

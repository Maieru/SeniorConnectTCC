// stylesAdherenceReport.js
import { StyleSheet } from 'react-native';

const stylesAdherenceReport = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    reportTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    adherenceStatsContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    adherenceStatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20
    },
    adherencePercentage: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    adherenceDescription: {
        fontSize: 18,
        color: '#555',
        textAlign: 'left',
        flex: 1,
    },
    adherenceSection: {
        width: '85%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        marginHorizontal: '7.5%',
    },
    adherenceSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    adherenceList: {
        width: '100%',
    },
    adherenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    adherenceItemImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    adherenceItemText: {
        fontSize: 18,
        color: '#000',
    },
});

export default stylesAdherenceReport;

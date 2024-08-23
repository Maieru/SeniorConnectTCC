import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5082FE',
    paddingVertical: 25,
  },
  headerItem:{
    alignItems: 'flex-start',
    width: '69%',
    justifyContent: 'flex-end',
  },
  headerImageContainer:{
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerImage:{
    width: 40,
    height: 40,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
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
  footerImage: {
    width: 40,
    height: 40,
  },
});

export default styles;
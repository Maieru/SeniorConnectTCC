import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5082FE',
    paddingVertical: 25,
    width: '100%',
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
    alignItems: 'center',
    backgroundColor: '#fff',
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
  footerImage: {
    width: 40,
    height: 40,
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
  },
  cadastrarText: {
    color: '#00f',
    fontWeight: 'bold',
    fontSize: 20,
  },
  spacer:{
    height: 20,
  },
});

export default styles;
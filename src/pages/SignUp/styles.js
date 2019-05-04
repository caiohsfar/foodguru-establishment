import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  buttonContainer: {
    margin: 50,
    marginTop: 20
  },
  button: {
    backgroundColor: appTheme.COLOR
  },
  errorMessage: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 15,
    color: 'red'
  },
  addressContainer: {
    padding: 15,
    flex: 1
  },
  formikContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 15,
    paddingTop: 0,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  street: {
    flex: 4,
    marginRight: 15
  },
  number: {
    flex: 1
  },
  cep: {
    flex: 2,
    marginRight: 15
  },
  cepHelpContainer: {
    flex: 4,
    alignItems: 'flex-start'
  },
  cepHelp: {
    fontSize: 13
  },
  neighborhood: {
    flex: 2,
    marginRight: 15
  },
  city: {
    flex: 2,
    marginRight: 15
  },
  state: {
    flex: 1
  }
});

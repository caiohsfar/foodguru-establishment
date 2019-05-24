import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLOR,
    padding: 35
  },
  form: {
    marginTop: 20,
    flex: 5,
    justifyContent: 'center'
  },
  logo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    color: appTheme.COLOR
  },
  messageContainer: {
    flex: 1,
    padding: 10
  },
  message: {
    color: '#ddd',
    fontSize: 15
  }
});

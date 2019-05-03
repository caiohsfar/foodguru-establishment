import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginTop: 130
  },
  button: {
    backgroundColor: '#ddd'
  },
  title: {
    color: appTheme.COLOR
  },
  errorMessage: {
    color: "#fff",
    margin: 15,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.COLOR
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  }
});

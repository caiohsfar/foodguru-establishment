import { StyleSheet, PixelRatio } from 'react-native';
import { appTheme } from '../../../constants/styles';

export default StyleSheet.create({
  containerPhoto: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 4
  },
  photo: {
    resizeMode: 'contain',
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 4,
    borderColor: appTheme.COLOR,
    borderWidth: 1 / PixelRatio.get()
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    bottom: 0
  },
  form: { flex: 3 },
  text: {
    color: appTheme.COLOR,
    fontSize: 20,
    fontWeight: 'bold'
  },
  confirm: {
    fontWeight: 'bold',
    color: appTheme.COLOR
  },
  cancel: {
    fontWeight: 'bold'
  }
});

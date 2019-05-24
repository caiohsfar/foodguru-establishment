import { StyleSheet } from 'react-native';
import { appTheme } from '../../../constants/styles';

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20
  },
  title: {
    color: appTheme.COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    marginBottom: 10
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  cancelButton: {
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 10
  },
  confirmButton: {
    fontWeight: 'bold',
    color: appTheme.COLOR,
    marginLeft: 10,
    marginTop: 10
  }
});

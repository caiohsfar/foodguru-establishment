import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 30
  },
  fab: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 15,
    right: 15
  },
  reloadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  errorMessage: {
    marginBottom: 10,
    color: appTheme.COLOR,
    fontWeight: 'bold',
    fontSize: 16
  },
  reloadButtonStyle: {
    width: 200
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

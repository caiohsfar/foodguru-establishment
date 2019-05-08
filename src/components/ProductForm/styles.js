import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerPhoto: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  photo: { marginTop: 10 },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  form: { flex: 3 },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

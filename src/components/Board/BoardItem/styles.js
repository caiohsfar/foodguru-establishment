import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 2,
    padding: 20
  },
  image: {
    height: 70,
    width: 70
  },
  bodyContainer: {
    flex: 4,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

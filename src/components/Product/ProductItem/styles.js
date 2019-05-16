import { StyleSheet } from 'react-native';
import { appTheme } from '../../../constants/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: appTheme.COLOR,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  content: {
    flex: 2
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 19
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 15,
    color: 'grey'
  },
  price: {
    color: appTheme.COLOR,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

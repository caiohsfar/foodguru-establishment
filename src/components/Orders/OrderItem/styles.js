import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairLineWidth,
    borderRadius: 10,
    margin: 20,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
   },
   textContainer: {
     flex: 2
   },
   board: {
     fontWeight: 'bold',
     fontSize: 20
   },
   name: {
      fontSize:18
   },
   type: {
    marginLeft: 6
   },
   buttonContainer: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 10
   },
   button: {
     margin: 10,
     flexDirection: 'row',
     flex: 1,
     alignItems: 'center',
     justifyContent: 'space-between',
     padding: 13
   }
});

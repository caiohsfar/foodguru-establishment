import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  addressContainer: {
    padding: 15,
    flex: 1
  },
  formikContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 15,
    paddingTop: 0,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  street: {
    flex: 4,
    marginRight: 15
  },
  number: {
    flex: 1
  },
  cep: {
    flex: 2,
    marginRight: 15
  },
  cepHelpContainer: {
    flex: 4,
    alignItems: 'flex-start'
  },
  cepHelp: {
    fontSize: 13
  },
  neighborhood: {
    flex: 2,
    marginRight: 15
  },
  city: {
    flex: 2,
    marginRight: 15
  },
  state: {
    flex: 1
  }
});

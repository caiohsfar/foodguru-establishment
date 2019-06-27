import React from 'react';
import { Header } from 'react-native-elements';
import { appTheme } from '../../../constants/styles';

export default () => (
  <Header
    containerStyle={{ height: 65, backgroundColor: appTheme.COLOR }}
    centerComponent={{
      text: 'Pedidos',
      style: {
        color: '#ddd', fontSize: 20, marginBottom: 10, fontWeight: 'bold'
      }
    }}
  />
);

import React from 'react';
import { Header } from 'react-native-elements';
import { appTheme } from '../../../../constants/styles';

const DefaultHeader = props => (
  <Header
    containerStyle={{ height: 65, backgroundColor: appTheme.COLOR }}
    centerComponent={{ text: 'Produtos', style: { color: '#ddd', fontSize: 20, marginBottom:10, fontWeight:'bold' } }}
  />
);

export default DefaultHeader;

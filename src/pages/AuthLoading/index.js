import React, { Component } from 'react';
import {
  View, ActivityIndicator, StatusBar, Text
} from 'react-native';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
*/

export default class AuthLoading extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text> Hello, World! </Text>
      </View>
    );
  }
}

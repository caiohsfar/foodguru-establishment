import React, { Component } from 'react';
import {
  View, ActivityIndicator, StatusBar, Text
} from 'react-native';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/

export default class Splash extends Component {
  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(
      () => { navigation.navigate('App'); },
      2000
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text> Splashhhh! </Text>
      </View>
    );
  }
}

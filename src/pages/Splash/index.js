import React, { Component } from 'react';
import {
  View, ActivityIndicator, StatusBar, Image
} from 'react-native';
import { appTheme } from '../../constants/styles';
import styles from './styles';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/

export default class Splash extends Component {
  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate('App');
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={appTheme.COLOR} barStyle="default" />
        <Image source={require('../../assets/img/react.png')} />
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { appTheme } from '../../constants/styles';
import styles from './styles';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/
import Logo from '../../components/Logo';

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
        <Logo width={100} height={100} resizeMode="contain" />
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import styles from './styles';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/
import Logo from '../../components/Logo';

export default class Splash extends Component {
  isAuth = async () => {
    try {
      return await AsyncStorage.getItem('@FoodGuru:session');
    } catch (e) {
      return null;
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(() => {
      if (this.isAuth() === null) {
        navigation.navigate('App');
      } else {
        navigation.navigate('Auth');
      }
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Logo width={100} height={100} resizeMode="contain" />
      </View>
    );
  }
}

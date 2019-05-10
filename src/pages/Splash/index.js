import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import styles from './styles';
import api from '../../services/api';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/
import Logo from '../../components/Logo';

export default class Splash extends Component {
  isAuth = async () => {
    try {
      const session = JSON.parse(await AsyncStorage.getItem('@FoodGuru:session'));
      api.defaults.headers.common['x-access-token'] = session.token;
      api.defaults.headers.common.hi = session.hi;
      return session;
    } catch (e) {
      return null;
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(() => {
      if (this.isAuth() !== null) {
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

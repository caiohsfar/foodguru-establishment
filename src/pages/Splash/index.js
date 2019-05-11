import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
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
    let session = null;
    try {
      session = JSON.parse(await AsyncStorage.getItem('@FoodGuru:session'));
    } catch (e) {
      reactotron.log(e);
    }
    return session;
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(() => {
      const session = this.isAuth();
      if (!session) {
        api.defaults.headers.common['x-access-token'] = session.token;
        api.defaults.headers.common.hi = session.hi;
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

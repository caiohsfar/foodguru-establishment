import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
import styles from './styles';
import api from '../../services/api';
import { getUserSession } from '../../services/userServices';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/
import Logo from '../../components/Logo';

export default class Splash extends Component {
  isAuth = async () => {
    const session = await getUserSession();
    return session;
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    setTimeout(async () => {
      const session = await getUserSession();
      if (session) {
        api.defaults.headers.common['x-access-token'] = session.token;
        api.defaults.headers.common.hi = session.hi;
        reactotron.log(session);
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

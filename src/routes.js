import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Sections from './pages/Sections';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Tables from './pages/Tables';

import { appTheme } from './constants/styles';

import { transitionConfig, defaultNavigationOptions } from './config/NavigationConfig';

const AppStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="home" />
          </View>
        )
      }
    },
    Sections: {
      screen: Sections,
      navigationOptions: {
        tabBarLabel: 'Sessões',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="list" />
          </View>
        )
      }
    },
    Products: {
      screen: Products,
      navigationOptions: {
        tabBarLabel: 'Produtos',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="restaurant-menu" />
          </View>
        )
      }
    },
    Tables: {
      screen: Tables,
      navigationOptions: {
        tabBarLabel: 'Mesas',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="dashboard" />
          </View>
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Configurações',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="settings" />
          </View>
        )
      }
    }
  },

  {
    shifting: true,
    backBehavior: 'order',
    initialRouteName: 'Home',
    activeColor: '#ddd',
    inactiveColor: '#800000',
    barStyle: { backgroundColor: appTheme.COLOR }
  }
);
const AuthStack = createStackNavigator(
  { SignIn, SignUp },
  { initialRouteName: 'SignIn', defaultNavigationOptions, transitionConfig }
);
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Splash,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'App'
    }
  )
);

export default Routes;

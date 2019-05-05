import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../pages/Home';
import Sections from '../pages/Sections';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import Tables from '../pages/Tables';

import { appTheme } from '../constants/styles';

export default createMaterialBottomTabNavigator(
  // Route configs
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
  // Navigation Options
  {
    shifting: true,
    backBehavior: 'order',
    initialRouteName: 'Home',
    activeColor: '#ddd',
    inactiveColor: '#800000',
    barStyle: { backgroundColor: appTheme.COLOR }
  }
);

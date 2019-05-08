import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import More from '../pages/More';
import Tables from '../pages/Tables';

import { appTheme } from '../constants/styles';

export default createMaterialBottomTabNavigator(
  // Route configs
  {
    Orders: {
      screen: Orders,
      navigationOptions: {
        tabBarLabel: 'Pedidos',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="new-releases" />
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
    More: {
      screen: More,
      navigationOptions: {
        tabBarLabel: 'Mais',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="menu" />
          </View>
        )
      }
    }
  },
  // Navigation Options
  {
    shifting: true,
    backBehavior: 'order',
    initialRouteName: 'Products',
    activeColor: '#ddd',
    inactiveColor: '#800000',
    barStyle: { backgroundColor: appTheme.COLOR }
  }
);

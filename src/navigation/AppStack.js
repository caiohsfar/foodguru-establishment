import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import More from '../pages/More';
import Boards from '../pages/Boards';
import Categories from '../pages/More/Categories';

import { appTheme } from '../constants/styles';

const categoryOptions = {
  headerTintColor: '#ddd',
  title: 'Categorias',
  headerStyle: {
    backgroundColor: '#800000',
    borderBottomWidth: 5,
    borderBottomColor: '#ddd'
  }
};

const MoreStack = createStackNavigator({
  More,
  Categories: {
    screen: Categories,
    navigationOptions: categoryOptions
  }
});

const ProductStack = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: {
      header: null
    }
  },
  Categories: {
    screen: Categories,
    navigationOptions: categoryOptions
  }
});

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
      screen: ProductStack,
      navigationOptions: {
        tabBarLabel: 'Produtos',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="restaurant-menu" />
          </View>
        )
      }
    },
    Boards: {
      screen: Boards,
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
      screen: MoreStack,
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

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
// Vai ter 3 tabs
export default class Orders extends Component {
  state = {
    data: null
  };

  logOut = async () => {
    try {
      await AsyncStorage.removeItem('@FoodGuru:session');
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = async () => {
    try {
      const session = await AsyncStorage.getItem('@FoodGuru:session');
      this.setState({ data: session });
      console.log(session);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PEDIDOS FEITOS, PEDIDOS PRONTOS, PEDIDOS EM ANDAMENTO</Text>
        <Text>{this.state.data}</Text>
        <Button onPress={this.logOut} title="Deslogar" />
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  state = {
    data: null
  };

  static navigationOptions = {
    headerTitle: 'Home'
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
        <Text>{this.state.data}</Text>
        <Button onPress={this.logOut} title="Deslogar" />
      </View>
    );
  }
}

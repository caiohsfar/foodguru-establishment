import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class More extends Component {
  render() {
    return (
      <View>
        <Button title="Categorias" onPress={() => this.props.navigation.navigate('Categories')} />
      </View>
    );
  }
}

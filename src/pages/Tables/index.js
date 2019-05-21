import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import reactotron from 'reactotron-react-native';


export default class Tables extends Component {
  componentDidMount() {
    const address = {
      street: "Rua Espardate",
      state:"Pernambuco",
      neighborhood:"Brasília Teimosa",
      city:"Recife",
      number:"512"
    }
    
    Geocoder.init('AIzaSyB3lOE1h65_wey3CQBjfMh3mo67-_UNPG0');
    Geocoder.from(Object.values(address).join())
      .then((response) => {
        const { location } = response.results[0].geometry;
        reactotron.log(location);
      })
      .catch(error => console.warn(error));
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

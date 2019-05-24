import React from 'react';
import { Image } from 'react-native';

const logo = require('../../assets/img/logo.png');

export default props => (
  <Image
    source={logo}
    style={{ width: props.width, height: props.height, resizeMode: props.resizeMode }}
  />
);

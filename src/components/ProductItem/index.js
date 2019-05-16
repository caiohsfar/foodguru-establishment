import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default props => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: props.image }} />
    </View>
    <View style={styles.content}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.price}>{props.price}</Text>
    </View>
  </View>
);

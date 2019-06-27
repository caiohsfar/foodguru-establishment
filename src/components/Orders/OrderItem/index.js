import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import orders from '../../../constants/orders';

export default ({
  id, name, quantity, handlePress, type
}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.board}>Mesa 1</Text>
      <Text style={styles.name}>{`${quantity}x ${name}`}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: type === orders.MADE ? 'yellow' : 'green' }]}
        onPress={() => handlePress({ id, name, quantity }, type)}
      >
        <Icon color={type === orders.MADE ? 'black' : '#fff'} name={type === orders.MADE ? 'access-time' : 'check-circle'} />
        <Text style={styles.type}>{type === orders.MADE ? 'Preparar' : 'Finalizar'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

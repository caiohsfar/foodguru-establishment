import React from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Picker
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from './styles.js';
import Logo from '../Logo';

export default props => (
  <View style={{ flex: 1 }}>
    <View style={styles.containerPhoto}>
      <Text style={styles.text}>Cadastre um produto</Text>
      <TouchableOpacity style={styles.photo}>
        <Logo height={60} width={60} resizeMode="contain" />
      </TouchableOpacity>
    </View>
    <View style={styles.form}>
      <TextField 
        label='Nome'
         />
      <TextField 
        label='Preço'/>
      <TextField
        label='Descricão' />
      <Picker />
    </View>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={() => props.toggleModal(false)}>
        <Text>CANCELAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.toggleModal(false)}>
        <Text>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  </View>
);

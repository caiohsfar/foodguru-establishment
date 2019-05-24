import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Counter from '../../Counter';
import styles from './styles';

export default class BoardModal extends Component {
  // state = {
  //   counter: 0
  // };

  _onSubmit = () => {
    this.props.onSubmit();
  };

  render() {
    const { isVisible, setModalVisible } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Você deseja cadastrar uma mesa?</Text>
          <Text style={styles.description}>
            O código e número da mesa será gerado automáticamente.
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onSubmit}>
              <Text style={styles.confirmButton}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

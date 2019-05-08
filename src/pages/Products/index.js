import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ProductForm from '../../components/ProductForm';
import styles from './styles';
import {appTheme} from '../../constants/styles';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Modal style={styles.modal} isVisible={this.state.modalVisible} useNativeDriver>
              <ProductForm 
                toggleModal={this.setModalVisible} 
                onSubmit={this.props.onSubmit} 
              />
          </Modal>
        </KeyboardAvoidingView>
        <Icon
          containerStyle={styles.fab}
          name="add"
          raised
          reverse
          color={appTheme.COLOR}
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
      </View>
    );
  }
}

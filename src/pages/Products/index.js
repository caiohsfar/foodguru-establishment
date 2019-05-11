import React, { Component } from 'react';
import {
  View, FlatList, Text, ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import ProductForm from '../../components/ProductForm';
import styles from './styles';
import { appTheme } from '../../constants/styles';
import ProductItem from '../../components/ProductItem';

import { create, fetch } from '../../store/actions/ProductActions';

class Products extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  _renderItem = ({ item }) => (
    <ProductItem
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}

    />
  );

  _keyExtractor = (item, index) => item.id;

  componentDidMount = () => {
    this.props.fetch();
  }

  renderList = () => {
    if (this.props.fetchLoadState) {
      return (
        <ActivityIndicator color={appTheme.COLOR} size="large" />
      );
    }
    if (this.props.fetchError) {
      return (
        <View style={styles.reloadContainer}>
          <Text style={styles.errorMessage}> Ops! Sem conexão. </Text>
          <Button
            onPress={() => this.props.fetch()}
            title="Regarregar"
            type="solid"
            containerStyle={styles.reloadButtonStyle}
            buttonStyle={{ backgroundColor: appTheme.COLOR }}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.productList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal style={styles.modal} isVisible={this.state.modalVisible}>
          <ProductForm toggleModal={this.setModalVisible} onSubmit={this.props.create} />
        </Modal>
        {this.renderList()}
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
const mapStateToProps = (state) => {
  reactotron.log(state);
  return {
    fetchError: state.ProductsReducer.fetchError,
    fetchLoadState: state.ProductsReducer.fetchLoadState,
    productList: state.ProductsReducer.productList,
  };
};

export default connect(
  mapStateToProps,
  { create, fetch }
)(Products);

import React, { Component } from 'react';
import {
  View, FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
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

  render() {
    return (
      <View style={styles.container}>
        <Modal style={styles.modal} isVisible={this.state.modalVisible}>
          <ProductForm toggleModal={this.setModalVisible} onSubmit={this.props.create} />
        </Modal>
        <FlatList
          data={this.props.productList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
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
const mapStateToProps = state => ({
  loadState: state.ProductsReducer.loadState,
  productList: state.ProductsReducer.productList,
  createError: state.ProductsReducer.createError
});

export default connect(
  mapStateToProps,
  { create, fetch }
)(Products);

import React from 'react';
import { FlatList } from 'react-native';
import reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import ProductItem from '../ProductItem';

class ProductList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ProductItem
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.selecteds}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
const mapStateToProps = state => ({
  selecteds: state.ProductsReducer.selecteds
});

export default connect(
  mapStateToProps,
  null
)(ProductList);

import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { toggle } from '../../../store/actions/ProductActions';

class ProductItem extends React.PureComponent {
  _onPress = () => {
    const { id, selecteds } = this.props;
    this.props.toggle(id, !selecteds.get(id));
  };

  isSelected = () => this.props.selecteds.get(this.props.id);

  render() {
    const backgroundColor = this.isSelected() ? '#ffb3b3' : null;
    return (
      <TouchableOpacity style={{ ...styles.container, backgroundColor }} onPress={this._onPress}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: this.props.image }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          <Text style={styles.price}>{this.props.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  selecteds: state.ProductsReducer.selecteds,
  selectedCount: state.ProductsReducer.selectedCount
});

export default connect(
  mapStateToProps,
  { toggle }
)(ProductItem);

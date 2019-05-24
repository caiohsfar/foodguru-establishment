import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { appTheme } from '../../../constants/styles';
// gerar qrcode na imagem da mesa
import { toggle } from '../../../store/actions/BoardActions';

class BoardItem extends React.PureComponent {
  _onPress = () => {
    const { id, selecteds } = this.props;
    this.props.toggle(id, !selecteds.get(id));
  };

  isSelected = () => this.props.selecteds.get(this.props.id);

  render() {
    const { number, qrCode } = this.props;
    const backgroundColor = this.isSelected() ? '#ffb3b3' : null;
    // const qrCode = require('../../../assets/img/qr-code.png');
    return (
      <TouchableOpacity style={{ ...styles.container, backgroundColor }} onPress={this._onPress}>
        <View style={styles.imageContainer}>
          <Image source={qrCode} style={styles.image} />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{`Mesa ${number}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ BoardReducer }) => ({
  selecteds: BoardReducer.selecteds,
  selectedCount: BoardReducer.selectedCount
});

export default connect(
  mapStateToProps,
  { toggle }
)(BoardItem);

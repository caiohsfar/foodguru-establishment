import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import { appTheme } from '../../../constants/styles';
import {Button} from 'react-native-elements';
// import { Container } from './styles';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20
  },
  button: {
    color: appTheme.COLOR,
    fontWeight: 'bold',
    fontSize: 20
  },
  qrcode: {
    height: 100,
    width: 100
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleContainer: {
    margin: 20
  }
});

class BoardDetailModal extends React.Component {
  getSelectedBoard = () => {
    const { selecteds, boardList } = this.props;
    for (const [id, selected] of selecteds.entries()) {
      if (selected) {
        return boardList.filter(board => board.id === id)[0];
      }
    }
  };

  render() {
    const selectedBoard = this.props.isVisible ? this.getSelectedBoard() : null;
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.container}>
          <QRCode
            value={selectedBoard ? selectedBoard.number : ''}
            size={100}
            bgColor={appTheme.COLOR}
            fgColor="#fff"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{`Mesa ${selectedBoard ? selectedBoard.number : ''}`}</Text>
          </View>
          <Button title="OK" buttonStyle={{ backgroundColor: appTheme.COLOR, width: 100 }} onPress={() => this.props.setModalVisible(false)} />
    
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  boardList: state.BoardReducer.boardList,
  selecteds: state.BoardReducer.selecteds
});

export default connect(
  mapStateToProps,
  null
)(BoardDetailModal);

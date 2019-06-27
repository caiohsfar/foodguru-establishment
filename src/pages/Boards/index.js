import React, { Component } from 'react';
import {
  View, FlatList, Text, ActivityIndicator, Animated, Dimensions, Easing, Alert
} from 'react-native';
import reactotron from 'reactotron-react-native';
import ActionButton from 'react-native-action-button';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import BoardItem from '../../components/Board/BoardItem';
import styles from './styles';
import DefaultHeader from '../../components/Board/BoardHeaders/DefaultHeader';
import ActionHeader from '../../components/Board/BoardHeaders/ActionHeader';
import BoardModal from '../../components/Board/BoardModal';
import BoardDetailModal from '../../components/Board/BoardDetailModal';
import { appTheme } from '../../constants/styles';
import {
  fetch, create, remove, toggle
} from '../../store/actions/BoardActions';
import { generateCode } from '../../services/boardServices';

class Boards extends Component {
  state = {
    modalAddVisible: false,
    detailModalVisible: false,
    defaultSpring: new Animated.Value(1),
    // BUG DO REAT NATIVE 0.01
    actionSpring: new Animated.Value(0.01),
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCount !== this.props.selectedCount) {
      if (nextProps.selectedCount === 0) {
        this.showActionMode(false);
      } else if (nextProps.selectedCount === 1) {
        this.showActionMode(true);
      }
    }
  }

  componentDidMount = () => {
    this.props.fetch();
  }

  handleAddBoard = () => {
    const { boardList } = this.props;
    let number;
    if (boardList.length > 0) {
      number = parseInt(boardList[boardList.length - 1].number) + 1;
    } else {
      number = 1;
    }
    const code = generateCode();
    this.props.create({ number, code });
    this.setModalAddVisible(false);
  }

  onPressDetail = () => {
    this.setDetailModalVisible(true);
  };

  setModalAddVisible = (status) => {
    this.setState({ modalAddVisible: status });
  };

  onPressSelectAll = () => {
    this.toggleAll(true);
  }

  onPressRemove = () => {
    const { selecteds } = this.props;
    for (const [id, selected] of selecteds.entries()) {
      if (selected) {
        this.props.remove(id);
      }
    }
  }

  onPressExit = () => {
    this.toggleAll(false);
    this.showActionMode(false);
  }

  toggleAll = (status) => {
    const { boardList, selecteds } = this.props;
    boardList.forEach((product) => {
      if (status && !selecteds.get(product.id)) {
        this.props.toggle(product.id, status);
      } else if (!status && selecteds.get(product.id)) {
        this.props.toggle(product.id, status);
      }
    });
  }


  showActionMode = (show) => {
    const toValueDefault = show ? 0 : 1;
    const toValueAction = show ? 1 : 0;
    Animated.sequence([
      Animated.timing( // Animate over time
        this.state.defaultSpring, // The animated value to drive
        {
          toValue: toValueDefault, // Animate to opacity: 1 (opaque)
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true // Make it take a while
        }
      ),
      Animated.timing( // Animate over time
        this.state.actionSpring, // The animated value to drive
        {
          toValue: toValueAction, // Animate to opacity: 1 (opaque)
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true // Make it take a while
        }
      )
    ]).start();
  }

  renderHeader = () => {
    const { defaultSpring, actionSpring } = this.state;
    return (
      <View style={{ top: 0, right: 0 }}>
        <Animated.View
          style={{ opacity: defaultSpring, transform: [{ scale: defaultSpring }] }}
        >
          <DefaultHeader />
        </Animated.View>
        <Animated.View
          style={{
            opacity: actionSpring,
            position: 'absolute',
            width: Dimensions.get('window').width,
            transform: [{ scale: actionSpring }]
          }}
        >
          <ActionHeader
            count={this.props.selectedCount}
            onPressExit={this.onPressExit}
            onPressRemove={this.onPressRemove}
            onPressDetail={this.onPressDetail}
            onPressSelectAll={this.onPressSelectAll}
          />
        </Animated.View>
      </View>
    );
  }

  renderList = () => {
    const {
      fetchLoadState, fetchError, boardList
    } = this.props;
    if (fetchLoadState) {
      return (
        <ActivityIndicator color={appTheme.COLOR} size="large" />
      );
    }
    if (fetchError) {
      return (
        <View style={styles.reloadContainer}>
          <Text style={styles.errorMessage}> Ops! Sem conexão. </Text>
          <Button
            onPress={() => this.props.fetch()}
            title="Recarregar"
            type="solid"
            containerStyle={styles.reloadButtonStyle}
            buttonStyle={{ backgroundColor: appTheme.COLOR }}
          />
        </View>
      );
    }
    if (boardList.length === 0) {
      return (
        <Text style={{
          marginTop: 100, fontSize: 17, alignSelf: 'center', color: appTheme.COLOR, fontWeight: 'bold'
        }}
        >
          Parece que você ainda não tem mesas.
        </Text>
      );
    }
    const qrCode = require('../../assets/img/qr-code.png');
    return (
      <FlatList
        data={this.props.boardList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <BoardItem id={item.id} number={item.number} code={item.code} qrCode={qrCode} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        extraData={this.props.selecteds}
      />
    );
  }

  setDetailModalVisible = (status) => {
    this.setState({ detailModalVisible: status });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <BoardDetailModal isVisible={this.state.detailModalVisible} setModalVisible={this.setDetailModalVisible} />
        <BoardModal isVisible={this.state.modalAddVisible} setModalVisible={this.setModalAddVisible} onSubmit={this.handleAddBoard}/>
        {this.renderList()}
        <ActionButton buttonColor={appTheme.COLOR}>
          <ActionButton.Item buttonColor="#9b59b6" title="Adicionar mesas" onPress={() => this.setModalAddVisible(true)}>
            <Icon type="material" name="list" color="#ddd" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = ({ BoardReducer }) => ({
  boardList: BoardReducer.boardList,
  fetchError: BoardReducer.fetchError,
  fetchLoadState: BoardReducer.fetchLoadState,
  selecteds: BoardReducer.selecteds,
  selectedCount: BoardReducer.selectedCount
});

export default connect(mapStateToProps, {
  fetch, create, remove, toggle
})(Boards);

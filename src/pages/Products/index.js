import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Animated, Dimensions, Easing
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import ProductForm from '../../components/Product/ProductForm';
import styles from './styles';
import { appTheme } from '../../constants/styles';
import ActionHeader from '../../components/Product/ProductsHeaders/ActionHeader';
import DefaultHeader from '../../components/Product/ProductsHeaders/DefaultHeader';
import {
 create, fetch, toggle, remove, select, unselect 
} from '../../store/actions/ProductActions';
import ProductList from '../../components/Product/ProductList';

class Products extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      modalVisible: false,
      defaultSpring: new Animated.Value(1),
      // BUG DO REAT NATIVE
      actionSpring: new Animated.Value(0.01),
    };
  }

  onPressSelectAll = () => {
    this.toggleAll(true);
  }

  toggleAll = (status) => {
    const { productList } = this.props;
    productList.forEach((product) => {
      if (status && !this.props.selecteds.get(product.id)) {
        this.props.toggle(product.id, status);
      } else if (!status && this.props.selecteds.get(product.id)) {
        this.props.toggle(product.id, status);
      }
    });
  }

  onPressRemove = () => {
    const { selecteds } = this.props;
    for (const [id, selected] of selecteds.entries()) {
      if (selected) {
        this.props.remove(id);
      }
    }
  }

  onPressEdit = () => {

  }

  getSelectedCount = () => {
    const { selecteds } = this.props;
    let length = 0;
    const items = [...selecteds.values()];
    items.forEach((selected) => {
      if (selected) {
        length += 1;
      }
    });
    return length;
  }

  onPressExit = () => {
    this.toggleAll(false);
    this.showActionMode(false);
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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

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
      <ProductList
        data={this.props.productList}
        showActionMode={this.showActionMode}
      />
    );
  }

  renderHeader = () => {
    const { defaultSpring, actionSpring } = this.state;
    return (
      <View style={{ top: 0 }}>
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
          <ActionHeader count={this.props.selectedCount} onPressExit={this.onPressExit} onPressRemove={this.onPressRemove} onPressEdit={this.onPressEdit} onPressSelectAll={this.onPressSelectAll} />
        </Animated.View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Modal style={styles.modal} isVisible={this.state.modalVisible} useNativeDriver>
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

const mapStateToProps = (state) => ({
    fetchError: state.ProductsReducer.fetchError,
    fetchLoadState: state.ProductsReducer.fetchLoadState,
    productList: state.ProductsReducer.productList,
    selecteds: state.ProductsReducer.selecteds,
    selectedCount: state.ProductsReducer.selectedCount,
  });

export default connect(
  mapStateToProps,
  {
 create, fetch, toggle, remove, select 
}
)(Products);

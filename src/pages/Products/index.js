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
  create, fetch, toggle, remove, edit
} from '../../store/actions/ProductActions';
import ProductList from '../../components/Product/ProductList';
import { getUserId } from '../../services/userServices';
import api from '../../services/api';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreateVisible: false,
      modalEditVisible: false,
      defaultSpring: new Animated.Value(1),
      // BUG DO REAT NATIVE
      actionSpring: new Animated.Value(0.01),
      selectedProductData: null,
      categories: []
    };
  }

  onPressSelectAll = () => {
    this.toggleAll(true);
  }

  toggleAll = (status) => {
    const { productList, selecteds } = this.props;
    productList.forEach((product) => {
      if (status && !selecteds.get(product.id)) {
        this.props.toggle(product.id, status);
      } else if (!status && selecteds.get(product.id)) {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCount !== this.props.selectedCount) {
        if (nextProps.selectedCount === 0) {
          this.showActionMode(false);
        } else if (nextProps.selectedCount === 1) {
          this.showActionMode(true);
        }
    }
  }

  onPressEdit = () => {
    this.setModalEditVisible(true);
    this.toggleAll(false);
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

  setModalCreateVisible = (visible) => {
    this.setState({ modalCreateVisible: visible });
  };

  setModalEditVisible = (visible) => {
    const selectedProductData = this.getSelectedProductData();
    // reactotron.log(selectedProductData);
    this.setState({ selectedProductData });
    this.setState({ modalEditVisible: visible });
  };

  componentDidMount = async () => {
    await this.getSections();
    this.state.categories.forEach(category => {
      this.props.fetch(category.id);
    });
  }
  getSections = async () => {
    const idUser = await getUserId();
    try {
      const response = await api.get(`/sections/${idUser}`);
      this.setState({ categories: response.data });
    } catch (e) {
      alert(e);
    }
  };

  renderList = () => {
    const { fetchLoadState, fetchError, productList } = this.props;
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
    if (productList.length === 0) {
      return (
        <Text style={{ marginTop: 100, fontSize: 17, alignSelf: 'center', color: appTheme.COLOR, fontWeight:'bold' }}>
          Parece que você ainda não tem produtos.
        </Text>
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
            onPressEdit={this.onPressEdit}
            onPressSelectAll={this.onPressSelectAll}
          />
        </Animated.View>
      </View>
    );
  }

  getSelectedProductData = () => {
    const { selecteds, productList } = this.props;
    for (const [id, selected] of selecteds.entries()) {
      if (selected) {
        reactotron.log(id);
        return productList.filter(product => product.id === id)[0];
      }
    }
  }


  render() {
    const { modalCreateVisible, modalEditVisible } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Modal style={styles.modal} isVisible={modalCreateVisible} useNativeDriver>
          <ProductForm toggleModal={this.setModalCreateVisible} onSubmit={this.props.create} />
        </Modal>
        <Modal style={styles.modal} isVisible={modalEditVisible} useNativeDriver>
          <ProductForm data={this.state.selectedProductData} toggleModal={this.setModalEditVisible} onSubmit={this.props.edit} />
        </Modal>
        {this.renderList()}
        <Icon
          containerStyle={styles.fab}
          name="add"
          raised
          reverse
          color={appTheme.COLOR}
          onPress={() => {
            this.setModalCreateVisible(true);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetchError: state.ProductsReducer.fetchError,
  fetchLoadState: state.ProductsReducer.fetchLoadState,
  productList: state.ProductsReducer.productList,
  selecteds: state.ProductsReducer.selecteds,
  selectedCount: state.ProductsReducer.selectedCount,
});

export default connect(
  mapStateToProps,
  {
    create, fetch, toggle, remove, edit
  }
)(Products);

import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Animated, Dimensions, Easing, Alert
} from 'react-native';
import Modal from 'react-native-modal';
import ModalSelector from 'react-native-modal-selector';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import ActionButton from 'react-native-action-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductForm from '../../components/Product/ProductForm';
import styles from './styles';
import { appTheme } from '../../constants/styles';
import ActionHeader from '../../components/Product/ProductsHeaders/ActionHeader';
import DefaultHeader from '../../components/Product/ProductsHeaders/DefaultHeader';
import {
  create, fetch as fetchProducts, toggle, remove, edit
} from '../../store/actions/ProductActions';
import { fetch as fetchCategories } from '../../store/actions/CategoryActions';
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
      selectedCategory: {},
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
    // if (nextProps.productList !== this.props.productList) {
    //   this.props.fetchProducts(this.state.selectedCategory.id)
    // }
    // if (nextProps.categoryList !== this.props.categoryList) {
    //   reactotron.log("@products receive proops mudou category", nextProps)
    //   nextProps.categoryList.forEach(category => {
    //     nextProps.fetchProducts(category.id);
    //   });
    // }
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

  handleAddProduct = () => {
    if (this.props.categoryList.length === 0) {
      Alert.alert('Erro.', 'Você precisa ter pelo menos uma categoria, para poder adicionar um produto.');
    } else {
      this.setModalCreateVisible(true);
    }
  }

  setModalEditVisible = (visible) => {
    const selectedProductData = this.getSelectedProductData();
    // reactotron.log(selectedProductData);
    this.setState({ selectedProductData });
    this.setState({ modalEditVisible: visible });
  };

  componentDidMount = async () => {
    this.props.fetchCategories();
  }

  renderList = () => {
    const {
      fetchLoadState, fetchError, productList, categoryList
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
            onPress={() => this.props.fetchProducts()}
            title="Recarregar"
            type="solid"
            containerStyle={styles.reloadButtonStyle}
            buttonStyle={{ backgroundColor: appTheme.COLOR }}
          />
        </View>
      );
    }
    if (productList.length === 0 && this.state.selectedCategory.name) {
      return (
        <Text style={{
          marginTop: 100, fontSize: 17, alignSelf: 'center', color: appTheme.COLOR, fontWeight: 'bold'
        }}
        >
          Parece que você ainda não tem produtos para esta categoria.
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

  onValuePickerChange = (selectedCategory) => {
    this.setState({ selectedCategory });
    this.props.fetchProducts(selectedCategory.id);
  }

  render() {
    const { modalCreateVisible, modalEditVisible } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Modal style={styles.modal} isVisible={modalCreateVisible} useNativeDriver>
          <ProductForm
            categories={this.props.categoryList}
            toggleModal={this.setModalCreateVisible}
            onSubmit={this.props.create}
          />
        </Modal>
        <Modal style={styles.modal} isVisible={modalEditVisible} useNativeDriver>
          <ProductForm
            data={this.state.selectedProductData}
            categories={this.props.categoryList}
            toggleModal={this.setModalEditVisible}
            onSubmit={this.props.edit}
          />
        </Modal>
        {this.props.categoryList.length > 0 ? (
          <ModalSelector
            data={this.props.categoryList}
            cancelText="Cancelar"
            optionTextStyle={{ color: appTheme.COLOR, fontWeight: 'bold', fontSize: 17 }}
            supportedOrientations={['landscape']}
            accessible
            scrollViewAccessibilityLabel="Scrollable options"
            cancelButtonAccessibilityLabel="Cancel Button"
            onChange={option => this.onValuePickerChange(option)}
            keyExtractor={item => item.id}
            labelExtractor={item => item.name}
          >
            <View
              style={{
                borderWidth: 1, borderColor: '#ccc', alignItems: 'center', elevation: 1, height: 50, margin: 10, justifyContent: 'center', borderRadius: 4
              }}
              placeholder="Selecione uma categoria"
              placeholderTextColor={appTheme.COLOR}
            >
              <Text style={{ fontWeight: 'bold', color: appTheme.COLOR, fontSize: 18 }}>
                {this.state.selectedCategory.name ? this.state.selectedCategory.name : 'Selecione uma categoria'}
              </Text>
            </View>

          </ModalSelector>
        )
          : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Categories')}
              style={{
                borderWidth: 1, borderColor: '#ccc', alignItems: 'center', elevation: 1, height: 50, margin: 10, justifyContent: 'center', borderRadius: 4
              }}
            >
              <Text style={{ fontWeight: 'bold', color: appTheme.COLOR, fontSize: 18 }}>
                Adicione uma categoria para começar!
              </Text>
            </TouchableOpacity>
          )
      }
        {this.renderList()}
        <ActionButton buttonColor={appTheme.COLOR}>
          <ActionButton.Item buttonColor="#9b59b6" title="Nova categoria" onPress={() => this.props.navigation.navigate('Categories')}>
            <Icon type="material" name="list" color="#ddd" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Novo produto" onPress={() => this.handleAddProduct()}>
            <Icon type="material" name="restaurant-menu" color="#ddd" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = ({ ProductsReducer, CategoryReducer }) => ({
  fetchError: ProductsReducer.fetchError,
  fetchLoadState: ProductsReducer.fetchLoadState,
  productList: ProductsReducer.productList,
  selecteds: ProductsReducer.selecteds,
  selectedCount: ProductsReducer.selectedCount,
  categoryList: CategoryReducer.categoryList
});

export default connect(
  mapStateToProps,
  {
    create, fetchProducts, toggle, remove, edit, fetchCategories
  }
)(Products);

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, Alert, Picker
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import reactotron from 'reactotron-react-native';
import styles from './styles';
import { getUserId } from '../../../services/userServices';
import api from '../../../services/api';

const placeholder = require('../../../assets/img/image-placeholder.png');

export default class ProductForm extends Component {
  state = {
    id: null,
    name: '',
    price: '',
    image: null,
    description: '',
    errorName: '',
    errorPrice: '',
    errorDescription: '',
    selectedCategory: {},
    sectionId: null,
    categories: []
  };

  async componentDidMount() {
    const { data } = this.props;
    reactotron.log(data);
    if (data) {
      this.setState({ ...data, price: data.price.toString(), });
    }
    this.setState({ selectedCategory: { id: 'default' } });
  }

  pickImage = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      title: 'Selecione uma imagem',
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Galeria',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          image: response.uri,
        });
      }
    });
  }

  getSelectedProductCategory = (categories, product) => categories.filter(category => (category.id === product.sectionId))

  // getProductSection = async (sectionId) => {
  //   try {
  //     const response = await api.get(`/sections/section/${sectionId}`);
  //     reactotron.log("SECTION SELECED")
  //     this.setState({ selectedCategory: response.data });
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  validate = ({
    name, price, image, description, selectedCategory
  }) => {
    let validation = true;
    if (!name) {
      this.setState({ errorName: 'Insira uma nome para o produto' });
      validation = false;
    } else {
      this.setState({ errorName: '' });
    }
    if (!price) {
      this.setState({ errorPrice: 'Insira um preço para o produto' });
      validation = false;
    } else {
      this.setState({ errorPrice: '' });
    }
    if (!image) {
      Alert.alert('Erro!', 'Insira uma imagem para o produto.');
      validation = false;
    }
    if (!description) {
      this.setState({ errorDescription: 'Insira uma descrição para o produto' });
      validation = false;
    } else {
      this.setState({ errorDescription: '' });
    }
    // TODO: SELECT
    if (selectedCategory.id === 'default') {
      validation = false;
      Alert.alert('', 'Por favor, selecione uma categoria para o produto.');
    }
    reactotron.log(selectedCategory);

    return validation;
  }

  _onSubmit = () => {
    if (this.validate(this.state)) {
      const {
        id, name, price, image, description, selectedCategory
      } = this.state;
      this.props.toggleModal(false);
      let formData;

      if (this.props.data) {
        formData = {
          id, name, price, description, image, sectionId: selectedCategory.id
        };
      } else {
        formData = {
          product: {
            id, name, price, description, image
          },
          sectionId: selectedCategory.id
        };
      }

      this.props.onSubmit(formData);
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <View style={styles.containerPhoto}>
            <Text style={styles.text}>
              {this.props.data ? 'Edite' : 'Cadastre'}
              {' '}
um produto
            </Text>
            <TouchableOpacity onPress={this.pickImage}>
              <Image
                style={styles.photo}
                source={this.state.image ? { uri: this.state.image }
                  : placeholder}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextField
              tintColor="grey"
              errorColor="red"
              label="Nome"
              onChangeText={(name) => {
                this.setState({ name });
              }}
              value={this.state.name}
              error={this.state.errorName ? this.state.errorName : ''}
            />
            <TextField
              tintColor="grey"
              errorColor="red"
              label="Preço"
              keyboardType="decimal-pad"
              onChangeText={(price) => {
                this.setState({ price });
              }}
              value={this.state.price}
              error={this.state.errorPrice ? this.state.errorPrice : ''}
            />
            <TextField
              tintColor="grey"
              errorColor="red"
              label="Descrição"
              onChangeText={(description) => {
                this.setState({ description });
              }}
              value={this.state.description}
              error={this.state.errorDescription ? this.state.errorDescription : ''}
            />
            <Picker
              ref={ref => this.picker = ref}
              selectedValue={this.state.selectedCategory}
              style={{ height: 50 }}
              onValueChange={category => this.setState({ selectedCategory: category })
              }

            >
              <Picker.Item label="Please select an option..." value={{ id: 'default' }} />
              {this.props.categories.map(category => (
                <Picker.Item label={category.name} value={category} />
              ))
              }

            </Picker>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAwareScrollView>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.props.toggleModal(false)}>
              <Text style={styles.cancel}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onSubmit}>
              <Text style={styles.confirm}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

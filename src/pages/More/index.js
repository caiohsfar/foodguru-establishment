import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert as AlertIOS
} from 'react-native';
import Category from './addNomesCategoria';
import api from '../../services/api';
import { getUserId } from '../../services/userServices';
import reactotron from 'reactotron-react-native';

export default class AdicionarCategoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryArray: [],
      categoryName: '',
      error: false,
      addLoading: false,
      userId: null,
      fetchLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ fetchLoading: true });
    try {
      const userId = await getUserId();
      this.setState({ userId });
      const response = await this.fetchCategories(userId);
      reactotron.log("@fetch_category_suceed", response);
      this.setState({ categoryArray: response.data });
      this.setState({ fetchLoading: false });

    } catch(e) {
      alert(e || e.response.data);
      this.setState({ fetchLoading: false });
    }
  }

  fetchCategories(idEstab) {
    return api.get(`/sections/${idEstab}`)
  }
  
  render() {
    const category = this.state.categoryArray.map(({ id, name }) => (
      <Category
        key={id}
        keyValue={id}
        value={name}
        deleteMethod={() => this.shouldDeleteCategory(id)}
      />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Adicionar Categoria</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {this.state.fetchLoading ? 
          <ActivityIndicator color="red" size="large" />:
          category}
        </ScrollView>
        <TouchableOpacity onPress={this.addCategory.bind(this)} style={styles.addButton}>
         {this.state.addLoading ? <ActivityIndicator color="white" /> :
          <Text style={styles.addButtonText}>+</Text>
         }
        </TouchableOpacity>
        <View styles={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={categoryName => this.setState({ categoryName })}
            value={this.state.categoryName}
            placeholder="Adicione uma categoria..."
            placeholderTextColor="white"
          />
        </View>
      </View>
    );
  }

  // TODO: MUDAR DEPOIS PARA O REDUX
  async addCategory() {
    const { categoryName, categoryArray, userId } = this.state;
    if (categoryName) {
      // TODO: CRIAR UM ARQUIVO COM TODOS OS ENDPOINTS
      this.setState({ loading: true });
      const body = { id: userId, section: { name: categoryName } };
      try {
        const response = await api.post('/sections', body);
        reactotron.log("@add_categoria: ", response);
        this.addSucceed(response.data, categoryArray);
      } catch (error) {
        alert(error || error.response.data);
        this.setState({ error: true })
      }
    }
  }

  addSucceed(newSection, categoryArray) {
    this.setState({ categoryArray: [...categoryArray, newSection] });
    this.setState({ loading: false, error: false });
    this.setState({ categoryName: '' });
    AlertIOS.alert("", `${newSection.name} adicionado com sucesso!`);
  }

  shouldDeleteCategory = (id) => {
    AlertIOS.alert(
      'Você deseja deletar esta catgoria?',
      'Ao deletar esta categoria, todos os produtos referentes a ela também serão deletados.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteCategory(id)},
      ],
      { cancelable: false },
    );
  }

  async deleteCategory(id) {
    // TODO: ALERT PARA ADVERDER O USUARIO;
    try {
      const response = await api.put(`/sections/delete/${id}`);
      reactotron.log("@delete_section_succeed", response);
      this.setState((state) => {
        const categoryArray = state.categoryArray.filter(category => (
          category.id !== id
        ));
        return { categoryArray };
      });
    } catch(e) {
      alert(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    fontSize: 18,
    color: '#fff',
    padding: 20,
    backgroundColor: '#800000',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 50,
    backgroundColor: '#e10600',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

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
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import Category from '../addNomesCategoria';
import {
  fetch, edit, create, remove
} from '../../../store/actions/CategoryActions';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
    };
  }

  componentDidMount() {
    this.props.fetch();
  }

  // TODO: MUDAR DEPOIS PARA O REDUX
  _addCategory = () => {
    const { categoryName } = this.state;
    if (categoryName) {
      // TODO: CRIAR UM ARQUIVO COM TODOS OS ENDPOINTS
      const data = { section: { name: categoryName } };
      this.props.create(data);
      this.setState({ categoryName: ''})
    }
  }

  _deleteCategory(id) {
    this.props.remove(id);
  }

  _shouldDeleteCategory = (id) => {
    AlertIOS.alert(
      'Você deseja deletar esta catgoria?',
      'Ao deletar esta categoria, todos os produtos referentes a ela também serão deletados.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this._deleteCategory(id) },
      ],
      { cancelable: false },
    );
  }

  render() {
    const category = this.props.categoryList.map(({ id, name }) => (
      <Category
        key={id}
        keyValue={id}
        value={name}
        deleteMethod={() => this._shouldDeleteCategory(id)}
      />
    ));

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {this.props.fetchLoading
            ? <ActivityIndicator color="red" size="large" />
            : category}
        </ScrollView>
        <TouchableOpacity onPress={this._addCategory} style={styles.addButton}>
          {this.props.addLoadState ? <ActivityIndicator color="white" />
            : <Text style={styles.addButtonText}>+</Text>
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

const mapStateToProps = ({ CategoryReducer }) => ({
  fetchError: CategoryReducer.fetchError,
  fetchLoadState: CategoryReducer.fetchLoadState,
  addLoadState: CategoryReducer.addLoadState,
  categoryList: CategoryReducer.categoryList

});

export default connect(mapStateToProps, {
  fetch, edit, create, remove
})(Categories);

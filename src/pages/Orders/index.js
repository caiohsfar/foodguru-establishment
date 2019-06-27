import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  FlatList
} from 'react-native';
import reactotron from 'reactotron-react-native';
import {
 Card, CardItem, Left, Right, Button, Container, Tab, Tabs 
} from 'native-base';
import { connect } from 'react-redux';
import Header from '../../components/Orders/Header';
import OrderItem from '../../components/Orders/OrderItem';
import { fetchOrders, addToProgress, finalize, addToMade } from '../../store/actions/OrderActions';
import orders from '../../constants/orders';
import Toast, {DURATION} from 'react-native-easy-toast'
import SocketIOClient from 'socket.io-client';
import Config from 'react-native-config';
import { getUserId } from '../../services/userServices';

class Orders extends Component {
  constructor(props) {
    super(props);
    this._io = SocketIOClient(Config.API_URL);
    this.addSocketListener();
  }

  addSocketListener = async () => {
    const io = this._io;
    const userId = await getUserId();
    io.on('orders', (item) => {
      reactotron.log("Socker", item, userId)
      if (userId === item[0].establishmentId) {
        this.props.addToMade(item[0]);
      }
    })
  }

  handleItemPress = (item, type) => {
    if (type === orders.MADE) {
      this.props.addToProgress(item);
    } else {
      this.props.finalize(item.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.madeList.length > nextProps.madeList.length) {
      this.refs.toast.show('O ítem passou para a lista de produtos em progresso!', 1000);
    }
    if (this.props.inProgressList.length > nextProps.inProgressList.length) {
      this.refs.toast.show('O ítem foi marcado como finalizado!', 1000);
    }
    if (this.props.madeList.length < nextProps.madeList.length) {
      this.refs.toast.show('Novo pedido!', 1000)
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item: { id, quantity, name } }, type) => (
    <OrderItem
      id={id}
      name={name}
      quantity={quantity}
      type={type}
      handlePress={this.handleItemPress}
    />
  );

  renderList = (data, type) => (
    <FlatList
      data={data}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => this._renderItem({ item }, type)}
    />
  );

  componentDidMount = async () => {
    this.props.fetchOrders();
  }

  render() {
    const { inProgressList, madeList } = this.props;
    return (
      <Container style={{backgroundColor: '#ddd'}}>
        <Header />
        <Tabs initialPage={0}>
          <Tab tabStyle={{ backgroundColor: '#FF0000' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: '#FF0000' }} heading="Realizados">
            {this.renderList(madeList, orders.MADE)}
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#FF0000' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: '#FF0000' }} heading="Em Andamento">
            {this.renderList(inProgressList, orders.IN_PROGRESS)}
          </Tab>
        </Tabs>
        <Toast ref="toast"/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  order: {
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    marginBottom: 16 * 3.5,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    marginBottom: 16 * 3.5,
  },
  textCardLeft: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff0000',
    marginTop: 7,
    fontSize: 20
  },
  textStuff: {
    textAlign: 'center',
    marginTop: 3,
    fontSize: 14
  },
  textCardRight: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff0000'
  },
  imageCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 5
  },
});

const mapStateToProps = ({
  OrdersReducer:
  {
    madeList,
    inProgressList,
    errorMessage,
    fetchLoadState
  }
}) => ({
  madeList,
  inProgressList,
  errorMessage,
  isLoading: fetchLoadState
});

export default connect(mapStateToProps, { fetchOrders, addToProgress, finalize, addToMade })(Orders);

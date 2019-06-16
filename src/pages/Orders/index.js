import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import { Card, CardItem, Left, Right, Button, Container, Tab, Tabs,Text } from 'native-base';

export default class App extends Component {
  state={
    categories:[
      { id: 1,
        numberOrder: '001',
        mesa: 1,
        order: ['2X Pizza de Mussarela\n'],
        situation: ['Realizado'],
      },
      { id: 2,
        numberOrder: '002',
        mesa: 2,
        order: ['1X Feijoada\n'],
        situation: ['Realizado'],
      },
      { id: 3,
        numberOrder: '003',
        mesa: 3,
        order: ['1X Macarronada\n'],
        situation: ['Realizado'],
      },
      { id: 4,
        numberOrder: '004',
        mesa: 4,
        order: ['1X X-Tudo\n', '1X Água com gás\n'],
        situation: ['Andamento'],
      },
      { id: 5,
        numberOrder: '005',
        mesa: 5,
        order: ['2X Frango Parmegiana\n'],
        situation: ['Andamento'],
      }
      ,
      { id: 6,
        numberOrder: '006',
        mesa: 6,
        order: ['1X Pizza Portuguesa\n', '1X Coca Cola 1L\n'],
        situation: ['Andamento'],
      },
      { id: 7,
        numberOrder: '007',
        mesa: 7,
        order: ['2X Almoço Executivo\n'],
        situation: ['Andamento'],
      },
      { id: 8,
        numberOrder: '008',
        mesa: 8,
        order: ['2X Yakisoba\n'],
        situation: ['Andamento'],
      },
      { id: 9,
        numberOrder: '009',
        mesa: 9,
        order: ['1X Filé Parmegiana\n','1X Coca Cola 1L\n'],
        situation: ['Finalizado'],
      },
      { id: 10,
        numberOrder: '010',
        mesa: 10,
        order: ['1X Pizza de Calabresa\n', '1X Coca Cola 2L\n'],
        situation: ['Finalizado'],
      }
    ]
  };

  render() {
    const {categories} = this.state;
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab tabStyle={{backgroundColor: '#FF0000'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#fff'}} activeTextStyle={{color: '#FF0000',}} heading="Realizados">
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 10,marginBottom: 50}}
            >
              <View flex={0} row space="between" style={styles.categories}>
                {categories.map(category => (
                <TouchableOpacity key={category.id}>
                  <Card>  
                    <Text style={styles.textCardLeft}>Nº{category.numberOrder} - Mesa: {category.mesa}</Text>
                    <Text style={styles.textStuff}>{category.order}</Text>
                  </Card>
                </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Tab>
          <Tab tabStyle={{backgroundColor: '#FF0000'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#fff'}} activeTextStyle={{color: '#FF0000',}} heading="Andamento">
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 10,marginBottom: 50}}
            >
              <View flex={0} row space="between" style={styles.categories}>
                {categories.map(category => (
                <TouchableOpacity key={category.id}>
                  <Card>  
                    <Text style={styles.textCardLeft}>Nº{category.numberOrder} - Mesa: {category.mesa}</Text>
                    <Text style={styles.textStuff}>{category.order}</Text>
                  </Card>
                </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Tab>
          <Tab tabStyle={{backgroundColor: '#FF0000'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#fff'}} activeTextStyle={{color: '#FF0000',}} heading="Finalizados">
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 10,marginBottom: 50}}
            >
              <View flex={0} row space="between" style={styles.categories}>
                {categories.map(category => (
                <TouchableOpacity key={category.id}>
                  <Card>  
                    <Text style={styles.textCardLeft}>Nº{category.numberOrder} - Mesa: {category.mesa}</Text>
                    <Text style={styles.textStuff}>{category.order}</Text>
                  </Card>
                </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Tab>
        </Tabs>
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
  textStuff:{
    textAlign: 'center',
    marginTop: 3,
    fontSize: 14
  },
  textCardRight: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: "#ff0000"
  },
  imageCard:{
    width:60, 
    height:60,
    borderRadius:10, 
    marginRight:5
  },
});
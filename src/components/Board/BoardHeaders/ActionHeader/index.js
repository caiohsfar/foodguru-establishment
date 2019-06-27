import React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const ActionHeader = props => (
  <Header
    placement="right"
    containerStyle={{ backgroundColor: '#ff4d4d', height: 65, justifyContent: 'center' }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
      }}
    >
      <Icon type="material" name="arrow-back" color="#ddd" onPress={props.onPressExit} size={30} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#ddd',
          marginLeft: 10
        }}
      >
        {props.count}
      </Text>
    </View>

    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 10
      }}
    >
      <Icon
        containerStyle={{ marginHorizontal: 10, marginBottom: 10 }}
        size={27}
        type="material"
        name="delete"
        color="#ddd"
        onPress={props.onPressRemove}
      />
      {
        props.count === 1
          && (
          <Icon
            containerStyle={{ marginHorizontal: 10, marginBottom: 10 }}
            size={27}
            type="material"
            name="info"
            color="#ddd"
            onPress={props.onPressDetail}
          />
          )
      }
      <Icon
        containerStyle={{ marginHorizontal: 10, marginBottom: 10 }}
        size={27}
        type="material"
        name="clear-all"
        color="#ddd"
        onPress={props.onPressSelectAll}
      />
    </View>
  </Header>
);

export default ActionHeader;

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class Category extends Component{
    render(){
        return (
            <View key={this.props.keyValue} style={styles.category}>
                <Text style={styles.categoryText}>{this.props.value.category}</Text>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.categoryDelete}>
                    <Icon style={[{ color: '#e10600' }]} size={25} name="delete" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    category:{
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#e10600',
    },
    categoryText:{
        padding: 10,
        paddingLeft: 20,
        borderLeftWidth: 2,
        borderLeftColor: '#800000',
    },
    categoryDelete:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#e10600',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    categoryDeleteText:{
        color: 'white',
    }
});
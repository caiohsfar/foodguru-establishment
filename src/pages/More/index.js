import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Category from './addNomesCategoria';

export default class AdicionarCategoria extends Component{
    constructor(props){
        super(props);
        this.state={
            categoryArray: [],
            categoryName: '',
        }
    }
    render(){
        let category = this.state.categoryArray.map((value, key) => {
            return <Category key={key} keyValue={key} value={value}
                    deleteMethod={ () => this.deleteCategory(key) }/>
        });

        return (
            <View style={styles.container}>
                
                <View style={styles.header}> 
                    <Text style={styles.headerText}>Adicionar Categoria</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {category}
                </ScrollView>

                <TouchableOpacity onPress={this.addCategory.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

                <View styles={styles.footer}>
                    <TextInput style={styles.textInput}
                        onChangeText={(categoryName) => this.setState({categoryName})}
                        value={this.state.categoryName}
                        placeholder='Adicione uma categoria...'
                        placeholderTextColor = 'white'>
                    </TextInput>
                </View>
            </View>
        );
    }

    addCategory(){
        if (this.state.categoryName){
            this.state.categoryArray.push({
                'category': this.state.categoryName
            })
            this.setState({ categoryArray: this.state.categoryArray})
            this.setState({ categoryName: ''});
        }
    }

    deleteCategory(key){
        this.state.categoryArray.splice(key,1);
        this.setState({noteArray: this.state.categoryArray})
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderBottomColor: '#ddd',
    },
    headerText:{
        color: 'white',
        fontSize: 18,
        padding: 10,
    },
    scrollContainer:{
        flex: 1,
        marginBottom: 40,
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput:{
        alignSelf: 'stretch',
        fontSize: 18,
        color: '#fff',
        padding: 20,
        backgroundColor: '#800000',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton:{
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
    addButtonText:{
        color:'#fff',
        fontSize: 24,
    },
});
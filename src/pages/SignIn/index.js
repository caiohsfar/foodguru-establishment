import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';
import styles from './styles';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/AuthActions';


class SignIn extends Component {
  static navigationOptions = {
    header: null
  };
  
  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo width={150} height={150} resizeMode="contain" />
          </View>
          <View style={styles.form}>
            <LoginForm 
              handleSubmit={this.props.signIn} 
              loadState={this.props.loadState} 
              signInErrorMessage={this.props.signInErrorMessage}
            />
          </View>
          <View style={styles.messageContainer}>
            <TouchableOpacity onPress={this.navigateToSignUp}>
              <Text style={styles.message}>Ainda não é cadastrado? Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  loadState: state.AuthReducer.loadState,
  signInErrorMessage: state.AuthReducer.signInErrorMessage,
});

export default connect(
  mapStateToProps,
  { signIn }
)(SignIn)

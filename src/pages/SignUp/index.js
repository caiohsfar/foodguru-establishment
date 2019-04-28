import React, { PureComponent } from 'react';
import {
  ScrollView, View, Text, ActivityIndicator
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import formValidationSchema from '../../utils/formValidationSchema';
import { findCep, signUp, clearAddress } from '../../store/actions/AuthActions';
import styles from './styles';
import { errorMessages, generalMessages } from '../../constants/messages';

class SignUp extends PureComponent {
  static navigationOptions = {
    title: 'Cadastro'
  };

  state = {
    cep: '',
    addressError: false,
  };

  componentWillUnmount() {
    this.props.clearAddress();
  }

  addressIsValid = (address, number) => {
    let validation = true;
    if (address.state === '') {
      this.setState({ addressError: true });
      validation = false;
    }
    return validation;
  }

  handleCepChange = (newText) => {
    this.setState({ cep: newText });
    if (newText.toString().length === 8) {
      this.props.findCep(newText);
      this.setState({ addressError: false });
    } else {
      this.props.clearAddress();
    }
  }

  render() {
    return (
      <ScrollView styles={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            cnpj: '',
            number: ''
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values, actions) => {
            if (this.addressIsValid(this.props.address, this.state.number)) {
              const { address } = this.props;
              const { cep } = this.state;
              this.props.signUp({ ...values, ...address, cep });
            }
          }}
        >
          {formikProps => (
            <React.Fragment>
              <View style={styles.formikContainer}>
                <TextField
                  label="Email"
                  keyboardType="email-address"
                  onChangeText={formikProps.handleChange('email')}
                  value={formikProps.values.email}
                  error={formikProps.touched.email ? formikProps.errors.email : ''}
                  onBlur={formikProps.handleBlur('email')}
                />
                <TextField
                  label="Nome"
                  onChangeText={formikProps.handleChange('name')}
                  value={formikProps.values.name}
                  error={formikProps.touched.name ? formikProps.errors.name : ''}
                  onBlur={formikProps.handleBlur('name')}
                />
                <TextField
                  label="Senha"
                  secureTextEntry
                  onChangeText={formikProps.handleChange('password')}
                  value={formikProps.values.password}
                  error={formikProps.touched.password ? formikProps.errors.password : ''}
                  onBlur={formikProps.handleBlur('password')}
                />
                <TextField
                  label="Confirmar senha"
                  secureTextEntry
                  onChangeText={formikProps.handleChange('confirmPassword')}
                  value={formikProps.values.confirmPassowrd}
                  error={
                    formikProps.touched.confirmPassword ? formikProps.errors.confirmPassword : ''
                  }
                  onBlur={formikProps.handleBlur('confirmPassword')}
                />
                <TextField
                  containerStyle={styles.input}
                  label="CNPJ"
                  keyboardType="numeric"
                  onChangeText={formikProps.handleChange('cnpj')}
                  value={formikProps.values.cnpj}
                  error={formikProps.touched.cnpj ? formikProps.errors.cnpj : ''}
                  onBlur={formikProps.handleBlur('cnpj')}
                />
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.row}>
                  <TextField
                    label="CEP"
                    containerStyle={styles.cep}
                    keyboardType="numeric"
                    onChangeText={cep => this.handleCepChange(cep)}
                    value={this.state.cep}
                    error={this.props.cepError || this.state.addressError ? errorMessages.CEP_ERROR : ''}
                  />
                  <View style={styles.cepHelpContainer}>
                    <Text style={styles.cepHelp}>{generalMessages.CEP_HELP}</Text>
                    {this.props.cepLoading ? <ActivityIndicator /> : null}
                  </View>
                </View>
                <View style={styles.row}>
                  <TextField
                    label="Rua"
                    containerStyle={styles.street}
                    editable={false}
                    value={this.props.address.street}
                  />
                  <TextField
                    label="N"
                    keyboardType="numeric"
                    containerStyle={styles.number}
                    onChangeText={formikProps.handleChange('number')}
                    value={formikProps.values.number}
                    error={formikProps.touched.number ? formikProps.errors.number : ''}
                    onBlur={formikProps.handleBlur('number')}
                  />
                </View>
                <View style={styles.row}>
                  <TextField
                    label="Bairro"
                    containerStyle={styles.neighborhood}
                    editable={false}
                    value={this.props.address.neighborhood}
                  />
                  <TextField
                    label="Cidade"
                    containerStyle={styles.city}
                    editable={false}
                    value={this.props.address.city}
                  />
                  <TextField
                    label="UF"
                    containerStyle={styles.state}
                    editable={false}
                    value={this.props.address.state}
                  />
                </View>
              </View>
              <Button
                containerStyle={{ margin: 50 }}
                onPress={formikProps.handleSubmit}
                title="Cadastrar"
                type="solid"
                loading={this.props.loadState}
              />

            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  address: state.AuthReducer.address,
  loadState: state.AuthReducer.loadState,
  signUpErrorMessage: state.AuthReducer.signUpErrorMessage,
  cepLoading: state.AuthReducer.cepLoading,
  cepError: state.AuthReducer.cepError
});

export default connect(
  mapStateToProps,
  { findCep, signUp, clearAddress }
)(SignUp);

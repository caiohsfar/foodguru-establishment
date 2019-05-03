import React from 'react';
import { Formik } from 'formik';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import formValidationSchema from './formValidationSchema';
import styles from './styles';

export default props => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={formValidationSchema}
    onSubmit={(values) => {
        props.handleSubmit(values);
      }}
    >
    {formikProps => (
      <React.Fragment>
        <View style={styles.container}>
          <TextField
            textColor='#fff'
            tintColor="#fff"
            placeholderTextColor="#fff"
            baseColor="#ddd"
            errorColor="#fff"
            label="Email"
            onChangeText={formikProps.handleChange('email')}
            value={formikProps.values.email}
            error={formikProps.touched.email ? formikProps.errors.email : ''}
          />
          <TextField
            textColor='#fff'
            tintColor="#fff"
            placeholderTextColor="#fff"
            baseColor="#ddd"
            errorColor="#fff"
            secureTextEntry
            label="Senha"
            onChangeText={formikProps.handleChange('password')}
            value={formikProps.values.password}
            error={formikProps.touched.password ? formikProps.errors.password : ''}
          />
          <Text style={styles.errorMessage}>
          {props.signInErrorMessage ? props.signInErrorMessage :
          null}</Text>
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.title}
          onPress={formikProps.handleSubmit}
          title="Cadastrar"
          type="solid"
          loading={props.loadState}
        />
      </React.Fragment>
    )}
  </Formik>
);

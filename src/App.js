import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Store from './store';
import Routes from './routes';
import NavigationService from './services/NavigationService';
import { appTheme } from './constants/styles';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <StatusBar backgroundColor={appTheme.COLOR} barStyle="default" />
        <Routes
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

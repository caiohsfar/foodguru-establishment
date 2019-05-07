import React, { Component } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import Store from './store';
import Routes from './routes';
import NavigationService from './navigation/NavigationService';
import { appTheme } from './constants/styles';

import('./config/ReactotronConfig');

YellowBox.ignoreWarnings(['Warning:']);
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <StatusBar backgroundColor={appTheme.STATUS_BAR_COLOR} barStyle="default" />
        <Routes
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

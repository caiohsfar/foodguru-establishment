import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './store';
import Routes from './routes';
import NavigationService from './services/NavigationService';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Routes
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

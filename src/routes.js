import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import {
  transitionConfig,
  defaultNavigationOptions
} from './config/NavigationConfig';


const AppStack = createStackNavigator(
  { Home },
  { transitionConfig, defaultNavigationOptions }
);
const AuthStack = createStackNavigator(
  { SignIn }
);
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(createSwitchNavigator(
  {
    Splash,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  }
));

export default Routes;

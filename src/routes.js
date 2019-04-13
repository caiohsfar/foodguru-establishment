import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoading from './pages/AuthLoading';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const AppStack = createStackNavigator(
  { Home }
);
const AuthStack = createStackNavigator(
  { SignIn }
);
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Routes;

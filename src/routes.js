import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Splash from './pages/Splash';

import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Splash,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Splash'
    }
  )
);

export default Routes;

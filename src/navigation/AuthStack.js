import { createStackNavigator } from 'react-navigation';
import { transitionConfig, defaultNavigationOptions } from './NavigationConfig';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default createStackNavigator(
  { SignIn, SignUp },
  { initialRouteName: 'SignIn', defaultNavigationOptions, transitionConfig }
);

/*
    Caso se deseje realizar uma navegação "diferenciada" (ler documentação)
*/
import { NavigationActions, StackActions } from 'react-navigation';

// eslint-disable-next-line no-underscore-dangle
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  );
}
function pop(routeName, params) {
  _navigator.dispatch(
    StackActions.pop({
      routeName,
      params
    })
  );
}

function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate(routeName, params)],
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  replace,
  pop,
  reset
};

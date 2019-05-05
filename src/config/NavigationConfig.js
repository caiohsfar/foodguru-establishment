import { Animated, Easing } from 'react-native';
import { appTheme } from '../constants/styles';
// Onde fica as opções default da navegação (App theme, cor da barra etc)
export const defaultNavigationOptions = {
  headerTintColor: appTheme.FONT_COLOR,
  headerStyle: {
    backgroundColor: appTheme.COLOR
  }
};

export const transitionConfig = () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;

    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    return { transform: [{ translateX }] };
  }
});

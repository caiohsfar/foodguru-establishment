import Reactotron from 'reactotron-react-native';
import Config from 'react-native-config';

if (__DEV__) {
  const tron = Reactotron.configure({ host: Config.IPV4 })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}

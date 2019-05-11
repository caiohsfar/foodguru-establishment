import Reactotron from 'reactotron-react-native';
import Config from 'react-native-config';

const host = Config.IPV4 ? { host: Config.IPV4 } : null;

if (__DEV__) {
  const tron = Reactotron.configure(host)
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}

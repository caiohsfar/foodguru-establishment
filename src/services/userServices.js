import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import Geocoder from 'react-native-geocoding';
import reactotron from 'reactotron-react-native';

export const getUserId = async () => {
  try {
    return JSON.parse(await AsyncStorage.getItem('@FoodGuru:session')).establishment.id;
  } catch (e) {
    return null;
  }
};

export const getUserSession = async () => {
  try {
    return JSON.parse(await AsyncStorage.getItem('@FoodGuru:session'));
  } catch (e) {
    return null;
  }
};

export const getGeocodeInfo = async (address) => {
  reactotron.log(address);

  let info;
  try {
    Geocoder.init('AIzaSyB3lOE1h65_wey3CQBjfMh3mo67-_UNPG0');
    const response = await Geocoder.from(address);
    info = response.results[0].geometry.location;
  } catch (e) {
    Reactotron.warn(e);
  }
  return info;
};

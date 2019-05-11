import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';

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

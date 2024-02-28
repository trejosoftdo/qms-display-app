import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { isWeb } from './helpers';


/**
 * Gets a value from the storage
 * @param  {string} key
 * @returns Promise<string>
 */
export const getValue = (key: string): Promise<string> => {
  if (isWeb()) {
    return AsyncStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

/**
 * Stores a value in the storage
 * @param  {string} key
 * @param  {string} value
 * @returns Promise<void>
 */
export const setValue = (key: string, value: string): Promise<void> => {
  if (isWeb()) {
    return AsyncStorage.setItem(key, value);
  }
  return  SecureStore.setItemAsync(key, value);
};

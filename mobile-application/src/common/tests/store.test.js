import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { isWeb } from "../helpers";
import { getValue, setValue } from "../store";

jest.mock('expo-secure-store');
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  };
});

jest.mock('../helpers');

describe('Store', () => {
  const mockKey = 'mock-key';
  const mockValue = 'mock-value';

  beforeEach(() => {
    AsyncStorage.getItem.mockReturnValue(mockValue);
    SecureStore.getItemAsync.mockResolvedValue(mockValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getValue', () => {
    it('gets the values from async storage when being in web', async () => {
      isWeb.mockReturnValue(true);
      const value = await getValue(mockKey);
      expect(value).toEqual(mockValue);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(mockKey);
      expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(0);
    });

    it('gets the values from secure storage when not being in web', async () => {
      isWeb.mockReturnValue(false);
      const value = await getValue(mockKey);
      expect(value).toEqual(mockValue);
      expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(mockKey);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(0);
    });
  });

  describe('setValue', () => {
    it('gets the value to async storage when being in web', async () => {
      isWeb.mockReturnValue(true);
      await setValue(mockKey, mockValue);
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(mockKey, mockValue);
      expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(0);
    });

    it('sets the value to secure storage when not being in web', async () => {
      isWeb.mockReturnValue(false);
      await setValue(mockKey, mockValue);
      expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(mockKey, mockValue);
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);
    });
  });
});
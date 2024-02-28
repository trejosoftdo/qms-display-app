import { Platform } from "react-native";
import { router } from 'expo-router';
import { calculateExpireTime, getCurrentTime, goToPath, isWeb } from "../helpers";

jest.mock('expo-router');

describe('Helpers', () => {
  const mockCurrentTime = 1706056326031;
  let os;

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date().setTime(mockCurrentTime));
    os = Platform.OS;
  });

  afterAll(() => {
    Platform.OS = os;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isWeb', () => {
    it('returns true when platform is web', async () => {
      Platform.OS = 'web';
      const value = isWeb();
      expect(value).toBeTruthy();
    });

    it('returns false when platform is not web', async () => {
      Platform.OS = 'ios';
      const value = isWeb();
      expect(value).toBeFalsy();
    });
  });

  describe('getCurrentTime', () => {
    it('returns the current time as expected', async () => {
      const value = getCurrentTime();
      expect(value).toEqual(mockCurrentTime);
    });
  });

  describe('calculateExpireTime', () => {
    it('calculates the expire time as expected', async () => {
      const value = calculateExpireTime(10);
      expect(value).toEqual(mockCurrentTime + 10000);
    });
  });

  describe('goToPath', () => {
    const mockPath = '/mock-path';
    const mockParams = {
      param1: 'value-1',
      param2: 'value-2',
    }
  
    it('moves the router to the desired path as expected', async () => {
      goToPath(mockPath);
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith({
        pathname: mockPath,
      });
    });

    it('moves the router to the desired path and params as expected as expected', async () => {
      goToPath(mockPath, mockParams);
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith({
        pathname: mockPath,
        params: mockParams,
      });
    });
  });
});
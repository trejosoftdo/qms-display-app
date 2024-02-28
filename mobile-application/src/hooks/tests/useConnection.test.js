import { renderHook, act } from '@testing-library/react-hooks';
import { getConnectionDetails, saveConnectionDetails } from "../../common/device-connection";
import { connectDevice, getTokensForDevice } from "../../common/services/auth";
import { calculateExpireTime, getCurrentTime } from "../../common/helpers";
import { INTERVAL_TIME } from '../../common/constants';
import useConnection from "../useConnection";

jest.mock('../../common/device-connection');
jest.mock('../../common/services/auth');
jest.mock('../../common/helpers');

const flushPromises = () => new Promise(setImmediate);

describe('useConnection hook', () => {
  const mockCurrentTime = 1706056326031;
  const mockApplicationId = 'test-application-id';
  const mockDeviceCode = 'test-device-code';
  const mockError = new Error('Unexpected error');
  const mockAccesToken = {
    value: 'test-access-token',
    expiresAt: mockCurrentTime + 1000,
  };
  const mockRefreshToken = {
    value: 'test-refresh-token',
    expiresAt: mockCurrentTime + 10000,
  };
  const mockConnectionDetails = {
    applicationId: mockApplicationId,
    deviceCode: mockDeviceCode,
    accessToken: mockAccesToken,
    refreshToken: mockRefreshToken,
  };

  beforeEach(() => {
    jest.useFakeTimers({
      doNotFake: [
        'nextTick',
        'setImmediate',
        'clearImmediate',
        'setTimeout',
        'clearTimeout',
      ]
    });
    getConnectionDetails.mockResolvedValue(mockConnectionDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('it gets initialized as expected', async () => {
      const { result } = renderHook(() => useConnection());
      
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({});
      expect(typeof result.current.connect).toEqual('function');
      expect(typeof result.current.clear).toEqual('function');
      expect(result.current.connectionDetails).toEqual(mockConnectionDetails);
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
    });
  
    it('it indicates when an error loading connection details occurs', async () => {  
      getConnectionDetails.mockRejectedValue(mockError);
    
      const { result } = renderHook(() => useConnection());
      
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toEqual({});
      expect(result.current.connectionDetails).toBeUndefined();
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
    });
  
    it('it does not set connection details when these are not available', async () => {
      getConnectionDetails.mockResolvedValue(undefined);
  
      const { result } = renderHook(() => useConnection());
      
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({});
      expect(typeof result.current.connect).toEqual('function');
      expect(typeof result.current.clear).toEqual('function');
      expect(result.current.connectionDetails).toBeUndefined();
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
    });
  });


  describe('connect', () => {
    it('gets the device token successfully', async () => {
      const mockConnectionData = {
        deviceCode: mockDeviceCode,
      };
      connectDevice.mockResolvedValue(mockConnectionData);
      getConnectionDetails.mockResolvedValue(undefined);
    
      const { result } = renderHook(() => useConnection());
      
      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual(mockConnectionData);
      expect(result.current.connectionDetails).toBeUndefined();
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });

    it('indicates when there is an error getting the token', async () => {
      connectDevice.mockRejectedValue(mockError);
      getConnectionDetails.mockResolvedValue(undefined);
    
      const { result } = renderHook(() => useConnection());
      
      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toEqual({});
      expect(result.current.connectionDetails).toBeUndefined();
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });
  });

  describe('clear', () => {
    it('restart the state as expected', async () => {
      const mockConnectionData = {
        deviceCode: mockDeviceCode,
      };
      connectDevice.mockResolvedValue(mockConnectionData);
    
      const { result } = renderHook(() => useConnection());

      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });

      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual(mockConnectionData);
      expect(result.current.connectionDetails).toEqual(mockConnectionDetails);

      await act(async () => {
        result.current.clear(mockApplicationId);
        await flushPromises();
      });
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({});
      expect(result.current.connectionDetails).toBeUndefined();

      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });
  });

  describe('Getting device token', () => {
    const mockConnectionData = {
      deviceCode: mockDeviceCode,
    };
    const mockTokensForDevice = {
      accessToken: mockAccesToken.value,
      expiresIn: 1000,
      refreshToken: mockRefreshToken.value,
      refreshExpiresIn: 10000,
    };
    const mockExpireTime = mockCurrentTime + 1000;

    it('gets the tokens and stores them as expected', async () => {
      connectDevice.mockResolvedValue(mockConnectionData);
      getConnectionDetails.mockResolvedValue(undefined);
      getTokensForDevice.mockResolvedValue(mockTokensForDevice);
      calculateExpireTime.mockReturnValue(mockExpireTime);
    
      const { result } = renderHook(() => useConnection());

      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });

      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({
        ...mockConnectionData,
        tokens: mockTokensForDevice,
      });
      expect(result.current.connectionDetails).toBeUndefined();
      expect(saveConnectionDetails).toHaveBeenCalledTimes(1);
      expect(saveConnectionDetails).toHaveBeenCalledWith({
        applicationId: mockApplicationId,
        deviceCode: mockConnectionData.deviceCode,
        accessToken: {
          value: mockTokensForDevice.accessToken,
          expiresAt: mockExpireTime,
        },
        refreshToken: {
          value: mockTokensForDevice.refreshToken,
          expiresAt: mockExpireTime,
        },
      });
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(getTokensForDevice).toHaveBeenCalledTimes(1);
      expect(getTokensForDevice).toHaveBeenCalledWith(mockApplicationId, mockConnectionData.deviceCode);
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });

    it('does not store the tokens if they do not come', async () => {
      connectDevice.mockResolvedValue(mockConnectionData);
      getConnectionDetails.mockResolvedValue(undefined);
      getTokensForDevice.mockResolvedValue({});
      calculateExpireTime.mockReturnValue(mockExpireTime);
    
      const { result } = renderHook(() => useConnection());

      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });

      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({
        ...mockConnectionData,
        tokens: {},
      });
      expect(result.current.connectionDetails).toBeUndefined();
      expect(saveConnectionDetails).toHaveBeenCalledTimes(0);
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(getTokensForDevice).toHaveBeenCalledTimes(1);
      expect(getTokensForDevice).toHaveBeenCalledWith(mockApplicationId, mockConnectionData.deviceCode);
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });

    it('handles error while getting the tokens as expected', async () => {
      connectDevice.mockResolvedValue(mockConnectionData);
      getConnectionDetails.mockResolvedValue(undefined);
      getTokensForDevice.mockRejectedValue(mockError);
      calculateExpireTime.mockReturnValue(mockExpireTime);
    
      const { result } = renderHook(() => useConnection());

      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });

      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());
  
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toEqual({
        ...mockConnectionData,
      });
      expect(result.current.connectionDetails).toBeUndefined();
      expect(saveConnectionDetails).toHaveBeenCalledTimes(0);
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(getTokensForDevice).toHaveBeenCalledTimes(1);
      expect(getTokensForDevice).toHaveBeenCalledWith(mockApplicationId, mockConnectionData.deviceCode);
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });

    it('does not continue to get the tokes when the access token is already', async () => {
      connectDevice.mockResolvedValue(mockConnectionData);
      getTokensForDevice.mockResolvedValue(mockTokensForDevice);
      calculateExpireTime.mockReturnValue(mockExpireTime);
    
      const { result } = renderHook(() => useConnection());

      await act(async () => {
        result.current.connect(mockApplicationId);
        await flushPromises();
      });

      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());
  
      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());

      jest.advanceTimersByTime(INTERVAL_TIME);
      await act(() => flushPromises());

      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(null);
      expect(result.current.data).toEqual({
        ...mockConnectionData,
        tokens: mockTokensForDevice,
      });
      expect(result.current.connectionDetails).toEqual(mockConnectionDetails);
      expect(saveConnectionDetails).toHaveBeenCalledTimes(1);
      expect(saveConnectionDetails).toHaveBeenCalledWith({
        applicationId: mockApplicationId,
        deviceCode: mockConnectionData.deviceCode,
        accessToken: {
          value: mockTokensForDevice.accessToken,
          expiresAt: mockExpireTime,
        },
        refreshToken: {
          value: mockTokensForDevice.refreshToken,
          expiresAt: mockExpireTime,
        },
      });
      expect(getConnectionDetails).toHaveBeenCalledTimes(1);
      expect(getConnectionDetails).toHaveBeenCalledWith();
      expect(getTokensForDevice).toHaveBeenCalledTimes(1);
      expect(getTokensForDevice).toHaveBeenCalledWith(mockApplicationId, mockConnectionData.deviceCode);
      expect(connectDevice).toHaveBeenCalledTimes(1);
      expect(connectDevice).toHaveBeenCalledWith(mockApplicationId);
    });
  });
});
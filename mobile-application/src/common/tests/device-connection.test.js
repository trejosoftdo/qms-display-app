import { v4 as uuid } from 'uuid';
import { getNewAccessToken } from '../services/auth';
import { getCurrentTime } from "../helpers";
import { getValue, setValue } from "../store";
import { CONNECTION_DETAILS_KEY, DEVICE_ID_KEY } from "../constants";
import * as connection from '../device-connection';
import { CONNECTION_EXPIRED_ERROR, DEVICE_NOT_CONNECTED_ERROR } from '../errors';

jest.mock('../helpers');
jest.mock('../store');
jest.mock('../services/auth');
jest.mock('uuid');

describe('Device Connection helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('saveConnectionDetails', () => {
    const mockConnectionDetails = {
      deviceCode: 'mock-device-code',
    };

    it('saves the details as expected', async () => {
      await connection.saveConnectionDetails(mockConnectionDetails);
      expect(setValue).toHaveBeenCalledTimes(1);
      expect(setValue).toHaveBeenCalledWith(
        CONNECTION_DETAILS_KEY,
        '{"deviceCode":"mock-device-code"}'
      );
    });
  });

  describe('getConnectionDetails', () => {
    const mockConnectionDetails = {
      deviceCode: 'mock-device-code',
    };

    beforeEach(() => {
      getValue.mockResolvedValue(JSON.stringify(mockConnectionDetails));
    });

    it('gets the details correctly when present', async () => {
      const details = await connection.getConnectionDetails();
      expect(details).toEqual(mockConnectionDetails);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(CONNECTION_DETAILS_KEY);
    });

    it('returns undefined when failing to get the value', async () => {
      getValue.mockResolvedValue({});
      const details = await connection.getConnectionDetails();
      expect(details).toEqual(undefined);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(CONNECTION_DETAILS_KEY);
    });
  });

  describe('getDeviceId', () => {
    const mockDeviceId = 'mock-device-id';
    const mockNewDeviceId = 'mock-new-device-id';

    beforeEach(() => {
      getValue.mockResolvedValue(mockDeviceId);
      uuid.mockReturnValue(mockNewDeviceId);
    });

    it('gets the id from the store when available', async () => {
      const id = await connection.getDeviceId();
      expect(id).toEqual(mockDeviceId);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(DEVICE_ID_KEY);
      expect(setValue).toHaveBeenCalledTimes(1);
      expect(setValue).toHaveBeenCalledWith(DEVICE_ID_KEY, mockDeviceId);
    });

    it('generates a new id when not available', async () => {
      getValue.mockResolvedValue(undefined);
      const id = await connection.getDeviceId();
      expect(id).toEqual(mockNewDeviceId);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(DEVICE_ID_KEY);
      expect(uuid).toHaveBeenCalledTimes(1);
      expect(uuid).toHaveBeenCalledWith();
      expect(setValue).toHaveBeenCalledTimes(1);
      expect(setValue).toHaveBeenCalledWith(DEVICE_ID_KEY, mockNewDeviceId);
    });
  });

  describe('getDeviceAuthHeaders', () => {
    const mockCurrentTime = 1706056326031;
    const mockApplicationId = 'mock-application-id';
    const mockNewAccessToken = 'mock-new-access-token';
    
    beforeEach(() => {
      getCurrentTime.mockReturnValue(mockCurrentTime);
      getNewAccessToken.mockResolvedValue({
        value: mockNewAccessToken,
        expiresAt: mockCurrentTime + 1000,
      });
    });

    it('throws an error when connection details are not available', async () => {
      getValue.mockResolvedValue(undefined);
      await expect(() => connection.getDeviceAuthHeaders()).rejects.toEqual(DEVICE_NOT_CONNECTED_ERROR);
      expect(getValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledTimes(0);
      expect(getNewAccessToken).toHaveBeenCalledTimes(0);
    });

    it('throws an error when application id is present but not the access token data', async () => {
      getValue.mockResolvedValue(JSON.stringify({ applicationId: mockApplicationId }));
      await expect(() => connection.getDeviceAuthHeaders()).rejects.toEqual(DEVICE_NOT_CONNECTED_ERROR);
      expect(getValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledTimes(0);
      expect(getNewAccessToken).toHaveBeenCalledTimes(0);
    });

    it('throws an error when both the access and refresh token has expired', async () => {
      getValue.mockResolvedValue(JSON.stringify({
        applicationId: mockApplicationId,
        accessToken: {
          value: 'mock-access-token',
          expiresAt: mockCurrentTime - 1,
        },
        refreshToken: {
          value: 'mock-refresh-token',
          expiresAt: mockCurrentTime - 1,
        },
      }));
      await expect(() => connection.getDeviceAuthHeaders()).rejects.toEqual(CONNECTION_EXPIRED_ERROR);
      expect(getValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledTimes(0);
      expect(getNewAccessToken).toHaveBeenCalledTimes(0);
    });

    it('gets a new token when access token is expired but refresh is not', async () => {
      const details = {
        applicationId: mockApplicationId,
        accessToken: {
          value: 'mock-access-token',
          expiresAt: mockCurrentTime - 1,
        },
        refreshToken: {
          value: 'mock-refresh-token',
          expiresAt: mockCurrentTime + 1,
        },
      };
      getValue.mockResolvedValue(JSON.stringify(details));
      const headers = await connection.getDeviceAuthHeaders();
      expect(headers).toEqual({
        applicationId: mockApplicationId,
        authorization: `Bearer ${mockNewAccessToken}`,
      });
      expect(getValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledTimes(1);
      expect(getNewAccessToken).toHaveBeenCalledTimes(1);
      expect(getNewAccessToken).toHaveBeenCalledWith(
        details.applicationId,
        details.refreshToken.value,
      );
    });

    it('returns the access token if it has not expired', async () => {
      const details = {
        applicationId: mockApplicationId,
        accessToken: {
          value: 'mock-access-token',
          expiresAt: mockCurrentTime + 1,
        },
        refreshToken: {
          value: 'mock-refresh-token',
          expiresAt: mockCurrentTime + 1,
        },
      };
      getValue.mockResolvedValue(JSON.stringify(details));
      const headers = await connection.getDeviceAuthHeaders();
      expect(headers).toEqual({
        applicationId: mockApplicationId,
        authorization: `Bearer ${details.accessToken.value}`,
      });
      expect(getValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledTimes(0);
      expect(getNewAccessToken).toHaveBeenCalledTimes(0);
    });
  });
});
import { AUTHORIZATION_PENDING_CODE, VALIDATION_ERROR_STATUS_CODE } from "../../constants";
import { getAuthAPIInstance } from "../api-configuration";
import { calculateExpireTime } from "../../helpers";
import { connectDevice, getNewAccessToken, getTokensForDevice } from "../auth";

jest.mock('../api-configuration');
jest.mock('../../helpers');


describe('Auth service', () => {
  const mockApplicationId = 'mock-application-id';
  const mockAppInstance = {
    authorizeDevice: jest.fn(),
    getAuthTokens: jest.fn(),
    getNewAccessToken: jest.fn(),
  };

  beforeEach(() => {
    getAuthAPIInstance.mockReturnValue(mockAppInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connectDevice', () => {
    const mockAuthorizeDeviceResponse = {
      data: {
        deviceCode: 'mock-device-code',
        userCode: 'mock-user-code',
        interval: 10,
        expiresIn: 3600,
        verificationURI: 'http://verification-uri.test',
      },
    };
  
    beforeEach(() => {
      mockAppInstance.authorizeDevice.mockResolvedValue(mockAuthorizeDeviceResponse);
    });
  
    it('connects the device through the auth api as expected', async () => {
      const response = await connectDevice(mockApplicationId);
      expect(response).toEqual({
        deviceCode: mockAuthorizeDeviceResponse.data.deviceCode,
        userCode: mockAuthorizeDeviceResponse.data.userCode,
        interval: mockAuthorizeDeviceResponse.data.interval,
        expiresIn: mockAuthorizeDeviceResponse.data.expiresIn,
        verificationURI: mockAuthorizeDeviceResponse.data.verificationURI,
      });
      expect(mockAppInstance.authorizeDevice).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.authorizeDevice).toHaveBeenCalledWith(mockApplicationId);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });
  });

  describe('getTokensForDevice', () => {
    const mockDeviceCode = 'mock-device-code';
    const mockTokensForDeviceResponse = {
      data: {
        refreshToken: 'mock-refresh-token',
        accessToken: 'mock-access-token',
        refreshExpiresIn: 1200,
        expiresIn: 300,
      },
    };
  
    beforeEach(() => {
      mockAppInstance.getAuthTokens.mockResolvedValue(mockTokensForDeviceResponse);
    });
  
    it('gets the device tokens through the auth api as expected', async () => {
      const response = await getTokensForDevice(mockApplicationId, mockDeviceCode);
      expect(response).toEqual({
        accessToken: mockTokensForDeviceResponse.data.accessToken,
        refreshToken: mockTokensForDeviceResponse.data.refreshToken,
        refreshExpiresIn: mockTokensForDeviceResponse.data.refreshExpiresIn,
        expiresIn: mockTokensForDeviceResponse.data.expiresIn,
      });
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledWith({ deviceCode: mockDeviceCode }, mockApplicationId);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });

    it('handles authorization pending errors as expected', async () => {
      const mockValidationError = {
        status: VALIDATION_ERROR_STATUS_CODE,
        json: () => Promise.resolve({
          detail: {
            code: AUTHORIZATION_PENDING_CODE,
          },
        }),
      };
      mockAppInstance.getAuthTokens.mockRejectedValue(mockValidationError);
      const response = await getTokensForDevice(mockApplicationId, mockDeviceCode);
      expect(response).toEqual({ pending: true });
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledWith({ deviceCode: mockDeviceCode }, mockApplicationId);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });

    it('fails for any other errors that are not pending authorization code', async () => {
      const mockValidationError = {
        status: VALIDATION_ERROR_STATUS_CODE,
        json: () => Promise.resolve({
          detail: {},
        }),
      };
      mockAppInstance.getAuthTokens.mockRejectedValue(mockValidationError);
      await expect(() => getTokensForDevice(mockApplicationId, mockDeviceCode)).rejects.toEqual(mockValidationError);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledWith({ deviceCode: mockDeviceCode }, mockApplicationId);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });

    it('fails for any other unexpected error', async () => {
      const mockError = new Error('Unexpected error');
      mockAppInstance.getAuthTokens.mockRejectedValue(mockError);
      await expect(() => getTokensForDevice(mockApplicationId, mockDeviceCode)).rejects.toEqual(mockError);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.getAuthTokens).toHaveBeenCalledWith({ deviceCode: mockDeviceCode }, mockApplicationId);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });
  });

  describe('getNewAccessToken', () => {
    const mockRefreshToken = 'mock-refresh-token';
    const mockNewAccessTokenResponse = {
      data: {
        accessToken: 'mock-access-token',
        expiresIn: 300,
      },
    };
    const mockExpireTime = 12345678;
  
    beforeEach(() => {
      mockAppInstance.getNewAccessToken.mockResolvedValue(mockNewAccessTokenResponse);
      calculateExpireTime.mockReturnValue(mockExpireTime);
    });
  
    it('connects the device through the auth api as expected', async () => {
      const response = await getNewAccessToken(mockApplicationId, mockRefreshToken);
      expect(response).toEqual({
        value: mockNewAccessTokenResponse.data.accessToken,
        expiresAt: mockExpireTime,
      });
      expect(mockAppInstance.getNewAccessToken).toHaveBeenCalledTimes(1);
      expect(mockAppInstance.getNewAccessToken).toHaveBeenCalledWith({ refreshToken: mockRefreshToken }, mockApplicationId);
      expect(calculateExpireTime).toHaveBeenCalledTimes(1);
      expect(calculateExpireTime).toHaveBeenCalledWith(mockNewAccessTokenResponse.data.expiresIn);
      expect(getAuthAPIInstance).toHaveBeenCalledTimes(1);
      expect(getAuthAPIInstance).toHaveBeenCalledWith();
    });
  });
});
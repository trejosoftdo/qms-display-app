import * as api from '../../generated/api';
import { DeviceAuthData, DeviceConnectionData, TokenData } from '../models';
import { AUTHORIZATION_PENDING_CODE, VALIDATION_ERROR_STATUS_CODE } from '../constants';
import { calculateExpireTime } from '../helpers';
import { getAuthAPIInstance } from './api-configuration';


/**
 * Connects a device
 * @param  {string} applicationId 
 * @returns Promise<DeviceConnectionData>
 */
export const connectDevice = async (applicationId: string): Promise<DeviceConnectionData> => {
  const apiInstance = getAuthAPIInstance();
  const response = await apiInstance.authorizeDevice(applicationId);
  return {
    deviceCode: response.data.deviceCode,
    userCode: response.data.userCode,
    interval: response.data.interval,
    expiresIn: response.data.expiresIn,
    verificationURI: response.data.verificationURI,
  };
};

/**
* Gets the tokens for the device
* @param  {string} applicationId 
* @param  {string} deviceCode
* @returns Promise<DeviceAuthData>
*/
export const getTokensForDevice = async (applicationId: string, deviceCode: string): Promise<DeviceAuthData> => {
  try {
    const apiInstance = getAuthAPIInstance();
    const response = await apiInstance.getAuthTokens({
      deviceCode,
    }, applicationId);

    return {
      refreshToken: response.data.refreshToken,
      accessToken: response.data.accessToken,
      refreshExpiresIn: response.data.refreshExpiresIn,
      expiresIn: response.data.expiresIn,
    };
  } catch (error) {
    if (error?.status === VALIDATION_ERROR_STATUS_CODE) {
      const data = await error.json();
      if (data?.detail?.code === AUTHORIZATION_PENDING_CODE) {
        return { pending: true };
      }
    }
    throw error;
  }
};

/**
* Gets the tokens for the device
* @param  {string} applicationId 
* @param  {string} refreshToken
* @returns Promise<DeviceAuthData>
*/
export const getNewAccessToken = async (applicationId: string, refreshToken: string): Promise<TokenData> => {
  const apiInstance = getAuthAPIInstance();
  const response = await apiInstance.getNewAccessToken({ refreshToken }, applicationId);
  return {
    value: response.data.accessToken,
    expiresAt: calculateExpireTime(response.data.expiresIn),
  };
};

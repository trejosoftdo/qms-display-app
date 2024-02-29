import * as api from '../../../generated/api';
import { getAuthAPIInstance, getServiceTurnsAPIInstance } from '../api-configuration';

jest.mock('../../../generated/api');

describe('API configuration', () => {
  const expectedConfigData = {
    basePath: 'http://localhost:5003',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuthAPIInstance', () => {
    it('returns an instance of AuthApi', () => {
      const result = getAuthAPIInstance();
      expect(result).toBeInstanceOf(api.AuthApi);
      expect(api.Configuration).toHaveBeenCalledTimes(1);
      expect(api.Configuration).toHaveBeenCalledWith(expectedConfigData);
    });
  });

  describe('getServiceTurnsAPIInstance', () => {
    it('returns an instance of ServiceTurnsApi', () => {
      const result = getServiceTurnsAPIInstance();
      expect(result).toBeInstanceOf(api.ServiceturnsApi);
      expect(api.Configuration).toHaveBeenCalledTimes(1);
      expect(api.Configuration).toHaveBeenCalledWith(expectedConfigData);
    });
  });
});
import * as api from '../../../generated/api';
import { getAuthAPIInstance, getCategoriesAPIInstance, getServicesAPIInstance } from '../api-configuration';

jest.mock('../../../generated/api');

describe('API configuration', () => {
  const expectedConfigData = {
    basePath: 'http://localhost:5000',
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

  describe('getCategoriesAPIInstance', () => {
    it('returns an instance of CategoriesApi', () => {
      const result = getCategoriesAPIInstance();
      expect(result).toBeInstanceOf(api.CategoriesApi);
      expect(api.Configuration).toHaveBeenCalledTimes(1);
      expect(api.Configuration).toHaveBeenCalledWith(expectedConfigData);
    });
  });

  describe('getServicesAPIInstance', () => {
    it('returns an instance of ServicesApi', () => {
      const result = getServicesAPIInstance();
      expect(result).toBeInstanceOf(api.ServicesApi);
      expect(api.Configuration).toHaveBeenCalledTimes(1);
      expect(api.Configuration).toHaveBeenCalledWith(expectedConfigData);
    });
  });
});
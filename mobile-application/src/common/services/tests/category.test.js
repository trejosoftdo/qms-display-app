import { getCategoriesAPIInstance } from "../api-configuration";
import { getDeviceAuthHeaders } from "../../device-connection";
import { loadCategories } from "../category";

jest.mock('../api-configuration');
jest.mock('../../device-connection');

describe('Categories service', () => {
  const mockApiInstance = {
    getCategories: jest.fn(),
  };

  beforeEach(() => {
    getCategoriesAPIInstance.mockReturnValue(mockApiInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadCategories', () => {
    const mockAuthHeaders = {
      applicationId: 'mock-application-id',
      authorization: 'mock-authorization',
    };
    const mockCategoriesResponse = [
      {
        id: 1,
        name: 'mock-name-1',
        iconUrl: 'app://test-icon-1',
      },
      {
        id: 2,
        name: 'mock-name-2',
        iconUrl: 'app://test-icon-2',
      }
    ];
  
    beforeEach(() => {
      mockApiInstance.getCategories.mockResolvedValue(mockCategoriesResponse);
      getDeviceAuthHeaders.mockResolvedValue(mockAuthHeaders);
    });
  
    it('loads categories through the category api as expected', async () => {
      const response = await loadCategories();
      expect(response).toEqual({
        items: [
          {
            icon: 'test-icon-1',
            id: '1',
            label: 'mock-name-1',
            name: 'mock-name-1',
          },
          {
            icon: 'test-icon-2',
            id: '2',
            label: 'mock-name-2',
            name: 'mock-name-2',
          },
        ],
        total: 2,
      });
      expect(mockApiInstance.getCategories).toHaveBeenCalledTimes(1);
      expect(mockApiInstance.getCategories).toHaveBeenCalledWith(
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(getCategoriesAPIInstance).toHaveBeenCalledTimes(1);
      expect(getCategoriesAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(1);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });
});